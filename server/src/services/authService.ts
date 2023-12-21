import { User } from "@prisma/client";
import UserDao from "../dao/userDao";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";

const userDao = new UserDao();

export const login = async (request: Request) => {
  const user = await userDao.getUserByUsername(request.body.username);
  if (!user || user.password !== request.body.password) {
    throw new Error("Invalid or missing password");
  }

  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: 60 * 10, // Expire in 10 minutes
  });

  return token;
};

export const getLoggedUser = async (request: Request) => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token provided");

  /*
    In this function we have JWT token security issues,
    because we are not verifying the jwt token,
    so it could be invalid or expired etc.

    To verify the token, we can fix this with the following code:
    
    jwt.verify(token, JWT_SECRET);
  */

  const decodedToken = jwt.decode(token) as User;
  const user = await userDao.getUserById(decodedToken.id);

  return user;
};
