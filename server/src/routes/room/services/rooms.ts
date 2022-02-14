import { Request, Response } from "express";
import { handleServerError } from "../../../common/response/errors/customErrors";
import { handleOkSuccess } from "../../../common/response/success/mainSuccess";
import { Room } from "../../../models/room.model";

export const rooms = async (req: Request, res: Response) => {
  const { p } = req.params;
  let page = parseInt(p);
  const quantity = 5;

  try {
    /**  
        rooms pagination calculation based on the
        current page  @param page
        and quantity  @param quantity
    */
    if (!page || typeof page !== "number") {
      page = 1;
    }
    const index = page * quantity - quantity;

    const rooms = await Room.find()
      .sort({ creationDate: -1 })
      .skip(index)
      .limit(quantity + 1);

    return handleOkSuccess({
      res,
      data: {
        rooms: rooms.slice(0, quantity),
        hasMore: rooms.length > quantity,
      },
    });
  } catch (error) {
    console.log("error on get rooms", {
      message: error.message,
      req: req.body,
    });
    return handleServerError(res);
  }
};
