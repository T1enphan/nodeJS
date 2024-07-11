const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const testController = require("../controllers/testController");
// Định nghĩa các tuyến đường API ở đây
router.post("/create-user", userController.upload, userController.createUser);
// router.get('/get-data', userController.createUser);
router.get("/get-data", userController.getUsers);
router.delete("/delete/:id", userController.deleteUser);
router.put("/update/:id", userController.updateUsers);
router.get("/find-user/:id", userController.findUserByID);

// router.post("/create-blog", blogController.upload, blogController.createBlog);
router.post("/create-test", testController.createTestBlog);
router.post("/create-comment", commentController.creatComment);

router.get("/example", (req, res) => {
  res.send(
    "bị lỗi này thì viết arrow func :Route.post() requires a callback function but got a [object Undefined]"
  );
});

module.exports = router;
