import { Types } from "mongoose";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { RoomModel } from "../../../models/room.model";

export interface UserRoomType {
  firstName: string;
  imageURL: string;
  id: string;
  isAdmin?: boolean;
  isSpeaker?: boolean;
  me?: boolean;
}

export interface IJoinRoom {
  roomId: string;
  userId: string;
  socket: Socket;
}

export interface JoinedAsProps {
  joinedUser: UserRoomType;
  socket: Socket;
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  listenersRoom: string;
  speakersRoom: string;
  userId: string;
}

////////////////////////////////// For helpers file ////////////////////////////////////
export interface FormatedIds {
  [key: string]: boolean;
}

export interface FormatedRoomProps {
  room: RoomModel & {
    _id: Types.ObjectId;
  };
  speakers: FormatedIds;
  listeners: FormatedIds;
  admins: FormatedIds;
  ids: string[];
  userId: string;
}

export interface FormatedRoom {
  roomName: String;
  speakers: UserRoomType[];
  listeners: UserRoomType[];
}
