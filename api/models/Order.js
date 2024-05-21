const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  price: Number,
  quantity: Number,
  email: {
    type: String,
    trim: true,
  },
  size: [String],
  toppings: [String],
});

const orderSchema = new Schema({
  orderItems: [orderItemSchema],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
