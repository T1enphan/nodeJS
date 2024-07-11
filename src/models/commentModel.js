const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const createComment = async (data) => {
  return prisma.commentBlog.create({ data });
};

module.exports = {
  createComment,
};
