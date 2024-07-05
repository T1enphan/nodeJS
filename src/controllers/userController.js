
const userModel = require('../models/userModel');


// Tạo một người dùng mới
const createUser = async (req, res) => {
 const data = req.body;
 console.log(data);
 const user = await userModel.createUser(data);
 res.json(user);
};
module.exports = {
 createUser
};
