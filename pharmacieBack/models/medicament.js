const mongoose = require('mongoose');

const medicamentSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  remboursable: {
    type: Boolean,
    required: true,
  },
  ordonnances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ordonnnance',
  }],
});

const Medicament = mongoose.model('Medicament', medicamentSchema);

module.exports = Medicament;
