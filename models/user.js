const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, default: function () { return this.email } }, 
  phone: { type: String, required: true },
  password: { type: String, required: true },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  favoriteCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  // Add other user-related fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
