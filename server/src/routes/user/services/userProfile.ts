import { Request, Response } from "express";
import { handleOkSuccess } from "../../../common/response/success/mainSuccess";
import { User } from "../../../models/user.model";
import {
  handlePageNotFound,
  handleServerError,
} from "../../../common/response/errors/customErrors";

export const userProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      const { firstName, lastName, bio, imageURL, _id: id } = user;
      const profile = {
        firstName,
        lastName,
        bio,
        imageURL,
        id,
      };
      return handleOkSuccess({ data: profile, res });
    }
    return handlePageNotFound(res);
  } catch (error) {
    console.log("error on get user profile", {
      message: error.message,
      profileId: userId,
    });
    return handleServerError(res);
  }
};
