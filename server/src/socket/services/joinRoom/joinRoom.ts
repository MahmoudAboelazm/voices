import { Room } from "../../../models/room.model";
import { redisRoomService } from "../../../redis";
import { roomEndedError } from "../../errors/roomErrors";
import { formatIds, formatRoom } from "./helpers";
import { IJoinRoom } from "./types";

export const joinRoom = async ({ roomId, userId, socket }: IJoinRoom) => {
  try {
    const room = await Room.findById(roomId).then(async (foundRoom) => {
      if (!foundRoom) return null;

      const ids: string[] = [];
      const speakers = formatIds(foundRoom.speakers, ids);
      const listeners = formatIds(foundRoom.users, ids);
      const admins = formatIds(foundRoom.admins, ids);

      if (!speakers[userId] && !listeners[userId] && !admins[userId]) {
        foundRoom.users.push(userId);
        listeners[userId] = true;
        ids.push(userId);
      }

      if (admins[userId] && !speakers[userId]) {
        foundRoom.speakers.push(userId);
        speakers[userId] = true;
      }

      await foundRoom.save();

      const formatedRoom = await formatRoom({
        ids,
        speakers,
        listeners,
        admins,
        room: foundRoom,
        userId,
      });

      return formatedRoom;
    });

    if (room) {
      await redisRoomService.addUserToRoom({ userId, roomId });
      socket.join(roomId);
      socket.emit("room-info", room.formatedRoom, room.me);
      return room.me;
    }

    socket.emit("join-room-error", roomEndedError());

    return null;
  } catch (error) {
    console.log("error occurred on joining room:", error.message, {
      userId,
      roomId,
    });
    socket.emit("join-room-error", roomEndedError());

    return null;
  }
};
