const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

// get all users
router.get("/", verifyToken, verifyAdmin, (req, res) => {
  userController.getAllUsers(req, res);
});

// create a new user
router.post("/", userController.createUser);

// get user by email
router.get("/:id", userController.getUserByEmail);

//update user
router.patch("/update", userController.updateUser);

//update Address
router.patch("/update-address", userController.updateAddress);

// delete a user
router.delete("/:id", verifyToken, verifyAdmin, userController.deleteUser);

// get admin
router.get("/admin/:email", verifyToken, userController.getAdmin);

// make admin
router.patch("/admin/:id", verifyToken, verifyAdmin, userController.makeAdmin);

module.exports = router;
