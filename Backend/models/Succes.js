const mongoose = require('mongoose');

export const SuccesSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true }
  },
);

module.exports = mongoose.model('Succes', SuccesSchema);
