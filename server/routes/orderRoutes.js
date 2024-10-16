const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel'); // Assuming you have an Order model

// POST route to handle order submission
router.post('/create', async (req, res) => {
  const { cartItems, deliveryInfo, totalPrice } = req.body;

  try {
    // Create a new order document
    const newOrder = new Order({
      items: cartItems,
      deliveryInfo,
      totalPrice,
      date: new Date(),
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving order', details: err });
  }
});

module.exports = router;
