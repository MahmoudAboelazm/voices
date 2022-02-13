import { Server } from "http";
import socketIo from "socket.io";
import { CLIENT_URL } from "../config/constants";
import { socketIsAuth } from "./middlewares/socketIsAuth";

export const socketInit = async (server: Server) => {
  const io = new socketIo.Server(server, {
    cors: {
      origin: CLIENT_URL,
    },
  });

  io.use(socketIsAuth).on("connection", (socket) => {
    const { userId } = socket.data as { userId: string };
    console.log("user connected", userId);

    // Todo << joinRoom  >> /////////////////////////////////////////////////////////////////////

    // Todo << joinedAsSpeaker  >> /////////////////////////////////////////////////////////////////////

    // Todo << joinedAsListener  >> /////////////////////////////////////////////////////////////////////

    // Todo << Request to speak  >> /////////////////////////////////////////////////////////////////////

    // Todo << Approved to speak  >> /////////////////////////////////////////////////////////////////////

    // Todo << User Left room  >> /////////////////////////////////////////////////////////////////////

    socket.on("disconnect", async () => {
      console.log("disconnected", userId);
    });

    // Todo << Admin remove a speaker  >> /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
  });
};
