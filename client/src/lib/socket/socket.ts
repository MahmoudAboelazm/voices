import { Dispatch } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { roomIo } from "../../store/reducers/room/socketReducer/actions";
import { getStream } from "../webrtc/stream";
import { roomSocketInit } from "./room/room";

const socketInit = (token: string) => {
  const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
    query: {},
    extraHeaders: {
      authorization: token,
    },
  });
  return socket;
};

export const roomStreamInit = async (
  dispatch: Dispatch<any>,
  id: string,
  token: string,
) => {
  const stream = await getStream(dispatch);

  if (stream) {
    const io = socketInit(token);
    dispatch(roomIo(io));
    roomSocketInit(io, dispatch, id, stream);
  }
};
