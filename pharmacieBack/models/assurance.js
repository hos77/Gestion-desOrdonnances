const mongoose = require('mongoose');

const assuranceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  adherents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Adherant',
  }],
});

const Assurance = mongoose.model('Assurance', assuranceSchema);

module.exports = Assurance;
