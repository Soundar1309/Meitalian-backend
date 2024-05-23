const Carts = require("../models/Carts");
const Order = require("../models/Order");
const User = require("../models/User");

const getOrderByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = email ? { email: email } : {};

    // const decodedEmail = req.decoded.email;

    // if (email !== decodedEmail) {
    //   return res.status(403).json({ message: "Forbidden access!" });
    // }

    const orders = await Order.find(query);

    if (!orders || orders.length === 0) {
      return res.status(500).json({ message: "Order items not found" });
    }

    const emails = [...new Set(orders.map((order) => order.email))];

    const users = await User.find({ email: { $in: emails } });

    const userMap = users.reduce((acc, user) => {
      acc[user.email] = { name: user.name, mobileNumber: user.mobileNumber };
      return acc;
    }, {});

    const ordersWithUserDetails = orders.map((order) => ({
      ...order.toObject(),
      userName: userMap[order.email]?.name || "Unknown User",
      mobileNumber: userMap[order.email]?.mobileNumber || "Unknown Number",
    }));

    res.status(200).json({
      message: "Order retrieved successfully!",
      orders: ordersWithUserDetails,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getOrderByEmail,
  updateOrder,
};
