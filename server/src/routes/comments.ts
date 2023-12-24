import express, { Request, Response } from "express";
import commentService from "../services/commentService";

const router = express.Router();

router.get("/", async (_req: Request, res: Response, next) => {
  return commentService
    .getAllComments()
    .then((comments) => res.status(200).json(comments))
    .catch((error) => next(error));
});

router.post("/", async (req: Request, res: Response, next) => {
  return commentService
    .createComment(req.body.comment)
    .then((comment) => res.status(201).json(comment))
    .catch((error) => next(error));
});

router.delete("/", async (_req: Request, res: Response, next) => {
  return commentService
    .deleteComments()
    .then((comments) => res.status(201).json(comments))
    .catch((error) => next(error));
});

export default router;
