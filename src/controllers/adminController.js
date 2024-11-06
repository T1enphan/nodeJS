const adminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../SendMail/sendMail");
const chatClient = require("../streamChatConfig");
const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();




function createJWT(adminId, adminname) {
  // Sử dụng bí mật JWT từ biến môi trường nếu có
  const token = jwt.sign(
    { adminId, adminname },
    process.env.JWT_SECRET || "neit",
    { expiresIn: "5h" }
  );
  return token;
}

const loginAdmin = async (req, res) => {
  const data = req.body;
  const checkLogin = await adminModel.checkLoginAdmin(data);
  if (!checkLogin) {
    return res.status(400).json({ message: "Sai mật khẩu hoặc tài khoản" });
  }
  const token = createJWT(checkLogin.id, checkLogin.adminname);
  res
    .status(200)
    .json({ message: "Đăng nhập thành công", token: token, admin: checkLogin });
};

const registerAdminAcc = async (req, res) => {
  const { email, phone, name, password, role } = req.body; // Lấy thông tin từ yêu cầu
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash mật khẩu

    const errorEmailExist = await adminModel.checkEmail(email);
    if (Object.keys(errorEmailExist).length > 0) {
      return res.status(400).json(errorEmailExist);
    }

    // Kiểm tra role có hợp lệ hay không
    if (!["SUPER_ADMIN", "ADMIN", "MODERATOR"].includes(role)) {
      return res.status(400).json({ error: "Invalid role value." });
    }

    const admin = await adminModel.createAdminAccount({
      email,
      name,
      phone,
      password: hashedPassword,
      role, // Đảm bảo role là một giá trị hợp lệ
    });
    await sendMail(
      email,
      "Welcome!",
      "Welcome to our service!",
      "./templateMail.hbs",
      { name } // Truyền các biến thay thế cho template
    );
    res.status(200).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create admin account",
      details: error.message,
    });
  }
};

const generateAdminToken = async (req, res) => {
  try {
    // Lấy thông tin admin từ database
    const adminId = req.params.id; // ID của admin được truyền qua URL hoặc body
    const admin = await prisma.admin.findUnique({ where: { id: parseInt(adminId) } });

    if (!admin) {
      return res.status(404).json({ error: "Admin không tồn tại" });
    }

    // Tạo token cho Stream Chat dựa trên admin ID
    const token = chatClient.createToken(admin.id.toString());

    res.status(200).json({ token, admin });
  } catch (error) {
    console.error("Lỗi khi tạo token cho admin:", error);
    res.status(500).json({ error: "Lỗi server khi tạo token cho admin" });
  }
};

module.exports = {
  registerAdminAcc,
  loginAdmin,
  createJWT,
  generateAdminToken

};
