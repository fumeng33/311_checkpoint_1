const express = require ('express');
const router = express.Router();
const userController = require("../controllers/users");

// const commentController = require('../controllers/comments');

//GET

router.get("/users", userController.listUsers)

router.get("/users/:id", userController.showUser)

router.put("/users/:id", userController.updateUser)


router.post("/users", userController.createUser)


router.delete("/users/:id", userController.deleteUser)


module.exports = router