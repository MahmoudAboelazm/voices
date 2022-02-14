import express from "express";
import { routeIsAuth } from "../../middlewares/routeIsAuth";
import { createRoom } from "./services/createRoom";
import { rooms } from "./services/rooms";

const router = express.Router();
router.post("/create", routeIsAuth, createRoom);
router.get("/rooms/:p", rooms);
export default router;
