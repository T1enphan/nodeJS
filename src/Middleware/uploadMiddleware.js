// middlewares/uploadMiddleware.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Đảm bảo thư mục tồn tại
const uploadDir = path.join(__dirname, "../public/uploads/blog");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// xử lý hình ảnh bằng multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // thư mục lưu trữ hình ảnh của user
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Định nghĩa các cấu hình khác nhau tùy vào nhu cầu
const uploadSingle = multer({ storage }).single("avatar");
const uploadArray = multer({ storage }).array("avatar", 3);
// avatar đây là trường trong bảng user nếu dùng cho bảng khác nên đổi trường lại
module.exports = {
  uploadSingle,
  uploadArray,
};
