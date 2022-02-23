import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { joinedAsListener } from "./services/joinedAsListener";
import { joinedAsSpeaker } from "./services/joinedAsSpeaker";
import { joinRoom } from "./services/joinRoom";
import { requestSpeak } from "./services/requestSpeak";
import { userDisconnected } from "./services/userDisconnected";

export const roomSocketInit = async (
  socket: Socket,
  dispatch: Dispatch<any>,
  id: string,
  stream: MediaStream | undefined,
) => {
  joinRoom({ socket, dispatch, id });
  joinedAsSpeaker({ stream, socket, dispatch });
  joinedAsListener({ stream, socket, dispatch });
  requestSpeak({ socket, dispatch });
  userDisconnected({ socket, dispatch });
};
