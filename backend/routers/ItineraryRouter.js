const express = require('express');
const router = express.Router();
const Itinerary = require('../models/ItineraryModel');

// ➕ Create Itinerary
router.post('/add', (req, res) => {
  console.log(req.body);

  new Itinerary(req.body).save()
    .then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// 📖 Get All Itineraries
router.get('/getall', (req, res) => {
  Itinerary.find()
    .then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// 📖 Get Single Itinerary by ID
router.get('/getbyid/:id', (req, res) => {
  Itinerary.findById(req.params.id)
    .populate('owner', 'name email')
    .populate('destinations')
    .populate('days.activities')
    .then((result) => {
      if (!result) return res.status(404).json({ message: 'Itinerary not found' });
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ✏️ Update Itinerary
router.put('/update/:id', (req, res) => {
  Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      if (!result) return res.status(404).json({ message: 'Itinerary not found' });
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete Itinerary
router.delete('/delete/:id', (req, res) => {
  Itinerary.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) return res.status(404).json({ message: 'Itinerary not found' });
      res.status(200).json({ message: 'Deleted successfully' });
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;


