import { PISchema } from './PointInteret';

const mongoose = require('mongoose');

const polygonSchema = mongoose.Schema(
  {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false }
);

const QuartierSchema = mongoose.Schema({
  name: { type: String, required: true },
  polygon: [polygonSchema],
  listePI: [PISchema]
});

module.exports = mongoose.model('Quartier', QuartierSchema);
