import { JoinedAsProps } from "./types";

export const joinedAsListener = async ({
  joinedUser,
  socket,
  io,
  listenersRoom,
  speakersRoom,
  userId,
}: JoinedAsProps) => {
  if (!joinedUser.isSpeaker) {
    socket.join(listenersRoom);
    socket.broadcast
      .to(listenersRoom)
      .emit("to-listeners-new-listener-joined", {
        joinedUser,
        newUserSocketId: socket.id,
      });

    io.to(speakersRoom).emit("to-speakers-new-listener-joined", {
      joinedUser,
      newUserSocketId: socket.id,
    });
  }

  socket.on(
    "sending-signal-speaker-to-new-listener",
    ({ to, signal, caller }) => {
      socket
        .to(to)
        .emit("signal-speaker-to-new-listener", { caller, signal, userId });
    },
  );

  socket.on("returning-signal-from-new-listener", ({ to, signal, caller }) => {
    io.to(to).emit("signal-new-listener-to-speaker", { caller, signal });
  });
};
