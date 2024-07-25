const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const countryController = require("../controllers/coutryController");
// Định nghĩa các tuyến đường API ở đây

// function requireAuth(req, res, next) {
//   const token = req.headers.authorization.split(" ")[1];
//   console.log(token);
//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized1" });
//   }
//   try {
//     const decoded = jwt.verify(token, "neit");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Error during token verification:", error);
//     return res.status(401).json({ error: "Unauthorized2" });
//   }
// }
// USER LOGIN
router.post("/login", userController.loginUser);
router.post("/register", userController.createUser);

//USER API
router.get("/get-data", userController.getUsers);
router.delete("/delete/:id", userController.deleteUser);
router.put("/update/:id", userController.updateUsers);
router.get("/find-user/:id", userController.findUserByID);
//BLOG API
router.post("/create-blog", blogController.createBlog);
router.get("/blog/get-data", blogController.getAllBlog);
router.get("/get-all-data-blog/:id", blogController.getBlogWithComments);
router.delete("/blog/delete/:id", blogController.deleteBlog);
//COMMENT API
router.post("/create-comment", commentController.creatComment);

//COUNTRY API
router.post("/country/create", countryController.createCountry);
router.get("/country/get-data", countryController.getDataCountry);
router.delete("/country/delete/:id", countryController.deleteCountry);
router.put("/country/update/:id", countryController.updateCountry);

///Example
router.get("/example", (req, res) => {
  res.send(
    "bị lỗi này thì viết arrow func :Route.post() requires a callback function but got a [object Undefined]"
  );
});

module.exports = router;
