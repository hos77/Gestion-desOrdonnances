const mongoose = require('mongoose');

const borderauSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  nombreOrdonnance: {
    type: String,
  },
  dateGenerationB: {
    type: Date,
  },
  montantTotal: {
    type: Number,
  },
  montantTotalRemboursable: {
    type: Number,
  },
  etat: {
    type: Boolean,
  },
  state: {
    type: String,
  },
  ordonnances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ordonnnance',
  }],
});

const Borderau = mongoose.model('Borderau', borderauSchema);

module.exports = Borderau;
