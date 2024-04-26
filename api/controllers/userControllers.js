const User = require("../models/User");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a new user
const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const existingUser = await User.findOne(query);
    // console.log(existingUser)
    if (existingUser) {
      return res.status(302).json({ message: "User already exists" });
    }

    const result = await User.create(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update user
const updateUser = async (req, res) => {
  const { mobileNumber, email } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { mobileNumber: mobileNumber },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "updated User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const email = req.params.id;
  console.log(email);
  try {
    const getUser = await User.findOne({ email: email });
    console.log(getUser);
    if (!getUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    // console.log(deletedUser);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get admin
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await User.findOne(query);

    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "forbidden access" });
    }

    let admin = false;
    let storeManager = false;

    if (user) {
      admin = user?.role === "admin";
    }

    if (user) {
      storeManager = user?.role === "store manager";
    }

    res.status(200).json({ admin, storeManager });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//make admin of a user

const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  const { name, email, photoURL, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: role },
      { new: true, runValidators: true }
    );

    // console.log(updatedUser)

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  getUserByEmail,
  deleteUser,
  getAdmin,
  makeAdmin,
};
