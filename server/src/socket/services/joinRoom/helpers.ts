import { User } from "../../../models/user.model";
import {
  FormatedIds,
  FormatedRoom,
  FormatedRoomProps,
  UserRoomType,
} from "./types";

export const formatIds = (arr: string[], allIds: string[]) => {
  const formatedIds: FormatedIds = {};
  arr.map((id) => {
    formatedIds[id] = true;
    allIds.push(id);
  });
  return formatedIds;
};

export const formatRoom = async ({
  room,
  listeners,
  speakers,
  admins,
  ids,
  userId,
}: FormatedRoomProps) => {
  const users = await User.find({ _id: { $in: ids } });

  const formatedRoom: FormatedRoom = {
    roomName: room.name,
    speakers: [],
    listeners: [],
  };

  let me: UserRoomType | undefined;

  users.map(({ _id: id, firstName, imageURL }) => {
    id = id.toString() as string;
    if (id === userId) {
      me = {
        id,
        firstName,
        imageURL,
        isAdmin: admins[id] ? true : false,
        isSpeaker: speakers[id] ? true : false,
      };
    }
    if (speakers[id]) {
      formatedRoom.speakers.push({
        id,
        firstName,
        imageURL,
        isAdmin: admins[id] ? true : false,
        isSpeaker: true,
        me: id === userId,
      });
      return;
    }
    if (listeners[id]) {
      formatedRoom.listeners.push({ firstName, id, imageURL });
      return;
    }
  });

  return { formatedRoom, me };
};
