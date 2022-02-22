import { redisRoomService } from "../../../redis";
import { JoinedAsProps } from "./types";

export const joinedAsSpeaker = async ({
  joinedUser,
  socket,
  io,
  listenersRoom,
  speakersRoom,
  userId,
}: JoinedAsProps) => {
  if (joinedUser.isSpeaker) {
    io.to(listenersRoom).emit("to-listeners-new-speaker-joined", {
      joinedUser,
      newUserSocketId: socket.id,
    });
    io.to(speakersRoom).emit("to-speakers-new-speaker-joined", {
      joinedUser,
      newUserSocketId: socket.id,
    });
    await redisRoomService.delApprovedToSpeak(userId);
    socket.join(speakersRoom);
  }

  //// to listeners
  socket.on(
    "sending-signal-listener-to-new-speaker",
    ({ caller, to, signal }) => {
      io.to(to).emit("signal-listener-to-new-speaker", {
        caller,
        userId,
        signal,
      });
    },
  );

  socket.on(
    "sending-signal-new-speaker-to-listener",
    ({ to, signal, caller }) => {
      io.to(to).emit("signal-new-speaker-to-listener", {
        signal,
        caller,
      });
    },
  );

  //// to speakers
  socket.on(
    "sending-signal-from-speaker-to-new-speaker",
    ({ to, signal, caller }) => {
      io.to(to).emit("signal-from-speaker-to-new-speaker", {
        caller,
        signal,
        userId,
      });
    },
  );

  socket.on(
    "return-signal-from-new-speaker-to-speaker",
    ({ to, caller, signal }) => {
      io.to(to).emit("returned-signal-from-new-speaker-to-speaker", {
        caller,
        signal,
      });
    },
  );
};
