const blogModel = require("../models/blogModel");
const { validateBlog } = require("../validation/blogValidation");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../public/uploads/blog");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
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
const upload = multer({ storage }).single("avatar");

const createBlog = async (req, res) => {
  const data = req.body;
  const imgFiles = req.file;
  const errors = validateBlog(data, imgFiles);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  data.image = imgFiles ? imgFiles.path : "";
  const blog = await blogModel.createBlog(data);
  res.json(blog);
};

const getBlogWithComments = async (req, res) => {
  const id = parseInt(req.params.id);
  const blog = await blogModel.getBlogWithComments(id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: "blog not found" });
  }
};

module.exports = {
  createBlog,
  getBlogWithComments,
  upload,
};
