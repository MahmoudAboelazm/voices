import { Dispatch } from "@reduxjs/toolkit";
import router from "next/dist/client/router";
import { Socket } from "socket.io-client";
import { addUserToRequesters } from "../../../../store/reducers/room/socketReducer/actions";

interface RequestSpeakProps {
  socket: Socket;
  dispatch: Dispatch<any>;
}

export const requestSpeak = (props: RequestSpeakProps) => {
  const { socket, dispatch } = props;
  socket.on("to-speakers-listener-request-speak", (socketId) => {
    dispatch(addUserToRequesters({ socketId }));
  });

  socket.on("you-approved-to-speak", () => {
    router.reload();
  });
};
