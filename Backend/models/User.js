const mongoose = require('mongoose');
Schema = mongoose.Schema;

const City = require('./City');
const QueteSchema = require('./Quete');
const Succes = require('./Succes');

const localisationSchema = mongoose.Schema(
  {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false }
);

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  typeVisiteur: { type: String, default: 'Visiteur' },
  localisation: {
    type: localisationSchema,
    default: { latitude: 0, longitude: 0 }
  },
  cityPicked: { type: Schema.Types.ObjectId, ref: City, default: null },
  score: { type: Number, required: true },
  queteEnCours: [{ type: Schema.Types.ObjectId, ref: QueteSchema }],
  queteTerminees: [{ type: Schema.Types.ObjectId, ref: QueteSchema }],
  listeSucces: [{ type: Schema.Types.ObjectId, ref: Succes }]
});

module.exports = mongoose.model('User', UserSchema);
