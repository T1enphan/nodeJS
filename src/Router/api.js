const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Định nghĩa các tuyến đường API ở đây
router.post('/create-user', userController.createUser);
// router.get('/get-data', userController.createUser);


router.get("/example",(req,res)=>{
    res.send("bị lỗi này thì viết arrow func :Route.post() requires a callback function but got a [object Undefined]")
})

module.exports = router;




