import argon2 from "argon2";
import { Request, Response } from "express";
import { sign as jwtSign } from "jsonwebtoken";
import {
  handleEmailConflictError,
  handleServerError,
} from "../../../common/response/errors/customErrors";
import { handleBadRequestError } from "../../../common/response/errors/mainErrors";
import { handleOkSuccess } from "../../../common/response/success/mainSuccess";
import { JWT_SECRETE } from "../../../config/constants";
import { User } from "../../../models/user.model";
import { redisAuthService } from "../../../redis";
import { validateInput } from "../dto/userInput";

export const register = async (req: Request, res: Response) => {
  const { user, errors } = await validateInput(req.body);
  if (errors) return handleBadRequestError({ res, errors });

  try {
    const hashedPassword = await argon2.hash(user!.password);
    const { _id: userId } = await User.create({
      password: hashedPassword,
      email: user!.email,
      firstName: user!.firstName,
      lastName: user!.lastName,
    });
    const token = jwtSign({ userId }, JWT_SECRETE);
    await redisAuthService.addToken({ token, userId });
    return handleOkSuccess({ res, data: { token } });
  } catch (error) {
    if (error.code === 11000) {
      return handleEmailConflictError(res);
    }
    return handleServerError(res);
  }
};
