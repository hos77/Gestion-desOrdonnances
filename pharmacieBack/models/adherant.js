const mongoose = require('mongoose');

const adherantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
  },
  matricule: {
    type: String,
  },
  telephone: {
    type: Number,
  },
  dateNaissance: {
    type: Date,
  },
  paysNaissance: {
    type: String,
  },
  ordonnances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ordonnnance',
  }],
  assurance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assurance',
    required: true,
  },
});

const Adherant = mongoose.model('Adherant', adherantSchema);

module.exports = Adherant;
