import { Socket } from "socket.io";
import { redisAuthService, redisRoomService } from "../../redis";
import { verify as jwtVerify } from "jsonwebtoken";
import { JWT_SECRETE } from "../../config/constants";
import { unauthError, userInRoomError } from "../errors/roomErrors";

export const socketIsAuth = async (socket: Socket, next: Function) => {
  const { authorization } = socket.handshake.headers;
  if (!authorization) return next(unauthError());

  try {
    // auth the user
    const user = await redisAuthService.authToken(authorization);
    if (!user) return next(unauthError());
    jwtVerify(authorization, JWT_SECRETE);
    socket.data = { userId: user };

    // check if the user in a room before connection
    const isUserInRoom = await redisRoomService.isUserInRoom(user);
    if (isUserInRoom) return next(userInRoomError());
  } catch (error) {
    return next(unauthError());
  }
  return next();
};
