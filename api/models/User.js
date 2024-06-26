const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    minlength: 3,
  },
  photoURL: String,
  role: {
    type: String,
    enum: ["user", "admin", "store manager"],
    default: "user",
  },
  mobileNumber: String,
  address: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
