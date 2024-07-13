const testModel = require("../models/testModel");
const { validateTest } = require("../validation/testValidation");
const { uploadSingle, uploadArray } = require("../Middleware/uploadMiddleware");


const createTestBlog = (req, res) =>{
  uploadSingle(req,res,async(err)=>{
    const data =req.body;
    console.log(data);
  })
}
 
module.exports = {
  createTestBlog,
};
