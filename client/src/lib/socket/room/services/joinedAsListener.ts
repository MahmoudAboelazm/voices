import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import {
  addUserToListeners,
  updateListenerSignal,
  updateSpeakerPeer,
} from "../../../../store/reducers/room/socketReducer/actions";
import { Peer } from "../../../webrtc/peer";

interface JoinedAsListenerProps {
  socket: Socket;
  dispatch: Dispatch<any>;
  stream: MediaStream | undefined;
}

export const joinedAsListener = (props: JoinedAsListenerProps) => {
  const { socket, dispatch, stream } = props;

  socket.on(
    "to-listeners-new-listener-joined",
    ({ joinedUser, newUserSocketId }) => {
      joinedUser.socketId = newUserSocketId;
      dispatch(addUserToListeners(joinedUser));
    },
  );

  // speakers
  socket.on(
    "to-speakers-new-listener-joined",
    ({ joinedUser, newUserSocketId }) => {
      const peer = new Peer({ initiator: true, stream });
      peer.onSignal((signal) => {
        socket.emit("sending-signal-speaker-to-new-listener", {
          to: newUserSocketId,
          signal,
          caller: socket.id,
        });
      });
      joinedUser.socketId = newUserSocketId;
      joinedUser.peer = peer;
      dispatch(addUserToListeners(joinedUser));
    },
  );

  socket.on(
    "signal-speaker-to-new-listener",
    async ({ caller, signal, userId }) => {
      const peer = new Peer({ initiator: false });
      peer.setSignal(signal).then(() =>
        peer.onSignal((signal) => {
          socket.emit("returning-signal-from-new-listener", {
            to: caller,
            signal,
            caller: socket.id,
          });
        }),
      );
      dispatch(updateSpeakerPeer({ caller, peer, userId }));
    },
  );
  socket.on("signal-new-listener-to-speaker", ({ caller, signal }) => {
    dispatch(updateListenerSignal({ caller, signal }));
  });
};
