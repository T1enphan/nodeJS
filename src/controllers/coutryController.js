const countryModel = require("../models/countryModel");

const createCountry = async (req, res) => {
  const data = req.body;
  const country = await countryModel.createCountry(data);
  res.status(200).json(country);
};

const getDataCountry = async (req, res) => {
  const country = await countryModel.getCountry();
  res.status(200).json(country);
};

const deleteCountry = async (req, res) => {
  const id = parseInt(req.params.id);
  await countryModel.deleteCountry(id);
  res.status(200).json({ message: "Country deleted" });
};

const updateCountry = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const country = await countryModel.updateCountry(id, { name });
  res.status(200).json(country);
};

module.exports = {
  createCountry,
  getDataCountry,
  deleteCountry,
  updateCountry,
};
