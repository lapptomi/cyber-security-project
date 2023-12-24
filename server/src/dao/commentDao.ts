import prisma from "../utils/db";

export default {
  async getAllComments() {
    return await prisma.comment.findMany();
  },

  async createComment(comment: string) {
    return await prisma.comment.create({ data: { comment } });
  },

  async deleteComments() {
    return await prisma.comment.deleteMany();
  },
};
