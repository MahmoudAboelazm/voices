import { Request, Response } from "express";
import { handleResetContentSuccess } from "../../../common/response/success/mainSuccess";
import { handleServerError } from "../../../common/response/errors/customErrors";
import { handleBadRequestError } from "../../../common/response/errors/mainErrors";

import { User } from "../../../models/user.model";
import { validateBioInput } from "../dto/updateBioInput";

export const updateBio = async (req: Request, res: Response) => {
  const { bio, errors } = await validateBioInput(req.body);
  if (errors) return handleBadRequestError({ res, errors });
  try {
    const user = await User.findById(req.userId);
    if (user) {
      user.bio = bio || "";
      await user.save();
    }

    return handleResetContentSuccess({ res, data: { bio } });
  } catch (error) {
    console.log("error on update bio", {
      message: error.message,
      userId: req.userId,
      bio: req.body,
    });
    return handleServerError(res);
  }
};
