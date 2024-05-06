const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressControllers");

// get all address
router.get("/:id", addressController.getAllAddresses);

// get addressby id
router.get("/address/:id", addressController.getAddressesById);

// Create Address
router.post("/", addressController.addAddressByUserId);

//update address
router.patch("/:id", addressController.updateAddressesByAddressId);

//delete address
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
