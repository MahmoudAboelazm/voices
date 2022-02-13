import { Request, Response } from "express";
import { handleServerError } from "../../../common/response/errors/customErrors";
import { handleOkSuccess } from "../../../common/response/success/mainSuccess";
import { redisAuthService } from "../../../redis";

export const logout = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  try {
    if (authorization) await redisAuthService.delToken(authorization);
    return handleOkSuccess({ res, data: "" });
  } catch (error) {
    console.log("error on logout", {
      message: error.message,
      authorization,
    });
    return handleServerError(res);
  }
};
