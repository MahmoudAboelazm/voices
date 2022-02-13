import { handleServerError } from "../../../common/response/errors/customErrors";
import { handleOkSuccess } from "../../../common/response/success/mainSuccess";
import { User } from "../../../models/user.model";
import { Request, Response } from "express";

export const me = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    return handleOkSuccess({
      res,
      data: { id: user?._id, imageURL: user?.imageURL },
    });
  } catch (error) {
    console.log("error on me", {
      message: error.message,
      req: req.body,
    });
    return handleServerError(res);
  }
};
