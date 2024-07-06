const userModel = require("../models/userModel");

// Tạo một người dùng mới
const createUser = async (req, res) => {
  const data = req.body;
  //   console.log(data);
  const user = await userModel.createUser(data);
  res.json(user);
};
// get all dataUser
const getUsers = async (req, res) => {
  const users = await userModel.getUsers();
  res.json(users);
};
// update user by id

const updateUsers = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone, avatar } = req.body;
  const user = await userModel.updateUser(id, { name, email, phone, avatar });
  console.log(user);
  res.json(user);
};
// find user by id
const findUserByID = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await userModel.getUserByID(id);
  if (user) {
    res.json(user);
  } else {
    res.status(500).json({ error: "User not found" });
  }
};

// delete user by id
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  await userModel.deleteUser(id);
  res.json({ message: "User deleted!" });
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUsers,
  findUserByID,
};
