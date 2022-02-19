import { createAction } from "@reduxjs/toolkit";
import { apiCall } from "../../shared/actions";
import { CreateRoomProps, RoomApiCallProps } from "./types";

export const roomCreatedSuccess = createAction("roomCreatedSuccess");
export const roomsSuccess = createAction("roomsSuccess");
export const moreRoomsSuccess = createAction("moreRoomsSuccess");

export const roomApiCall = ({
  url,
  method,
  onSuccessAction,
  data,
  endPoint,
}: RoomApiCallProps) =>
  apiCall({ router: "room", endPoint, url, method, onSuccessAction, data });

export const roomApiCreate = (data: CreateRoomProps) =>
  roomApiCall({
    method: "post",
    url: "/create",
    onSuccessAction: roomCreatedSuccess.type,
    data,
    endPoint: "creatingRoom",
  });

export const roomApiGetRooms = (page: number) =>
  roomApiCall({
    method: "GET",
    url: `/rooms/${page}`,
    onSuccessAction: roomsSuccess.type,
    endPoint: "gettingRooms",
  });

export const roomApiFetchMore = (page: number) =>
  roomApiCall({
    method: "GET",
    url: `/rooms/${page}`,
    onSuccessAction: moreRoomsSuccess.type,
    endPoint: "fetchingMore",
  });
