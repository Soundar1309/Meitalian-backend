const Carts = require("../models/Carts");
const Order = require("../models/Order");

const getOrderByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };

    const decodedEmail = req.decoded.email;

    if (email !== decodedEmail) {
      return res.status(403).json({ message: "Forbidden access!" });
    }

    const cart = await Carts.find(query).exec();

    if (!cart || cart?.length == 0) {
      return res.status(500).json({ message: "Cart items not found" });
    }

    const orderItems = cart?.map((cartItem) => ({
      name: cartItem.name,
      recipe: cartItem.recipe,
      image: cartItem.image,
      price: cartItem.price,
      quantity: cartItem.quantity,
      email: cartItem.email,
      size: cartItem.size,
      toppings: cartItem.toppings,
    }));

    const newOrder = {
      orderItems,
    };

    const order = await Order.create(newOrder);
    const deleteCart = await Carts.deleteMany({ email: email });
    res.status(200).json({ message: "Order created successfully!", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrderByEmail,
};
