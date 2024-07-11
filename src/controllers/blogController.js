const blogModel = require("../models/blogModel");
const { validateBlog } = require("../validation/blogValidation");

const createBlog = async (req, res) => {
  const data = req.body;
  console.log(data);
  const blog = await blogModel.createBlog(data);
  res.json(blog)
}
module.exports = {
  createBlog
}