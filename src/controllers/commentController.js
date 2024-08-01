const commentModel = require("../models/commentModel");
const { uploadArray, uploadSingle } = require("../Middleware/uploadMiddleware");
const creatComment = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Error uploading file" });
    }

    let data = req.body;

    // Chuyển đổi các giá trị cần thiết từ chuỗi thành số nguyên
    data.id_user = parseInt(data.id_user, 10);
    data.id_blog = parseInt(data.id_blog, 10);
    data.level = parseInt(data.level, 10);
    console.log(data);

    try {
      const comment = await commentModel.createComment(data);
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Error creating comment" });
    }
  });
};
const getDataComment = async (req, res) => {
  const comment = await commentModel.getDataComment();
  res.status(200).json(comment);
};

module.exports = {
  creatComment,
  getDataComment,
};
