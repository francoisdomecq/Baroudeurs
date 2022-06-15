const mongoose = require('mongoose');
const City = require('./City');
const { UserSchema } = require('./User');
const { PISchema } = require('./PointInteret');

const journalSchema = mongoose.Schema({
  user: { type: UserSchema, required: true },
  ville: { type: [City], required: true },
  pointInteret: { type: [PISchema], required: true }
});

module.exports = mongoose.model('Journal', journalSchema);
