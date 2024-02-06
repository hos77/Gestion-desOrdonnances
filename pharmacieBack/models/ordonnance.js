// ordonnnance.model.js
const mongoose = require('mongoose');

const ordonnnanceSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  datePrescription: {
    type: Date,
  },
  nombreMedTotale: {
    type: Number,
  },
  nombreMedRemboursable: {
    type: Number,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  adherent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Adherant',
  },
  medicaments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicament',
  }],
  bordereau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Borderau',
  },
});

const Ordonnnance = mongoose.model('Ordonnnance', ordonnnanceSchema);

module.exports = Ordonnnance;
