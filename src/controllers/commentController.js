const commentModel = require("../models/commentModel");
const {uploadArray, uploadSingle} =require("../Middleware/uploadMiddleware")
const creatComment = async (req, res) => {
  uploadSingle(req,res, async(err)=>{
    const data = req.body;
    console.log(data);
    const comment = await commentModel.createComment(data);
    res.json(comment);
  })
};

module.exports = {
  creatComment,
};
