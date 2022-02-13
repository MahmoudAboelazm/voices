import { Request, Response } from "express";
import {
  handleGatewayError,
  handleImageMissingError,
  handleImageNotSupported,
  handleImageSizeError,
  handleServerError,
} from "../../../common/response/errors/customErrors";
import {
  handleNoContentSuccess,
  handleOkSuccess,
} from "../../../common/response/success/mainSuccess";
import {
  cloudinaryDelete,
  cloudinarySave,
} from "../../../common/utils/cloudinary";
import { User } from "../../../models/user.model";

export const updateImage = async (req: Request, res: Response) => {
  const { userId, file, fileError } = req;

  if (fileError && fileError.code === "LIMIT_FILE_SIZE")
    return handleImageSizeError(5, res);

  if (fileError && fileError.code === "NOT_IMAGE")
    return handleImageNotSupported(res);

  if (!file) return handleImageMissingError(res);

  try {
    const image = await cloudinarySave({
      file,
      options: { folder: "voices", width: 200, height: 200 },
    });

    if (!image) return handleGatewayError(res);

    const user = await User.findById(userId);
    if (user) {
      const publicId = user.imageId;
      user.imageId = image.public_id;
      user.imageURL = image.secure_url;
      await user.save();
      if (publicId) await cloudinaryDelete(publicId);
      return handleOkSuccess({
        res,
        data: { imageURL: user.imageURL },
      });
    }
    // This response is not possible
    return handleNoContentSuccess({ res, data: { imageURL: "WTF!!!" } });
  } catch (error) {
    console.log("MongoDB error on update user image", {
      userId,
      error: error.message,
    });
    return handleServerError(res);
  }
};
