const mongoose = require('mongoose');

const CropActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  crop: {
    type: String,
    required: true
  },
  activityName: {
    type: String,
    required: true
  },
  activityTime: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('CropActivity', CropActivitySchema);
