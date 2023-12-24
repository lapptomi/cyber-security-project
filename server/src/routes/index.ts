import userRouter from "./users";
import authRouter from "./auth";
import commentRouter from "./comments";
import express from "express";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/comments", commentRouter);

export default router;
