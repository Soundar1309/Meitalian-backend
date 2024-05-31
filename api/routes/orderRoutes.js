const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderControllers");

const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/", orderController.getOrderByEmail);

router.patch("/:id", orderController.updateOrder);

// delete a menu item
router.delete("/:id", verifyToken, verifyAdmin, orderController.deleteOrder);

module.exports = router;
