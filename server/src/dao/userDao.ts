/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@prisma/client";
import prisma from "../utils/db";
import bcrypt from "bcryptjs";

export default {
  async getAllUsers() {
    return await prisma.user.findMany();
  },

  async getUserById(id: string | number) {
    /*
      VULNERABILITY: SQL injection:

      Example SQL injection could be where id: "105 OR 1=1"
      That would return all users instead of just the one with id 105.

      If you want to prevent SQL injection,
      we can use parameterized queries like below:

      const results = await prisma.$queryRawUnsafe<User[]>(
        `SELECT * FROM User WHERE id = $1`,
        id,
      );
    */
    const results = await prisma.$queryRawUnsafe<User[]>(
      `SELECT * FROM User WHERE id = ${id}`,
    );

    return results;
  },

  async getUserByUsername(username: string) {
    return await prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
    });
  },

  async createUser(data: Omit<User, "id">) {
    return await prisma.user.create({ data });
  },
};
