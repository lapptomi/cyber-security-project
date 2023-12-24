import { User } from "@prisma/client";
import userDao from "../dao/userDao";

export default {
  async getAllUsers() {
    const result = await userDao.getAllUsers();
    return result;
  },

  async getUserById(id: string | number) {
    const results = await userDao.getUserById(id);

    if (results.length === 0) {
      throw new Error("User not found");
    }

    return results as User[];
  },

  async getUserByUsername(username: string) {
    const user = await userDao.getUserByUsername(username);
    return user;
  },

  async createUser(newUser: Omit<User, "id">) {
    /*
      VULNERABILITY: Security Misconfiguration:

      Here is also a security issue, because we are not encrypting the password.
      So if someone gets access to the database, they can see all the passwords in plain text.
      
      We could fix this by encrypting the password when creating user like below:

      const createdUser = await userDao.createUser({
        username: data.username,
        // Here we are hashing the password with bcrypt
        // so that it is not stored in plain text in the database
        password: bcrypt.hashSync(data.password, 10),
      });
    */
    const createdUser = await userDao.createUser(newUser);
    return createdUser;
  },
};
