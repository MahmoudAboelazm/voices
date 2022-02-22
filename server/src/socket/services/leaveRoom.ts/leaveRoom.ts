import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Room } from "../../../models/room.model";
import { redisRoomService } from "../../../redis";

interface LeaveRoomProps {
  userId: string;
  currentRoomId: string;
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

export const leaveRoom = async ({
  userId,
  currentRoomId,
  io,
}: LeaveRoomProps) => {
  try {
    await redisRoomService.delUserInRoom(userId);

    const isApprovedToSpeak = await redisRoomService.isApprovedToSpeak(userId);
    if (isApprovedToSpeak) return;

    const room = await Room.findById(currentRoomId);
    if (!room) return;

    const { speakers, users } = room;

    room.speakers = speakers.filter((id) => id !== userId);
    room.users = users.filter((id) => id !== userId);

    if (room.speakers.length === 0 && room.users.length === 0) {
      return await room.delete();
    }
    await room.save();

    io.to(currentRoomId).emit("to-all-remove-that-user", userId);
  } catch (error) {
    console.log("error occurred on leaving room:", error.message, {
      userId,
      currentRoomId,
    });
    return;
  }
};
