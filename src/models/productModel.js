const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const creatProduct = async (data) => {
  return prisma.product.create({ data });
};

module.exports = {
  creatProduct,
};
