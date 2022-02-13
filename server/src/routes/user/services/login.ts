import argon2 from "argon2";
import { Request, Response } from "express";
import { sign as jwtSign } from "jsonwebtoken";
import { handleOkSuccess } from "../../../common/response/success/mainSuccess";
import {
  handleLoginError,
  handleServerError,
} from "../../../common/response/errors/customErrors";
import { JWT_SECRETE } from "../../../config/constants";
import { User } from "../../../models/user.model";
import { redisAuthService } from "../../../redis";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return handleLoginError(res);

    const verfiy = await argon2.verify(user.password, password);

    if (!verfiy) return handleLoginError(res);

    const token = jwtSign({ id: user._id }, JWT_SECRETE);

    await redisAuthService.addToken({ token, userId: user._id });

    return handleOkSuccess({ res, data: { token } });
  } catch (error) {
    console.log("error on login", {
      message: error.message,
      req: req.body,
    });
    return handleServerError(res);
  }
};
