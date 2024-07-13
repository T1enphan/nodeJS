const blogModel = require("../models/blogModel");
const { validateBlog } = require("../validation/blogValidation");
const {uploadArray, uploadSingle} = require("../Middleware/uploadMiddleware")


const createBlog = async (req, res) => {
  uploadArray(req, res, async (err) => {
    if(err) {
      return res.status(400).json({error : err.message});
    }
    const data = req.body;
    const imageFiles = req.files;

    const errors = validateBlog(data, imageFiles);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    data.image = imageFiles ? imageFiles.map((file) => file.path) : [];
    data.image = JSON.stringify(data.image);

    const blog = await blogModel.createBlog(data);
    res.json(blog);
  })
};

const getBlogWithComments = async (req, res) => {
  const id = parseInt(req.params.id);
  const blog = await blogModel.getBlogWithComments(id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: 'blog not found' });
  }
}



module.exports = {
  createBlog,
  getBlogWithComments
}