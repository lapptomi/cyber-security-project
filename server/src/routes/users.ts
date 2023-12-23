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

router.post("/", async (req: Request, res: Response, next) => {
  return userDao
    .createUser(req.body)
    .then((user) => res.status(201).json(user))
    .catch((error) => next(error));
});

router.get("/:id", async (req: Request, res: Response, next) => {
  return userDao
    .getUserById(req.params.id)
    .then((results) => res.status(200).json(results))
    .catch((error) => next(error));
});

export default router;
