const express = require("express");
// const Carts = require("../models/Carts");
// const Order = require("../models/Order");
const router = express.Router();

const orderController = require("../controllers/orderControllers");

const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

// router.get("/", verifyToken, (req, res) => {
//   orderController.getOrderByEmail(req, res);
// });

router.get("/", orderController.getOrderByEmail);

router.patch("/:id", orderController.updateOrder);

// delete a menu item
router.delete("/:id", verifyToken, verifyAdmin, orderController.deleteOrder);

module.exports = router;
