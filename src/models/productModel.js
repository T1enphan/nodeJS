const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const creatProduct = async (data) => {
  return prisma.product.create({ data });
};

const updateProduct = async (id, data) => {
  return prisma.product.update({where:{id}, data})
}

const getDataProduct = () => {
  return prisma.product.findMany();
}

const deleteProduct = async (id) => {
  return prisma.product.delete({where: {id}})
}

module.exports = {
  creatProduct,
  deleteProduct,
  updateProduct,
  getDataProduct
};
