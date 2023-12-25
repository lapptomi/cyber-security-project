import { User } from "@prisma/client";
import userDao from "../dao/userDao";
import bcrypt from "bcryptjs";

export default {
  async getAllUsers() {
    return await userDao.getAllUsers();
  },

  async getUserById(id: string | number) {
    const results = await userDao.getUserById(id);

    if (results.length === 0) {
      throw new Error("User not found");
    }

    return results as User[];
  },

  async getUserByUsername(username: string) {
    return await userDao.getUserByUsername(username);
  },

  async createUser(newUser: Omit<User, "id">) {
    /*
      VULNERABILITY: Security Misconfiguration:

      Here could also be a security issue, since we are not hashing the password,
      So if someone gets access to the database, they can see all the passwords in plain text.
      
      So for example the following code would not be secure:
        const createdUser = await userDao.createUser(newUser);

      But we are fixing this below.
    */
    const createdUser = await userDao.createUser({
      username: newUser.username,
      // Here we are hashing the password with bcrypt
      // so that it is not stored in plain text in the database
      password: bcrypt.hashSync(newUser.password, 10),
      role: newUser.role || "USER",
    });
    return createdUser;
  },
};
