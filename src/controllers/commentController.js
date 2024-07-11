const commentModel = require("../models/commentModel");

const creatComment = async (req, res) => {
  const data = req.body;
  const comment = await commentModel.createComment(data);
  res.json(comment);
};

module.exports = {
  creatComment,
};
