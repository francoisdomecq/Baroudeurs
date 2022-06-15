import City from './City';
import { QueteSchema } from './Quete';
import { SuccesSchema } from './Succes';
const mongoose = require('mongoose');

const localisationSchema = mongoose.Schema(
  {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false }
);

export const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  typeVisiteur: { type: String, required: true },
  localisation: { type: localisationSchema, required: true },
  cityPicked: { type: City, required: true },
  score: { type: Number, required: true },
  queteEnCours: [QueteSchema],
  queteTerminees: [QueteSchema],
  listeSucces: [SuccesSchema]
});

module.exports = mongoose.model('Succes', UserSchema);
