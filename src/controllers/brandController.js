const brandModel = require("../models/brandModel");

const creatBrand = async (req, res) => {
  const data = req.body;
  const brand = await brandModel.createBrand(data);
  res.status(200).json(brand);
};

const getDataBrand = async (req, res) => {
  const brand = await brandModel.getDataBrand();
  res.status(200).json(brand);
};

const deleteBrand = async (req, res) => {
  const id = parseInt(req.params.id);
  await brandModel.deleteBrand(id);
  res.status(200).json({ message: "Brand deleted" });
};

const updateBrand = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, status } = req.body;
  const brand = await brandModel.updateBrand(id, { name, status });
  res.status(200).json(brand);
};

module.exports = {
  creatBrand,
  getDataBrand,
  deleteBrand,
  updateBrand,
};
