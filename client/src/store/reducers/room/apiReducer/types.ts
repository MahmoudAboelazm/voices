import { RouterApiCallProps } from "../../shared/types";

// RoomEndPoints to show loading while fetching
export type RoomEndPoints = "creatingRoom" | "gettingRooms" | "fetchingMore";

export type RoomApiCallProps = RouterApiCallProps & { endPoint: RoomEndPoints };

export interface SingleRoomApi {
  _id: string;
  name: string;
  creatorId: string;
  users: string[];
  speakers: string[];
  requesters: string[];
  admins: string[];
  creationDate: Date;
}

export interface RoomApi {
  loading: {
    [K in RoomEndPoints]: boolean;
  };
  rooms: SingleRoomApi[];
  hasMore: boolean;
}

export interface CreateRoomProps {
  name: string;
}
