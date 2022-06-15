import { PISchema } from './PointInteret';
import { SuccesSchema } from './Succes';

const mongoose = require('mongoose');

const tabImages = mongoose.Schema({
  images: { type: String, required: true }
});

export const QueteSchema = mongoose.Schema({
  name: { type: String, required: true },
  preview: { type: String, required: true },
  description: { type: String, required: true },
  image: [tabImages],
  listePI: [PISchema],
  progession: { type: Number, required: true },
  score: { type: Number, required: true },
  succes: { type: SuccesSchema, required: true }
});

module.exports = mongoose.model('Quete', QueteSchema);
