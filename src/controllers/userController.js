const userModel = require("../models/userModel");
const { validateUser } = require("../validation/userValidation");
const multer = require("multer");
const path = require("path");

const fs = require("fs");

// Đảm bảo thư mục tồn tại
const uploadDir = path.join(__dirname, "../public/uploads/user");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// xử lý hình ảnh bằng multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); //thư mục lưu trữ hình ảnh của user
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
// const upload =multer({storage});
// const upload = multer({ storage }).single("avatar");
const upload = multer({ storage }).array("avatar", 3);
// const upload = multer({storage}).fields([
//   {name: 'avatar', maxCount: 3}
//   thêm các trường khác nếu cần
// ])

// đây là hàm tạo người dùng upload 1 ảnh
// const createUser = async (req, res) => {
//   const { email, name, phone, avatar } = req.body; // Thêm dòng này để destructuring dữ liệu từ data
//   const data = req.body;
//   // const avatarFiles = req.file;
//   const errors = validateUser(data, avatarFiles);
//   if (Object.keys(errors).length > 0) {
//     return res.status(400).json(errors);
//   }
//   const errorEmailExist = await userModel.checkEmail(data.email);
//   if (Object.keys(errorEmailExist).length > 0) {
//     return res.status(400).json(errorEmailExist);
//   }

//   //xử lý upload file (đây là upload 1 ảnh) ảnh cho user
//   // data.avatar = req.file ? avatarFiles.path : ""; // Đường dẫn tới tệp hình ảnh (nếu có)
//   const user = await userModel.createUser(data);
//   res.json(user);
// };

// đây là hàm tạo người dùng upload 1 array ảnh
const createUser = async (req, res) => {
  const { email, name, phone, avatar } = req.body;
  const data = req.body;
  console.log(data);
  // const avatarFiles = req.file ? [req.file] : req.files; // Chuyển đổi req.file thành mảng nếu chỉ có một tệp

  // const errors = validateUser(data, avatarFiles);
  // if (Object.keys(errors).length > 0) {
  //   return res.status(400).json(errors);
  // }

  // const errorEmailExist = await userModel.checkEmail(data.email);
  // if (Object.keys(errorEmailExist).length > 0) {
  //   return res.status(400).json(errorEmailExist);
  // }

  // // Xử lý upload file (đây là upload nhiều ảnh tùy theo số lượng bạn gán ở trên) ảnh cho user
  // data.avatar = avatarFiles ? avatarFiles.map((file) => file.path) : [];
  // data.avatar = JSON.stringify(data.avatar);

  // const user = await userModel.createUser(data);
  // res.json(user);
};

// get all dataUser
const getUsers = async (req, res) => {
  const users = await userModel.getUsers();
  res.json(users);
};
// update user by id

const updateUsers = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone, avatar } = req.body;
  const errors = validateUser({ name, email, phone, avatar });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  const user = await userModel.updateUser(id, { name, email, phone, avatar });
  console.log(user);
  res.json(user);
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
  upload,
};
