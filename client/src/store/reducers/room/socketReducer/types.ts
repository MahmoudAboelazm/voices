import { Socket } from "socket.io-client";
import { Peer } from "../../../../lib/webrtc/peer";

export interface UserRoomType {
  firstName: string;
  imageURL: string;
  id: string;
  isAdmin: boolean;
  isSpeaker: boolean;
  isSpeaking: boolean;
  me: boolean;
  peer: Peer;
  socketId: string;
}

export interface Room {
  loading: boolean;
  roomName: string;
  speakers: UserRoomType[];
  listeners: UserRoomType[];
  requesters: UserRoomType[];
  meAdmin: boolean;
  meSpeaker: boolean;
  showRequestSpeak: boolean;
  stream?: MediaStream;
  io?: Socket;
  muted: boolean;
  micStreamError: boolean;
}

export interface ApprovedSpeak {
  requesterUserId: string;
  requesterSocketId: string;
}
