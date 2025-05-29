const express = require('express');
const Season = require('../models/season');
const router = express.Router();


// POST route
router.post('/season', async (req, res) => {
    try {
      const { seasonName, crops, user } = req.body;
      const season = new Season({ seasonName, crops, user });
      await season.save();
      res.status(201).json({ message: 'Crops saved successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save crops.' });
    }
  });
  // GET all seasons for a specific user
  router.get('/seasons/:userId', async (req, res) => {
    const { userId } = req.params;
  console.log(userId);
    try {
      const seasons = await Season.find({ user: userId });
  
      if (!seasons.length) {
        return res.status(404).json({ message: 'No crop data found for this user.' });
      }
  
      res.json(seasons);
    } catch (error) {
      console.error('Error fetching crops:', error);
      res.status(500).json({ error: 'Failed to fetch crop data.' });
    }
  });

  module.exports=router;