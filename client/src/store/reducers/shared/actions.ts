import { createAction } from "@reduxjs/toolkit";
import { ApiCallPayload, ErrorsPayload } from "./types";

export const formError = createAction(
  "formError",
  (payload: ErrorsPayload) => ({
    payload,
  }),
);

export const toastError = createAction(
  "toastError",
  (payload: ErrorsPayload) => ({
    payload,
  }),
);

export const apiCall = createAction("apiCall", (payload: ApiCallPayload) => ({
  payload,
}));

export const resetStore = createAction("resetStore");
