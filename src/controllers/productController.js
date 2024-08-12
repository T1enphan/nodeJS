const productModel = require("../models/productModel");
const { uploadSingle, uploadArray } = require("../Middleware/uploadMiddleware");

const createProduct = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const {
      id_category,
      id_brand,
      id_user,
      name,
      price,
      status,
      sale,
      detail,
      company_profile,
    } = req.body;

    const imageFile = req.file;

    if (
      !id_category ||
      !id_brand ||
      !id_user ||
      !name ||
      !price ||
      !status ||
      !sale ||
      !detail ||
      !company_profile
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let imagePath = null;
    if (imageFile) {
      imagePath = `/uploads/${imageFile.filename}`;
    }

    // Ghi log các giá trị trước khi gọi creatProduct
    console.log({
      id_category: parseInt(id_category, 10),
      id_brand: parseInt(id_brand, 10),
      id_user: parseInt(id_user, 10),
      name,
      price,
      status,
      sale,
      detail,
      company_profile,
      image: imagePath,
    });

    try {
      const product = await productModel.creatProduct({
        id_category: parseInt(id_category, 10),
        id_brand: parseInt(id_brand, 10),
        id_user: parseInt(id_user, 10),
        status: parseInt(status, 10),
        sale: parseInt(sale, 10),
        price: parseInt(price, 10),
        name,
        detail,
        company_profile,
        image: imagePath,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        error1: error,
      });
    }
  });
};

const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  await productModel.deleteProduct(id);
  res.status(200).json({ message: "Product deleted" });
};

const getDataProduct = async (req, res) => {
  const product = await productModel.getDataProduct();
  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const id = parseInt(req.params.id);
    const {
      id_category,
      id_brand,
      id_user,
      name,
      price,
      status,
      sale,
      detail,
      company_profile,
    } = req.body;

    const imageFile = req.file;

    if (
      !id_category ||
      !id_brand ||
      !id_user ||
      !name ||
      !price ||
      !status ||
      !sale ||
      !detail ||
      !company_profile
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let imagePath = null;
    if (imageFile) {
      imagePath = `/uploads/${imageFile.filename}`;
    }

    console.log({
      id_category: parseInt(id_category, 10),
      id_brand: parseInt(id_brand, 10),
      id_user: parseInt(id_user, 10),
      name,
      price,
      status,
      sale,
      detail,
      company_profile,
      image: imagePath,
    });

    try {
      const product = await productModel.updateProduct(id, {
        id_category: parseInt(id_category, 10),
        id_brand: parseInt(id_brand, 10),
        id_user: parseInt(id_user, 10),
        status: parseInt(status, 10),
        sale: parseInt(sale),
        price: parseInt(price),
        name,
        detail,
        company_profile,
        image: imagePath,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error.message);
    }
  });
};

async function searchProductsController(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const products = await productModel.searchProducts(query);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const changeStatus = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updatedProduct = await productModel.changeStatus(productId);

    res.json({
      message: "Status updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  createProduct,
  deleteProduct,
  getDataProduct,
  updateProduct,
  searchProductsController,
  changeStatus,
};
