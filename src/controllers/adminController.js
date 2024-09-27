const adminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../SendMail/sendMail");

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
    .json({ message: "Đăng nhập thành công", token: token, user: checkLogin });
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
module.exports = {
  registerAdminAcc,
  loginAdmin,
  createJWT,
};
