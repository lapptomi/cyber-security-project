import express, { Request, Response } from "express";
import UserDao from "../dao/userDao";

const router = express.Router();
const userDao = new UserDao();

router.get("/", async (_req: Request, res: Response, next) => {
  return userDao
    .getAllUsers()
    .then((users) => res.status(200).json(users))
    .catch((error) => next(error));
});

router.get("/:id", async (req: Request, res: Response, next) => {
  return userDao
    .getUserById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((error) => next(error));
});

export default router;
