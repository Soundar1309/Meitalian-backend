const mongoose = require("mongoose");
const { Schema } = mongoose;

const sizeSchema = new mongoose.Schema({
  label: { type: String },
  price: { type: Number },
});

const menuSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  category: [String],
  price: Number,
  toppings: [String],
  size: {
    type: [sizeSchema],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
