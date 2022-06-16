const mongoose = require('mongoose');

const SuccesSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true }
  },
);

module.exports = mongoose.model('Succes', SuccesSchema);
