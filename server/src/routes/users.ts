import express, { Request, Response } from "express";
import userService from "../services/userService";

const router = express.Router();

router.get("/", async (_req: Request, res: Response, next) => {
  return userService
    .getAllUsers()
    .then((users) => res.status(200).json(users))
    .catch((error) => next(error));
});

router.post("/", async (req: Request, res: Response, next) => {
  return userService
    .createUser(req.body)
    .then((user) => res.status(201).json(user))
    .catch((error) => next(error));
});

router.get("/:id", async (req: Request, res: Response, next) => {
  return userService
    .getUserById(req.params.id)
    .then((results) => res.status(200).json(results))
    .catch((error) => next(error));
});

export default router;
