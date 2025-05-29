const express = require('express');
const router = express.Router();
const CropActivity = require('../models/CropActivity'); // adjust path as needed

// POST /api/activities
router.post('/activities', async (req, res) => {
  try {
    const { user, crop, activityName, activityTime } = req.body;

    if (!user || !crop || !activityName || !activityTime) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newActivity = new CropActivity({
      user,
      crop,
      activityName,
      activityTime
    });

    await newActivity.save();
    res.status(201).json({ message: 'Activity added successfully.' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Failed to add activity.' });
  }
});

module.exports = router;
