const categoryModel = require("../models/categoryModel");

const createCategory = async (req, res) => {
  const data = req.body;
  const category = await categoryModel.createCategory(data);
  res.status(200).json(category);
};

const getDataCategory = async () => {
  const category = await categoryModel.getDataCategory();
  res.status(200).json(category);
};

const deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  await categoryModel.deleteCategory(id);
  res.status(200).json({ message: "Category deleted" });
};

const updateCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, status } = req.body;
  const category = await categoryModel.updateCategory(id, { name, status });
  res.status(200).json(category);
};

module.exports = {
  createCategory,
  getDataCategory,
  deleteCategory,
  updateCategory,
};
