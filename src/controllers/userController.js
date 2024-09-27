const userModel = require("../models/userModel");
const { validateUser } = require("../validation/userValidation");
const {
  uploadSingle,
  uploadArray,
  uploadSingleUser,
  uploadArrayUser,
} = require("../Middleware/uploadMiddleware");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendMail = require("../SendMail/sendMail");

function createJWT(user) {
  const { id, name, email, address, phone } = user; // Lấy thông tin người dùng
  const token = jwt.sign(
    { userId: id, name, email, address, phone }, // Đưa vào token
    "neit",
    { expiresIn: "5h" }
  );
  return token;
}

const loginUser = async (req, res) => {
  const data = req.body;
  const checkLogin = await userModel.checkLoginUser(data);
  if (!checkLogin) {
    return res.status(400).json({ message: "Sai mật khẩu hoặc tài khoản" });
  }

  // Tạo token với toàn bộ thông tin người dùng
  const token = createJWT(checkLogin);
  res
    .status(200)
    .json({ message: "Đăng nhập thành công", token: token, user: checkLogin });
};

const createUser = async (req, res) => {
  uploadSingleUser(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { email, name, phone, password, address } = req.body;
    const data = req.body;
    const avatarFile = req.file; // Lấy file ảnh từ req.file

    // Xử lý validate dữ liệu người dùng và file ảnh
    const errors = validateUser(data, avatarFile);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // Kiểm tra email đã tồn tại hay chưa
    const errorEmailExist = await userModel.checkEmail(data.email);
    if (Object.keys(errorEmailExist).length > 0) {
      return res.status(400).json(errorEmailExist);
    }

    // Xử lý upload file (chỉ một ảnh) cho user
    // data.avatar = avatarFile ? avatarFile.path : null;
    let avatarPath = null;
    if (avatarFile) {
      avatarPath = `/uploads/${avatarFile.filename}`;
    }
    // Tạo token kích hoạt
    const activationToken = crypto.randomBytes(32).toString("hex");

    try {
      const user = await userModel.createUser({
        email,
        name,
        phone,
        address,
        password: await bcrypt.hash(password, 10),
        avatar: avatarPath,
        activationToken, // Lưu token kích hoạt vào user
      });
      res.status(200).json(user);
      console.log(user);

      // Tạo liên kết kích hoạt
      const activationLink = `http://localhost:3000/activate/${activationToken}`;
      await sendMail(
        email,
        "Welcome!",
        "Welcome to our service!",
        "./templateMail.hbs",
        { name, activationLink } // Truyền các biến thay thế cho template
      );
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Có lỗi xảy ra khi đăng ký user" });
    }
  });
};

async function activateAccount(req, res) {
  const { token } = req.params;

  console.log("Received token from request:", token); // Log token nhận được từ request

  try {
    const message = await userModel.activateAccount(token);
    res.status(200).json({ message });
  } catch (error) {
    // In ra lỗi chi tiết để kiểm tra
    console.error("Error activating account:", error); // Log chi tiết lỗi
    if (error.message === "Invalid activation token") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({
      message: "An error occurred while activating the account",
      error: error.message,
    });
  }
}

// get all dataUser
const getUsers = async (req, res) => {
  const users = await userModel.getUsers();
  res.status(200).json(users);
};

// update user by id
const updateUsers = async (req, res) => {
  uploadSingleUser(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const id = parseInt(req.params.id);
    const { name, email, phone } = req.body;
    const avatarFile = req.file;

    // Validate input
    const errors = validateUser({ name, email, phone }, avatarFile);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // Update avatar path
    let avatarPath = null;
    if (avatarFile) {
      avatarPath = `/uploads/${avatarFile.filename}`;
    }

    try {
      const user = await userModel.updateUser(id, {
        name,
        email,
        phone,
        avatar: avatarPath, // Ensure avatar is a single path string
      });
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Có lỗi xảy ra khi update user" });
    }
  });
};

// find user by id
const findUserByID = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await userModel.getUserByID(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json({ error: "User not found" });
  }
};

// delete user by id
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  await userModel.deleteUser(id);
  res.status(200).json({ message: "User deleted!" });
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUsers,
  findUserByID,
  createJWT,
  loginUser,
  activateAccount,
};
