const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const createCategory = (data) => {
  return prisma.category.create({ data });
};

const getDataCategory = () => {
  return prisma.category.findMany();
};

const updateCategory = (id, data) => {
  return prisma.category.update({ where: { id }, data });
};

const deleteCategory = (id) => {
  return prisma.category.delete({ where: { id } });
};

module.exports = {
  createCategory,
  getDataCategory,
  updateCategory,
  deleteCategory,
};
