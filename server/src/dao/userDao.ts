import { prisma } from "../utils/db";

class UserDao {
  async getAllUsers() {
    const result = await prisma.$queryRawUnsafe(`SELECT * FROM User`);
    return result;
  }

  async getUserById(id: string) {
    // Example SQL injection could be where id: "105 OR 1=1"
    // That would return all users instead of just the one with id 105
    const result = await prisma.$queryRawUnsafe(
      `SELECT * FROM User WHERE id = ${id}`,
    );
    return result;
  }
}

export default UserDao;
