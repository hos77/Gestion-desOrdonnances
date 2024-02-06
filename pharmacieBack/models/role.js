const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;

