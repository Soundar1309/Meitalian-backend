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
  size: [String],
  toppings: [String],
});

const orderSchema = new Schema({
  orderItems: [orderItemSchema],
  email: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  address: {
    type: Object,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
