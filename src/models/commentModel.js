const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const createComment = async (data) => {
  return prisma.commentBlog.create({ data });
};
const getDataComment = async () => {
  return prisma.commentBlog.findMany();
};

module.exports = {
  createComment,
  getDataComment,
};
