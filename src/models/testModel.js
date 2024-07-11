const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const createTestBlog = async (data) => {
  return prisma.blog.create({ data });
};

module.exports = {
  createTestBlog,
};
