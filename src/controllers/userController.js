const userModel = require("../models/userModel");
const { validateUser } = require("../validation/userValidation");
const {
  uploadSingle,
  uploadArray,
  uploadSingleUser,
  uploadArrayUser,
} = require("../Middleware/uploadMiddleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createJWT(userId, username) {
  const token = jwt.sign({ userId, username }, "neit", { expiresIn: "5h" });
  return token;
}

const loginUser = async (req, res) => {
  const data = req.body;
  const checkLogin = await userModel.checkLoginUser(data);
  if (!checkLogin) {
    return res.status(400).json({ message: "Sai mật khẩu hoặc tài khoản" });
  }
  const token = createJWT(checkLogin.id, checkLogin.username);
  res.json({ message: "Đăng nhập thành công", token: token, user: checkLogin });
};

// đây là hàm tạo người dùng upload 1 array ảnh
// const createUser = async (req, res) => {
//   uploadArrayUSer(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     const { email, name, phone, avatar } = req.body;
//     const data = req.body;
//     const avatarFiles = req.files;

//     const errors = validateUser(data, avatarFiles);
//     if (Object.keys(errors).length > 0) {
//       return res.status(400).json(errors);
//     }

//     const errorEmailExist = await userModel.checkEmail(data.email);
//     if (Object.keys(errorEmailExist).length > 0) {
//       return res.status(400).json(errorEmailExist);
//     }

//     // Xử lý upload file (đây là upload nhiều ảnh tùy theo số lượng bạn gán ở trên) ảnh cho user
//     data.avatar = avatarFiles ? avatarFiles.map((file) => file.path) : [];
//     data.avatar = JSON.stringify(data.avatar);
//     // xử lý mã hóa password
//     data.password = await bcrypt.hash(data.password, 10);
//     const user = await userModel.createUser(data);
//     res.json(user);
//   });
// };

const createUser = async (req, res) => {
  uploadSingleUser(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { email, name, phone, password } = req.body;
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
    data.avatar = avatarFile ? avatarFile.path : null;

    // Xử lý mã hóa password
    data.password = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const user = await userModel.createUser(data);
    res.json(user);
  });
};

// get all dataUser
const getUsers = async (req, res) => {
  const users = await userModel.getUsers();
  res.json(users);
};

// update user by id
const updateUsers = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const id = parseInt(req.params.id);
    const { name, email, phone, avatar } = req.body;
    data = req.body;
    const avatarFile = req.file;
    const errors = validateUser({ name, email, phone, avatar }, avatarFile);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    data.avatar = avatarFile ? avatarFile.path : null;
    const user = await userModel.updateUser(id, { name, email, phone, avatar });
    // console.log(user);
    res.json(user);
  });
};

// find user by id
const findUserByID = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await userModel.getUserByID(id);
  if (user) {
    res.json(user);
  } else {
    res.status(500).json({ error: "User not found" });
  }
};

// delete user by id
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  await userModel.deleteUser(id);
  res.json({ message: "User deleted!" });
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUsers,
  findUserByID,
  createJWT,
  loginUser,
};
