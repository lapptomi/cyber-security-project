import express, { Request, Response } from "express";
import { getLoggedUser, generateToken } from "../services/authService";

const router = express.Router();

router.get("/me", async (req: Request, res: Response, next) => {
  return getLoggedUser(req)
    .then((user) => res.status(200).json(user))
    .catch((error) => next(error));
});

router.post("/login", async (req: Request, res: Response, next) => {
  return generateToken(req)
    .then((token) => res.status(200).json({ token }))
    .catch((error) => next(error));
});

export default router;
