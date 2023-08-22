const mongoose = require('mongoose');

// Define the schema for social links
const socialLinkSchema = new mongoose.Schema({
  name: String,
  url: String,
  icon: String
});

// Define the instructor schema
const instructorSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  socialLinks: [socialLinkSchema]
});

// Create the Instructor model
const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;