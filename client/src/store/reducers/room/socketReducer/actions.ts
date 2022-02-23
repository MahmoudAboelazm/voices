import { createAction } from "@reduxjs/toolkit";
import { ApprovedSpeak } from "./types";

export const roomSocketCall = createAction("roomSocketCall");
export const streamError = createAction("streamError");
export const stopStream = createAction("stopStream");
export const meAdmin = createAction("meAdmin");
export const meSpeaker = createAction("meSpeaker");
export const requestSpeak = createAction("requestSpeak");

export const roomSocketSuccess = createAction(
  "roomSocketSuccess",
  (payload) => ({
    payload,
  }),
);
export const addUserToSpeakers = createAction(
  "addUserToSpeakers",
  (payload) => ({ payload }),
);
export const updateListenerPeer = createAction("updateListener", (payload) => ({
  payload,
}));
export const updateSpeakerSignal = createAction(
  "updateSpeakerSignal",
  (payload) => ({
    payload,
  }),
);
export const updateSpeakerPeer = createAction(
  "updateSpeakerPeer",
  (payload) => ({
    payload,
  }),
);
export const addUserToListeners = createAction(
  "addUserToListeners",
  (payload) => ({ payload }),
);
export const addUserToRequesters = createAction(
  "addUserToRequesters",
  (payload) => ({ payload }),
);
export const removeUser = createAction("removeUser", (payload) => ({
  payload,
}));
export const updateListenerSignal = createAction(
  "updateListenerSignal",
  (payload) => ({
    payload,
  }),
);
export const roomIo = createAction("roomIo", (payload) => ({ payload }));

export const approvedSpeak = createAction(
  "approvedSpeak",
  (payload: ApprovedSpeak) => ({
    payload,
  }),
);
export const streamSuccess = createAction("streamSuccess", (payload) => ({
  payload,
}));
