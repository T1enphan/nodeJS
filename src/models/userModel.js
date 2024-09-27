const bcrypt = require("bcryptjs/dist/bcrypt");
const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

// Tạo một người dùng mới
const createUser = async (data) => {
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

const checkEmail = async (email) => {
  const existEmail = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  const errors = {};
  if (existEmail) {
    errors.email = "email đã tồn tại";
  }
  return errors;
};

const checkLoginUser = async (data) => {
  //ktr email đã tồn tại hay chưa
  const existingUser = await prisma.user.findFirst({
    where: {
      AND: [{ email: data.email }],
    },
  });
  if (!existingUser) {
    return false;
  }
  const passwordMatch = await bcrypt.compare(
    data.password,
    existingUser.password
  );
  if (passwordMatch) {
    if (!passwordMatch) {
      return false;
    }
    return existingUser;
  }
};
async function activateAccount(token) {
  console.log("Received token:", token);
  // Tìm người dùng dựa trên token
  const user = await prisma.user.findUnique({
    where: {
      activationToken: token,
    },
  });
  if (!user) {
    throw new Error("Invalid activation token");
  }
  console.log("User found with ID:", user.id);
  console.log("Updating user ID:", user.id);
  // Cập nhật trạng thái kích hoạt và xóa token
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isActivated: true, // Cập nhật trạng thái kích hoạt
      activationToken: null, // Xóa token
    },
  });

  return "Account activated successfully";
}
module.exports = {
  createUser,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
  checkEmail,
  checkLoginUser,
  activateAccount,
};
