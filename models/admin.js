
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  adminname: { type: String, unique: true, default: function () { return this.email } },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  role: {type: String},
  // Add other Admin-related fields as needed
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

