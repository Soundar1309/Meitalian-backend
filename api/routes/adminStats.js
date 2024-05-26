const express = require('express');
const router = express.Router();
// Import your middleware
const User = require('../models/User');
const Menu = require('../models/Menu');
const Order = require('../models/Order');
const Payment = require('../models/Payments');

// middleware
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const menuItems = await Menu.countDocuments();
    const confirmedOrders = await Order.aggregate([
      {
        $match: {
          status: "Delivered"
        }
      },
      {
        $count: "confirmedCount" // Assigns the count to a field named "confirmedCount"
      }
    ]);;

    const result = await Order.aggregate([
      {
        $match: {
          status: "Delivered"
        }
      },
      {
        $group: {
          _id: null, // Set to null for overall sum
          totalRevenue: { $sum: "$total" } // Accumulate the sum of "total" field
        }
      }
    ]);

    const orders = confirmedOrders.length > 0 ? confirmedOrders[0].confirmedCount : 0;
    const revenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.json({
      users,
      menuItems,
      orders,
      revenue
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
