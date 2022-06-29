const mongoose = require('mongoose');
Schema = mongoose.Schema;

const Quartier = require('./Quartier');
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
  polygon: [polygonSchema],
  quartiers: [{ type: Schema.Types.ObjectId, ref: Quartier }]
});

module.exports = mongoose.model('City', citySchema);
