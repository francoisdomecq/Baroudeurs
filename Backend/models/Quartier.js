const mongoose = require('mongoose');
Schema = mongoose.Schema;

const PISchema = require('./PointInteret');

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
  listePI: [{ type: Schema.Types.ObjectId, ref: PISchema, required: true }]
});

module.exports = mongoose.model('Quartier', QuartierSchema);
