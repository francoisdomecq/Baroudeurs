const mongoose = require('mongoose');

const polygonSchema = mongoose.Schema(
  {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false }
);

const PISchema = mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
  estPrimordial: { type: Boolean, required: true, default: false },
  theme: { type: String },
  typePI: { type: String },
  img: { type: String },
  imgMarker: { type: String },
  histoire: { type: String }
});

module.exports = mongoose.model('PointInteret', PISchema);
