// 🗓️ Itinerary Model - travel plan ka schema
const mongoose = require('mongoose');

const DayPlanSchema = new mongoose.Schema({
  // date: { type: Date, required: true },
  day: Number,
  activities: String,
  places: String
}, { _id: false });

const ItinerarySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: [DayPlanSchema],
  destinations: String  ,
  guests: { type: Number, default: 1 },
  estimatedCost: { type: Number, default: 0 },
  tags: [String],
  isPublic: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ItinerarySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);