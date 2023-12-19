import express from "express";
import UserDao from "../dao/userDao";

const router = express.Router();
const userDao = new UserDao();

router.get("/", async (_req, res) => {
  return userDao
    .getAllUsers()
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

router.get("/:id", async (req, res) => {
  return userDao
    .getUserById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

export default router;
