const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const createBrand = async (data) => {
  return await prisma.brand.create({ data });
};

const deleteBrand = async (id) => {
  return prisma.brand.delete({ where: { id } });
};

const updateBrand = async (id, data) => {
  return prisma.brand.update({ where: { id }, data });
};

const getDataBrand = async () => {
  return prisma.brand.findMany();
};

module.exports = {
  createBrand,
  deleteBrand,
  updateBrand,
  getDataBrand,
};
