const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const createCountry = async (data) => {
  return prisma.country.create({ data });
};

const getCountry = async () => {
  return prisma.country.findMany();
};

const deleteCountry = async (id) => {
  return prisma.country.delete({ where: { id } });
};

const updateCountry = async (id, data) => {
  return prisma.country.update({ where: { id }, data });
};

module.exports = {
  createCountry,
  getCountry,
  deleteCountry,
  updateCountry,
};
