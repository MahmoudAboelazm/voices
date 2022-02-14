import userRouter from "./user";
import roomRouter from "./room";

import express from "express";

const router = express.Router();
router.use("/user", userRouter);
router.use("/room", roomRouter);

export default router;
