const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String
});

module.exports = mongoose.model('Stream', StreamSchema);