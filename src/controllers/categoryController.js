const categoryModel = require("../models/categoryModel");

const createCategory = async (req, res) => {
  const { name, status } = req.body;
  const data = req.body;
  const category = await categoryModel.createCategory({
    name,
    status: parseInt(status, 10),
  });
  res.status(200).json(category);
};

const getDataCategory = async (req, res) => {
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
  const category = await categoryModel.updateCategory(id, {
    name,
    status: parseInt(status, 10),
  });
  res.status(200).json(category);
};

module.exports = {
  createCategory,
  getDataCategory,
  deleteCategory,
  updateCategory,
};
