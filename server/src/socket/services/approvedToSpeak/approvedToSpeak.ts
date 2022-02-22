import { Socket, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Room } from "../../../models/room.model";
import { redisRoomService } from "../../../redis";

export interface ApprovedToSpeakProps {
  currentRoomId: string;
  socket: Socket;
  userId: string;
  requesterUserId: string;
  requesterSocketId: string;
  listenersRoom: string;
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

export const approvedToSpeak = async ({
  currentRoomId,
  socket,
  userId,
  requesterSocketId,
  requesterUserId,
  io,
  listenersRoom,
}: ApprovedToSpeakProps) => {
  try {
    const room = await Room.findById(currentRoomId);

    if (!room) return socket.emit("room-ended");

    const isAdmin = room.admins.find((id) => id === userId);

    if (!isAdmin) return socket.emit("is-not-admin");

    room.speakers.push(requesterUserId);
    room.users = room.users.filter((u) => u !== requesterUserId);

    await room.save();

    const getSocket = io.sockets.sockets.get(requesterSocketId);
    await getSocket?.leave(listenersRoom);
    await getSocket?.leave(currentRoomId);

    await redisRoomService.addApprovedToSpeak({
      roomId: currentRoomId,
      userId: requesterUserId,
    });

    io.to(currentRoomId).emit("to-all-remove-that-user", requesterUserId);
    io.to(requesterSocketId).emit("you-approved-to-speak");

    return;
  } catch (error) {
    console.log("error occurred on approved to speak:", error.message, {
      userId,
      currentRoomId,
    });
    return;
  }
};
