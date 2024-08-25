const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const countryController = require("../controllers/coutryController");
const productController = require("../controllers/productController");
const brandController = require("../controllers/brandController");
const categoryController = require("../controllers/categoryController");
// Định nghĩa các tuyến đường API ở đây

function requireAuth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized1" });
  }
  try {
    const decoded = jwt.verify(token, "neit");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return res.status(401).json({ error: "Unauthorized2" });
  }
}
// USER LOGIN
router.post("/login", userController.loginUser);
router.post("/register", userController.createUser);

//USER API
router.get("/get-data", userController.getUsers);
router.delete("/delete/:id", userController.deleteUser);
router.put("/update/:id", requireAuth, userController.updateUsers);
router.get("/find-user/:id", userController.findUserByID);
//BLOG API
router.post("/create-blog", blogController.createBlog);
router.get("/blog/get-data", blogController.getAllBlog);
router.get("/get-all-data-blog/:id", blogController.getBlogWithComments);
// id đây là id blog
router.delete("/blog/delete/:id", blogController.deleteBlog);
//COMMENT API
router.post("/create-comment", commentController.creatComment);
router.get("/comment/get-data", commentController.getDataComment);
//COUNTRY API
router.post("/country/create", countryController.createCountry);
router.get("/country/get-data", countryController.getDataCountry);
router.delete("/country/delete/:id", countryController.deleteCountry);
router.put("/country/update/:id", countryController.updateCountry);
// PRODUCT API
router.post("/product/create", productController.createProduct);
router.get("/product/get-data", productController.getDataProduct);
router.post("/product/change-status/:id", productController.changeStatus);
router.delete("/product/delete/:id", productController.deleteProduct);
router.put("/product/update/:id", productController.updateProduct);
router.post("/product/cart", productController.productCart);
router.get("/product/search", productController.searchProductsController);
// BRAND API
router.post("/brand/create", brandController.creatBrand);
router.get("/brand/get-data", brandController.getDataBrand);
router.put("/brand/update/:id", brandController.updateBrand);
router.delete("/brand/delete/:id", brandController.deleteBrand);
// CATEGORY API
router.post("/category/create", categoryController.createCategory);
router.get("/category/get-data", categoryController.getDataCategory);
router.delete("/category/delete/:id", categoryController.deleteCategory);
router.put("/category/update/:id", categoryController.updateCategory);
///Example
router.get("/example", (req, res) => {
  res.send(
    "bị lỗi này thì viết arrow func :Route.post() requires a callback function but got a [object Undefined]"
  );
});

module.exports = router;
