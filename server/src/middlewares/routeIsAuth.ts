import { verify as jwtVerify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { redisAuthService } from "../redis";
import { JWT_SECRETE } from "../config/constants";
import { handleUnauthUserError } from "../common/response/errors/customErrors";

export const routeIsAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) return handleUnauthUserError(res);
    jwtVerify(authorization, JWT_SECRETE);
    const userId = await redisAuthService.authToken(authorization);
    if (!userId) return handleUnauthUserError(res);
    req.userId = userId;
  } catch (error) {
    return handleUnauthUserError(res);
  }
  return next();
};
