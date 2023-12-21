import { User } from "@prisma/client";
import { prisma } from "../utils/db";

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

    return results[0];
  }

  async getUserByUsername(username: string) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
    });
    return user;
  }
}

export default UserDao;
