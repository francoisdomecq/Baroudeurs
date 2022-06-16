const mongoose = require('mongoose');
Schema = mongoose.Schema;

const PISchema = require('./PointInteret');
const SuccesSchema = require('./Succes');

const tabImages = mongoose.Schema({
  images: { type: String, required: true }
});

const QueteSchema = mongoose.Schema({
  name: { type: String, required: true },
  preview: { type: String, required: true },
  description: { type: String, required: true },
  image: [tabImages],
  listePI: [{ type: Schema.Types.ObjectId, ref: PISchema }],
  progession: { type: Number, required: true },
  score: { type: Number, required: true },
  succes: { type: Schema.Types.ObjectId, ref: SuccesSchema, required: true }
});

module.exports = mongoose.model('Quete', QueteSchema);
