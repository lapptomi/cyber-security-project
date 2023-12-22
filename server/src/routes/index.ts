import userRouter from "./users";
import authRouter from "./auth";
import express from "express";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
