const blogModel = require("../models/blogModel");
const multer = require("multer");
const path = require("path")
const fs = require("fs")


const createBlog = async(req,res) => {
    const data = req.body;
    const blog = await blogModel.createBlog(data);
    res.json(blog)

}
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