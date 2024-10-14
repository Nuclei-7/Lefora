const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number,
      img: String,
    },
  ],
  deliveryInfo: {
    name: String,
    mobile: String,
    email: String,
    city: String,
    state: String,
    zip: String,
    address: String,
  },
  totalPrice: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
