const Address = require("../models/Address");
const User = require("../models/User");

// get all address
const getAllAddresses = async (req, res) => {
  const email = req.params.id;
  const getUser = await User.findOne({ email });
  if (!getUser) {
    return res.status(500).json({ message: "User not found" });
  }
  try {
    const address = await Address.find({ userId: getUser._id });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAddressesById = async (req, res) => {
  const addressId = req.params.id;
  try {
    const address = await Address.findById({ _id: addressId });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update address up address id
const updateAddressesByAddressId = async (req, res) => {
  const addressId = req.params.id;
  const revisedAddress = req.body;
  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId },
      revisedAddress,
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Failed to update the address" });
    }
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add address
const addAddressByUserId = async (req, res) => {
  const { user_email, name, pincode, locality, area, city, landmark } =
    req.body;

  try {
    const getUser = await User.findOne({ email: user_email });
    if (!getUser) {
      return res.status(500).json({ message: "User not found" });
    }

    let payload = {
      name,
      pincode,
      locality,
      area,
      city,
      landmark,
      userId: getUser._id,
    };

    const result = await Address.create(payload);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete address
const deleteAddress = async (req, res) => {
  const addressId = req.params.id;
  try {
    const deletedAddress = await Address.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAddresses,
  addAddressByUserId,
  getAddressesById,
  updateAddressesByAddressId,
  deleteAddress,
};
