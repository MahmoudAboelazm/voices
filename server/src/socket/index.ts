import { Server } from "http";
import socketIo from "socket.io";
import { CLIENT_URL } from "../config/constants";
import { redisRoomService } from "../redis";
import { userInRoomError } from "./errors/roomErrors";
import { socketIsAuth } from "./middlewares/socketIsAuth";
import { approvedToSpeak } from "./services/approvedToSpeak/approvedToSpeak";
import { joinedAsListener } from "./services/joinRoom/joinAsListener";
import { joinedAsSpeaker } from "./services/joinRoom/joinAsSpeaker";
import { joinRoom } from "./services/joinRoom/joinRoom";
import { leaveRoom } from "./services/leaveRoom.ts/leaveRoom";

export const socketInit = async (server: Server) => {
  const io = new socketIo.Server(server, {
    cors: {
      origin: CLIENT_URL,
    },
  });

  io.use(socketIsAuth).on("connection", (socket) => {
    const { userId } = socket.data as { userId: string };
    console.log("user connected", userId);

    let currentRoomId: string;
    let speakersRoom: string;
    let listenersRoom: string;

    socket.on("join-room", async (roomId) => {
      const isUserInRoom = await redisRoomService.isUserInRoom(userId);
      if (isUserInRoom) {
        return socket.emit("join-room-error", userInRoomError());
      }

      const joinedUser = await joinRoom({ userId, roomId, socket });
      if (!joinedUser) return;
      currentRoomId = roomId;
      listenersRoom = `${roomId}Listeners`;
      speakersRoom = `${roomId}Speakers`;

      await joinedAsSpeaker({
        joinedUser,
        speakersRoom,
        listenersRoom,
        io,
        socket,
        userId,
      });

      await joinedAsListener({
        joinedUser,
        speakersRoom,
        listenersRoom,
        io,
        socket,
        userId,
      });
      return;
    });

    socket.on("request-to-speak", (socketId) => {
      io.to(speakersRoom).emit("to-speakers-listener-request-speak", socketId);
    });

    socket.on(
      "approved-to-speak",
      async ({ requesterUserId, requesterSocketId }) => {
        await approvedToSpeak({
          requesterUserId,
          requesterSocketId,
          socket,
          userId,
          io,
          currentRoomId,
          listenersRoom,
        });
      },
    );

    socket.on("disconnect", async () => {
      console.log("disconnected", userId);
      await leaveRoom({ currentRoomId, io, userId });
    });

    // Todo << Admin remove a speaker  >> /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
  });
};
