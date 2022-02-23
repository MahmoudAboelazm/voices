import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import {
  addUserToSpeakers,
  updateListenerPeer,
  updateSpeakerSignal,
  updateSpeakerPeer,
} from "../../../../store/reducers/room/socketReducer/actions";
import { Peer } from "../../../webrtc/peer";

interface JoineAsSpeakerProps {
  socket: Socket;
  dispatch: Dispatch<any>;
  stream: MediaStream | undefined;
}

export const joinedAsSpeaker = (props: JoineAsSpeakerProps) => {
  const { socket, dispatch, stream } = props;
  socket.on(
    "to-listeners-new-speaker-joined",
    ({ joinedUser, newUserSocketId }) => {
      const peer = new Peer({ initiator: true, stream });
      peer.onSignal((signal) => {
        socket.emit("sending-signal-listener-to-new-speaker", {
          caller: socket.id,
          to: newUserSocketId,
          signal,
        });
      });
      joinedUser.peer = peer;
      joinedUser.socketId = newUserSocketId;
      dispatch(addUserToSpeakers(joinedUser));
    },
  );
  socket.on("signal-listener-to-new-speaker", ({ caller, userId, signal }) => {
    const peer = new Peer({ initiator: false, stream });
    peer.setSignal(signal).then(() =>
      peer.onSignal((signal) => {
        socket.emit("sending-signal-new-speaker-to-listener", {
          to: caller,
          signal,
          caller: socket.id,
        });
      }),
    );
    dispatch(updateListenerPeer({ peer, caller, userId }));
  });

  socket.on("signal-new-speaker-to-listener", ({ signal, caller }) => {
    dispatch(updateSpeakerSignal({ caller, signal }));
  });

  ///////(2) to speakers
  socket.on(
    "to-speakers-new-speaker-joined",
    ({ joinedUser, newUserSocketId }) => {
      const peer = new Peer({ initiator: true, stream });
      peer.onSignal((signal) => {
        socket.emit("sending-signal-from-speaker-to-new-speaker", {
          to: newUserSocketId,
          signal,
          caller: socket.id,
        });
      });
      joinedUser.peer = peer;
      joinedUser.socketId = newUserSocketId;
      dispatch(addUserToSpeakers(joinedUser));
    },
  );

  socket.on(
    "signal-from-speaker-to-new-speaker",
    ({ caller, signal, userId }) => {
      const peer = new Peer({ initiator: false, stream });
      peer.setSignal(signal).then(() =>
        peer.onSignal((signal) => {
          socket.emit("return-signal-from-new-speaker-to-speaker", {
            to: caller,
            signal,
            caller: socket.id,
          });
        }),
      );
      dispatch(updateSpeakerPeer({ userId, peer, caller }));
    },
  );

  socket.on(
    "returned-signal-from-new-speaker-to-speaker",
    ({ caller, signal }) => {
      dispatch(updateSpeakerSignal({ caller, signal }));
    },
  );
};
