const testModel = require("../models/testModel");
// const { validateBlog } = require("../validation/blogValidation");
const { validateTest } = require("../validation/testValidation");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../public/uploads/blog");
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
    console.log("log fieldname: ", file.fieldname);
  },
});
const upload = multer({ storage }).array("avatar", 3);

const createTestBlog = async (req, res) => {
  const data = req.body;
  //   const imgFile = req.file ? [req.file] : req.file;
  const errors = validateTest(data);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  //   data.image = imgFile ? imgFile.map((file) => file.path) : [];
  //   data.image = JSON.stringify(data.image);
  const testBlog = await testModel.createTestBlog(data);
  res.json(testBlog);
};
module.exports = {
  createTestBlog,
  upload,
};
