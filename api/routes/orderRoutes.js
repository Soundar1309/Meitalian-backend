const express = require("express");
// const Carts = require("../models/Carts");
// const Order = require("../models/Order");
const router = express.Router();

const orderController = require("../controllers/orderControllers");

const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/", verifyToken, (req, res) => {
  orderController.getOrderByEmail(req, res);
});

module.exports = router;