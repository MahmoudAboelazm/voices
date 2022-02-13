import { Socket } from "socket.io";
import { redisAuthService } from "../../redis";
import { verify as jwtVerify } from "jsonwebtoken";
import { JWT_SECRETE } from "../../config/constants";
import { unauthError } from "../errors/roomErrors";

export const socketIsAuth = async (socket: Socket, next: Function) => {
  const { authorization } = socket.handshake.headers;
  if (!authorization) return next(unauthError());

  try {
    const user = await redisAuthService.authToken(authorization);
    if (!user) return next(unauthError());
    jwtVerify(authorization, JWT_SECRETE);
    socket.data = { userId: user };
  } catch (error) {
    return next(unauthError());
  }
  return next();
};
