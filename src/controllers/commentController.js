const commentModel = require("../models/commentModel");

const creatComment = async (req, res) => {
  const data = req.body;
  console.log(data);
  // const comment = await commentModel.createComment(data);
  // res.json(comment);
};

module.exports = {
  creatComment,
};
