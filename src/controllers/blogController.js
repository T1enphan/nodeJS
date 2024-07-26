const blogModel = require("../models/blogModel");
const { validateBlog } = require("../validation/blogValidation");
const {
  uploadSingle,
  uploadArray,
  uploadSingleUser,
  uploadArrayUser,
} = require("../Middleware/uploadMiddleware");

// const createBlog = async (req, res) => {
//   uploadSingle(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }
//     const { title, description, content, image } = req.body;
//     const data = req.body;
//     const imageFiles = req.file;

//     const errors = validateBlog(data, imageFiles);
//     if (Object.keys(errors).length > 0) {
//       return res.status(400).json(errors);
//     }
//     data.image = imageFiles ? imageFiles.path : null;
//     // data.image = imageFiles ? imageFiles.map((file) => file.path) : [];
//     data.image = JSON.stringify(data.image);

//     const blog = await blogModel.createBlog(data);
//     res.json(blog);
//   });
// };

const createBlog = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const { title, description, content } = req.body;
    const data = req.body;
    const imageFile = req.file;

    const errors = validateBlog(data, imageFile);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    if (imageFile) {
      // Lưu đường dẫn tương đối của ảnh
      data.image = `http://localhost:3003/Users/bonpr/OneDrive/Máy tính/nodeJS/src/public/uploads/blog/${imageFile.filename}`;
    } else {
      data.image = null;
    }

    try {
      const blog = await blogModel.createBlog(data);
      res.json(blog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ message: "Có lỗi xảy ra khi thêm bài viết" });
    }
  });
};

const deleteBlog = async (req, res) => {
  const id = parseInt(req.params.id);
  await blogModel.deleteBlog(id);
  res.json({ message: "Blog deleted" });
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

const getAllBlog = async (req, res) => {
  const blogs = await blogModel.getBlog();
  res.json(blogs);
};

module.exports = {
  createBlog,
  getBlogWithComments,
  getAllBlog,
  deleteBlog,
};
