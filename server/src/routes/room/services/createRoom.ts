import { Request, Response } from "express";
import {
  handleRoomConflictError,
  handleServerError,
} from "../../../common/response/errors/customErrors";
import { handleBadRequestError } from "../../../common/response/errors/mainErrors";
import { handleCreatedSuccess } from "../../../common/response/success/mainSuccess";
import { Room } from "../../../models/room.model";
import { validateInput } from "../dto/roomInput";

export const createRoom = async (req: Request, res: Response) => {
  const { room, errors } = await validateInput(req.body);
  if (errors) return handleBadRequestError({ res, errors });

  const { userId } = req;
  try {
    const createdRoom = await Room.create({
      creatorId: userId,
      admins: [userId],
      speakers: [],
      name: room!.name,
      creationDate: new Date(),
    });
    return handleCreatedSuccess({ res, data: { id: createdRoom._id } });
  } catch (error) {
    if (error.code === 11000) {
      return handleRoomConflictError(res);
    }
    return handleServerError(res);
  }
};
