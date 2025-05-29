// models/Season.js

const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
  seasonName: {
    type: String,
    required: true,
  },
  crops: {
    type: [String],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // references the User model
    required: true
  }
}, { timestamps: true });
const Season=mongoose.model('Season', SeasonSchema);
module.exports = Season;
