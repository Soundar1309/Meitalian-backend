const Carts = require("../models/Carts");
const Order = require("../models/Order");

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

    res.status(200).json({ message: "Order retrieved successfully!", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrderByEmail,
};
