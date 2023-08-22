const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  contentType: Number,
  title: String,
  time: String,
});

const chapterSchema = new mongoose.Schema({
  title: String,
  topics: [topicSchema],
});

const basicDetailSchema = new mongoose.Schema({
  title: String,
  value: String
});


const courseDetailsSchema = new mongoose.Schema({
  learn: [String],
  basicDetails: [basicDetailSchema],
  courseContents: {
    chapters: [chapterSchema]
  },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  offer: { type: Number },
  teacher: { type: String, required: true },
  image: { type: String },
  language: { type: String },
  highlights: [String],
  lectures: { type: Number },
  mode: { type: String, enum: ['live', 'recorded'] },
  instructor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  courseDetails: courseDetailsSchema,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
