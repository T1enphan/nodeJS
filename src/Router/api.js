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
const adminController = require("../controllers/adminController");
const orderController = require("../controllers/orderController");
const todoController = require("../controllers/todoController");
// Định nghĩa các tuyến đường API ở đây

function requireAuth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
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

function requireAuthUser(req, res, next) {
  const authHeader = req.headers.authorization;

  // Kiểm tra xem authHeader có tồn tại không
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1]; // Lấy token từ header
  console.log(token);

  // Kiểm tra xem token có tồn tại không
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "neit");
    req.user = decoded; // Gán thông tin người dùng vào req
    next(); // Tiếp tục đến middleware hoặc route handler tiếp theo
  } catch (error) {
    console.error("Error during token verification:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const user = req.user; // Giả sử bạn có cơ chế xác thực người dùng
    if (allowedRoles.includes(user.role)) {
      next(); // Người dùng có quyền truy cập
    } else {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
  };
};

// ADMIN API
router.post(
  "/admin/register",
  // checkRole(["SUPER_ADMIN"]),
  adminController.registerAdminAcc
);
router.post("/admin/login", adminController.loginAdmin);

// USER LOGIN
router.post("/login", userController.loginUser);
router.post("/register", userController.createUser);
router.get("/activate/:token", userController.activateAccount);

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
router.post("/product/sendbill", requireAuthUser, orderController.sendBill);
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
// TODOLIST
router.post("/todo-list/create", todoController.createTodo);
router.get("/todo-list/get-task", todoController.getTaskList);
router.get("/todo-list/get-data", todoController.getModeratorsAndAdmins);
router.delete("/todo-list/delete/:id", todoController.deleteTask);
router.put("/todo-list/update/:id", todoController.updateTask);
router.post("/todo-list/change-status/:id", todoController.changeStatus);
///Example
router.get("/example", (req, res) => {
  res.send(
    "bị lỗi này thì viết arrow func :Route.post() requires a callback function but got a [object Undefined]"
  );
});

module.exports = router;
