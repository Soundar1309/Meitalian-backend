const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  userId: String,
  name: String,
  pincode: String,
  locality: String,
  area: String,
  city: String,
  landmark: String,
  defaultAddress: Boolean,
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
