const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', TaskSchema);
