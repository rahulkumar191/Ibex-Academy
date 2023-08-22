const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  // Add more order-related fields as needed
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
