import { createReducer } from "@reduxjs/toolkit";
import { apiCall, formError, toastError } from "../../shared/actions";
import { moreRoomsSuccess, roomCreatedSuccess, roomsSuccess } from "./actions";
import router from "next/router";
import { RoomApi, RoomEndPoints } from "./types";
import { ApiCallPayload } from "../../shared/types";

const roomState: RoomApi = {
  loading: {
    creatingRoom: false,
    gettingRooms: false,
    fetchingMore: false,
  },
  rooms: [],
  hasMore: false,
};

export const roomApi = createReducer(roomState, {
  [apiCall.type]: (room, { payload }) => {
    const { router, endPoint } = payload as ApiCallPayload;
    if (router === "room") room.loading[endPoint as RoomEndPoints] = true;
  },

  [roomCreatedSuccess.type]: (room, { payload }) => {
    resetLoadings(room, payload);
    router.push(`/room/${payload.data.id}`);
  },
  [roomsSuccess.type]: (room, { payload }) => {
    room.rooms = payload.data.rooms;
    room.hasMore = payload.data.hasMore;
    resetLoadings(room, payload);
  },
  [moreRoomsSuccess.type]: (room, { payload }) => {
    room.rooms.push(...payload.data.rooms);
    room.hasMore = payload.data.hasMore;
    resetLoadings(room, payload);
  },
  [toastError.type]: (room, { payload }) => {
    resetLoadings(room, payload);
  },

  [formError.type]: (room, { payload }) => {
    resetLoadings(room, payload);
  },
});

const resetLoadings = (room: RoomApi, payload: ApiCallPayload) => {
  if (payload.router === "room")
    room.loading[payload.endPoint as RoomEndPoints] = false;
};
