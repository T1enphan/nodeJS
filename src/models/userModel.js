const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

// Tạo một người dùng mới
const createUser = async (data) => {
  // console.log(data);
  return prisma.user.create({ data });
};

const getUsers = async () => {
  return prisma.user.findMany();
};

const deleteUser = async (id) => {
  return prisma.user.delete({ where: { id } });
};

const getUserByID = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const updateUser = async (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

const checkEmail = async(email) =>{
  const existEmail = await prisma.user.findFirst({
    where:{
      email:email,
    },
  });
  const errors = {};
  if(existEmail){
    errors.email = 'email đã tồn tại';
  }
  return errors
}


module.exports = {
  createUser,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
  checkEmail
};
