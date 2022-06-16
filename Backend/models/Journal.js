const mongoose = require('mongoose');
Schema = mongoose.Schema;

const City = require('./City');
const UserSchema = require('./User');
const PISchema = require('./PointInteret');

const journalSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: UserSchema, required: true },
  ville: [{ type: Schema.Types.ObjectId, ref: City, required: true }],
  pointInteret: [{ type: Schema.Types.ObjectId, ref: PISchema, required: true }]
});

module.exports = mongoose.model('Journal', journalSchema);
