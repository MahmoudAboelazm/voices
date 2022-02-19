import { createAction } from "@reduxjs/toolkit";

import { apiCall } from "../shared/actions";
import {
  ApiBioProps,
  SignUpProps,
  SingInProps,
  UserApiCallProps,
} from "./types";

export const userSignSuccess = createAction("userSignSuccess");
export const userSignOutSuccess = createAction("userSignOutSuccess");
export const userAuthFailed = createAction("userAuthFailed");
export const userProfile = createAction("userProfile");
export const bioUpdated = createAction("bioUpdated");
export const imgUpdated = createAction("imgUpdated");
export const meSuccess = createAction("meSuccess");
export const changeBio = createAction("changeBio", (payload) => ({ payload }));

const userApiCall = ({
  url,
  method,
  onSuccessAction,
  data,
  endPoint,
}: UserApiCallProps) =>
  apiCall({ router: "user", endPoint, url, method, onSuccessAction, data });

export const userApiSignIn = (data: SingInProps) =>
  userApiCall({
    method: "POST",
    url: "/login",
    onSuccessAction: userSignSuccess.type,
    data,
    endPoint: "signing",
  });

export const userApiSignUp = (data: SignUpProps) =>
  userApiCall({
    method: "POST",
    url: "/register",
    onSuccessAction: userSignSuccess.type,
    data,
    endPoint: "signing",
  });

export const userApiMe = () =>
  userApiCall({
    method: "GET",
    url: "/me",
    onSuccessAction: meSuccess.type,
    endPoint: "gettingMe",
  });

export const userApiSignOut = () =>
  userApiCall({
    method: "GET",
    url: "/logout",
    onSuccessAction: userSignOutSuccess.type,
    endPoint: "signing",
  });

export const userApiGetProfile = (userId: string) =>
  userApiCall({
    method: "GET",
    url: `/profile/${userId}`,
    onSuccessAction: userProfile.type,
    endPoint: "gettingProfile",
  });

export const userApiUpdateBio = (data: ApiBioProps) =>
  userApiCall({
    method: "PATCH",
    url: "/update/bio",
    data,
    onSuccessAction: bioUpdated.type,
    endPoint: "updatingBio",
  });

export const userApiUpdateImg = (data: FormData) =>
  userApiCall({
    method: "PATCH",
    url: "/update/image",
    data,
    onSuccessAction: imgUpdated.type,
    endPoint: "updatingImg",
  });
