/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@prisma/client";
import userDao from "../dao/userDao";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import bcrypt from "bcryptjs";

export default {
  async generateToken(request: Request) {
    const user = await userDao.getUserByUsername(request.body.username);

    const correctPassword = await bcrypt.compare(
      request.body.password,
      user.password,
    );

    if (!user || !correctPassword) {
      throw new Error("Invalid or missing password");
    }

    const token = jwt.sign(user, JWT_SECRET, {
      expiresIn: 60 * 10, // Expire in 10 minutes
    });

    return token;
  },

  async getLoggedUser(request: Request) {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    /*
      VULNERABILITY: Broken Authentication:
  
      In this function we have JWT token security issues,
      because we are not verifying the jwt token,
      so it could be invalid or expired etc.
  
      To verify the token, we can fix this with the following code:
      
      jwt.verify(token, JWT_SECRET);
    */

    const decodedToken = jwt.decode(token) as User;
    const results = await userDao.getUserById(decodedToken.id);

    return results[0];
  },

  async getSensitiveAdminData(request: Request) {
    /*
      VULNERABILITY: Broken Access Control
      We're not checking if the user is an admin before allowing them to access this endpoint
      We can fix this by adding the following code:

      const user = await this.getLoggedUser(request);
      if (user.role !== "ADMIN") {
        throw new Error("Forbidden");
      }
    */

    return {
      secretData: "This is a secret data, only for admins.",
    };
  },
};
