import { createReducer } from "@reduxjs/toolkit";
import router from "next/dist/client/router";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { apiCall, formError, resetStore, toastError } from "../shared/actions";
import { ApiCallPayload } from "../shared/types";
import {
  bioUpdated,
  changeBio,
  imgUpdated,
  meSuccess,
  userAuthFailed,
  userProfile,
  userSignOutSuccess,
  userSignSuccess,
} from "./actions";
import { User, UserEndPoints } from "./types";

const userState: User = {
  loading: {
    gettingProfile: false,
    updatingBio: false,
    updatingImg: false,
    signing: false,
    gettingMe: false,
  },
};

export const user = createReducer(userState, {
  [apiCall.type]: (user, { payload }) => {
    const { router, endPoint } = payload as ApiCallPayload;
    if (router === "user") user.loading[endPoint as UserEndPoints] = true;
  },

  [bioUpdated.type]: (user, { payload }) => {
    resetLoadings(user, payload);
  },
  [changeBio.type]: (user, { payload }) => {
    if (user.profile) user.profile.bio = payload;
  },
  [imgUpdated.type]: (user, { payload }) => {
    if (user.profile) user.profile.imageURL = payload.data.imageURL;
    if (user.me) user.me.imageURL = payload.data.imageURL;
    resetLoadings(user, payload);
  },

  [userSignSuccess.type]: (user, { payload }) => {
    resetLoadings(user, payload);
    useLocalStorage({ name: "token", value: payload.data.token });
    if (typeof router.query.next === "string") {
      router.push(router.query.next);
    } else {
      router.push("/");
    }
  },

  [userAuthFailed.type]: () => {
    router.push(`/login?next=${router.asPath}`);
  },

  [userProfile.type]: (user, { payload }) => {
    user.profile = payload.data;
    resetLoadings(user, payload);
  },
  [meSuccess.type]: (user, { payload }) => {
    user.me = payload.data;
    resetLoadings(user, payload);
  },

  [userSignOutSuccess.type]: (user, { payload }) => {
    router.push("/login").then(() => router.reload());
    resetLoadings(user, payload);
  },

  [toastError.type]: (user, { payload }) => {
    resetLoadings(user, payload);
  },

  [formError.type]: (user, { payload }) => {
    resetLoadings(user, payload);
  },

  [resetStore.type]: (user, _) => {
    user.loading.gettingProfile = false;
    user.loading.updatingBio = false;
    user.loading.updatingImg = false;
    user.loading.signing = false;
  },
});

const resetLoadings = (user: User, payload: ApiCallPayload) => {
  if (payload.router === "user")
    user.loading[payload.endPoint as UserEndPoints] = false;
};
