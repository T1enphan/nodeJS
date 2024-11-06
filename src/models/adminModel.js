const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const createAdminAccount = async (data) => {
  return prisma.admin.create({ data });
};

const checkEmail = async (email) => {
  const existEmail = await prisma.admin.findFirst({
    where: {
      email: email,
    },
  });
  const errors = {};
  if (existEmail) {
    errors.email = "Email đã tồn tại!";
  }
  return errors;
};

const checkLoginAdmin = async (data) => {
  const existingAdmin = await prisma.admin.findFirst({
    where: {
      email: data.email, // Không cần dùng AND khi chỉ có một điều kiện
    },
  });

  if (!existingAdmin) {
    return false; // Không tìm thấy admin với email này
  }

  // So sánh mật khẩu đã nhập với mật khẩu trong cơ sở dữ liệu
  const passwordMatch = await bcrypt.compare(
    data.password,
    existingAdmin.password
  );

  if (!passwordMatch) {
    return false; // Mật khẩu không trùng khớp
  }

  return existingAdmin; // Đăng nhập thành công
};

const getModeratorsAndAdmins = async () => {
  try {
    // Lấy danh sách các tài khoản có role là MODERATOR hoặc ADMIN
    const admins = await prisma.admin.findMany({
      where: {
        role: {
          in: ["MODERATOR", "ADMIN"],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return admins;
  } catch (error) {
    throw new Error("Failed to retrieve admins");
  }
};




module.exports = {
  createAdminAccount,
  checkEmail,
  checkLoginAdmin,
  getModeratorsAndAdmins,
};
