import { Dispatch } from "@reduxjs/toolkit";
import {
  streamSuccess,
  streamError,
} from "../../store/reducers/room/socketReducer/actions";

export const getStream = async (dispatch: Dispatch<any>) => {
  let myStream: MediaStream | undefined;
  try {
    await navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        myStream = stream;
      });
    dispatch(streamSuccess(myStream));
    return myStream;
  } catch (error: any) {
    console.log("error", error.message);
    dispatch(streamError());
    return undefined;
  }
};
