const mongoose = require('mongoose');

const polygonSchema = mongoose.Schema(
  {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false }
);

const citySchema = mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  polygon: [polygonSchema]
});

module.exports = mongoose.model('City', citySchema);
