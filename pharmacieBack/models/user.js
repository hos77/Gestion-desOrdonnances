// user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  username: {
    type: String,
    unique:true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
  },
  matriculeC: {
    type: String,
  },
  cin: {
    type: String,
  },
  adresse: {
    type: String,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  ordonnances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ordonnnance',
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
