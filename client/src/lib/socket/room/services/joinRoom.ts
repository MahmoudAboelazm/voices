import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import {
  roomSocketCall,
  roomSocketSuccess,
  stopStream,
  meAdmin,
  meSpeaker,
} from "../../../../store/reducers/room/socketReducer/actions";
import { UserRoomType } from "../../../../store/reducers/room/socketReducer/types";

import { toastError } from "../../../../store/reducers/shared/actions";

interface JoinRoomProps {
  socket: Socket;
  dispatch: Dispatch<any>;
  id: string;
}

export const joinRoom = (props: JoinRoomProps) => {
  const { socket, dispatch, id } = props;
  socket.on("connect", () => {
    dispatch(roomSocketCall());
    socket.emit("join-room", id);
  });
  socket.on("room-info", async (room, me: UserRoomType) => {
    dispatch(roomSocketSuccess(room));
    if (!me.isSpeaker) dispatch(stopStream());
    if (me.isAdmin) dispatch(meAdmin());
    if (me.isSpeaker) dispatch(meSpeaker());
  });
  socket.on("join-room-error", (error) => {
    dispatch(toastError(error));
  });
  socket.on("connect_error", (error) => {
    dispatch(
      toastError({
        endPoint: "",
        router: "",
        errors: [{ field: "", message: { is: error.message } }],
      }),
    );
  });
};
