import { createReducer } from "@reduxjs/toolkit";
import { Room } from "./types";

const roomState: Room = {
  roomName: "",
  listeners: [],
  speakers: [],
  requesters: [],
  meAdmin: false,
  meSpeaker: false,
  loading: false,
  showRequestSpeak: true,
  muted: false,
  micStreamError: false,
};

export const roomSocket = createReducer(roomState, {});
