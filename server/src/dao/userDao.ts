/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@prisma/client";
import prisma from "../utils/db";
import bcrypt from "bcryptjs";

class UserDao {
  async getAllUsers() {
    const result = await prisma.user.findMany();
    return result;
  }

  async getUserById(id: string | number) {
    /*
      Example SQL injection could be where id: "105 OR 1=1"
      That would return all users instead of just the one with id 105
    */
    const results = await prisma.$queryRawUnsafe<User[]>(
      `SELECT * FROM User WHERE id = ${id}`,
    );

    /* 
      If you want to prevent SQL injection,
      we can use parameterized queries like below:

      const results = await prisma.$queryRawUnsafe<User[]>(
        `SELECT * FROM User WHERE id = $1`,
        id,
      );
    */

    if (results.length === 0) {
      throw new Error("User not found");
    }

    return results;
  }

  async getUserByUsername(username: string) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
    });
    return user;
  }

  async createUser(data: Omit<User, "id">) {
    /*
      Here is also a security issue, because we are not encrypting the password.
      So if someone gets access to the database, they can see all the passwords in plain text.
      
      We could fix this by encrypting the password when creating user like below:

      const createdUser = await prisma.user.create({
        data: {
          username: data.username,
          // Here we are hashing the password with bcrypt
          // so that it is not stored in plain text in the database
          password: bcrypt.hashSync(data.password, 10),
        },
      });
    */

    const createdUser = await prisma.user.create({ data });
    return createdUser;
  }
}

export default UserDao;
