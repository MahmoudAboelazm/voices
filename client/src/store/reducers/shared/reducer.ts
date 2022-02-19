import { createReducer } from "@reduxjs/toolkit";
import { formError, resetStore, toastError } from "./actions";
import { ISharedState } from "./types";

const sharedState: ISharedState = {
  formErrors: [],
  toastErrors: [],
};

export const shared = createReducer(sharedState, {
  [toastError.type]: (state, { payload }) => {
    state.toastErrors = payload.errors;
  },
  [formError.type]: (state, { payload }) => {
    state.formErrors = payload.errors;
  },
  [resetStore.type]: (state, _) => {
    state.formErrors = [];
    state.toastErrors = [];
  },
});
