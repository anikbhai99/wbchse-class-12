const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: String,
  stream: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream' },
  syllabusFile: String, // path to uploaded syllabus PDF
  documents: [String]   // array of paths to uploaded docs
});

module.exports = mongoose.model('Subject', SubjectSchema);