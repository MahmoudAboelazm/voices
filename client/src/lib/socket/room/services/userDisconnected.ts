import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { removeUser } from "../../../../store/reducers/room/socketReducer/actions";

interface UserDisconnectedProps {
  socket: Socket;
  dispatch: Dispatch<any>;
}

export const userDisconnected = (props: UserDisconnectedProps) => {
  const { socket, dispatch } = props;
  socket.on("to-all-remove-that-user", (userId) => {
    dispatch(removeUser({ userId }));
  });
};
