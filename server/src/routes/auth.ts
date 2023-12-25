import express, { Request, Response } from "express";
import authService from "../services/authService";

const router = express.Router();

router.get("/me", async (req: Request, res: Response, next) => {
  return authService
    .getLoggedUser(req)
    .then((user) => res.status(200).json(user))
    .catch((error) => next(error));
});

router.post("/login", async (req: Request, res: Response, next) => {
  return authService
    .generateToken(req)
    .then((token) => res.status(200).json({ token }))
    .catch((error) => next(error));
});

router.get("/admin", async (req: Request, res: Response, next) => {
  return authService
    .getSensitiveAdminData(req)
    .then((secretData) => res.status(200).json(secretData))
    .catch((error) => next(error));
});

export default router;
