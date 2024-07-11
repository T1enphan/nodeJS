const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const createTestBlog = async (data) => {
  console.log(data);
  return prisma.blog.create({ data });
 };
 
module.exports = {
  createTestBlog,
};
