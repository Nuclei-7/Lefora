const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel"); // Assuming you have an Order model

// POST route to handle order submission
router.post("/create", async (req, res) => {
  const { cartItems, deliveryInfo, totalPrice, scheduleDate } = req.body; // Ensure you include scheduleDate

  try {
    // Create a new order document
    const newOrder = new Order({
      items: cartItems,
      deliveryInfo,
      totalPrice,
      date: new Date(),
      scheduleDate, // Make sure this is included
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: "Order saved successfully!" });
  } catch (err) {
    console.error("Error saving order:", err); // Log the error for better debugging
    res.status(500).json({ error: "Error saving order", details: err.message }); // Include the error message in the response
  }
});

module.exports = router;
