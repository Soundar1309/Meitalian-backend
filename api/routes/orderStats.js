const express = require('express');
const router = express.Router();
// Import your middleware
const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payments'); // Corrected import statement

// middleware
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  try {

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Add one day

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of current month
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of current month (adjusted for month length)

    const firstDayOfYear = new Date(today.getFullYear(), 0, 1); // First day of current year
    const lastDayOfYear = new Date(today.getFullYear(), 11, 31); // Last day of current year (adjusted for month length)
    lastDayOfYear.setDate(lastDayOfYear.getDate() + 1)

    const yearCount = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: { $gte: firstDayOfYear, $lt: lastDayOfYear } // Filter for documents created this year (inclusive)
        }
      },
      {
        $count: "confirmedCount" // Assigns the count to a field named "confirmedCountToday"
      }
    ]);

    const monthCount = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: { $gte: firstDayOfMonth, $lt: lastDayOfMonth } // Filter for documents created this month
        }
      },
      {
        $count: "confirmedCount" // Assigns the count to a field named "confirmedCountToday"
      }
    ]);

    const yesterdayCount = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: { $gte: yesterday, $lt: today } // Filter for documents created yesterday
        }
      },
      {
        $count: "confirmedCount" // Assigns the count to a field named "confirmedCountToday"
      }
    ]);

    const todayCount = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: { $gte: today, $lt: tomorrow } // Filter for documents created today
        }
      },
      {
        $count: "confirmedCount" // Assigns the count to a field named "confirmedCountToday"
      }
    ]);

    const response = {
      today: todayCount.length > 0 ? todayCount[0].confirmedCount : 0,
      yesterday: yesterdayCount.length > 0 ? yesterdayCount[0].confirmedCount : 0,
      month: monthCount.length > 0 ? monthCount[0].confirmedCount : 0,
      year: yearCount.length > 0 ? yearCount[0].confirmedCount : 0,
    }
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
