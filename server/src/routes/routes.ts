import userRoutes from "./user";

import express from "express";

const router = express.Router();
router.use("/user", userRoutes);

export default router;
