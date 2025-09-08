const express = require('express');
const Subject = require('../models/subject');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Middleware to check admin token
function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (token === "admin-token-123") {
    next();
  } else {
    res.status(403).json({ error: "Admin access required" });
  }
}

router.get('/', async (req, res) => {
  const { stream } = req.query;
  let filter = {};
  if (stream) filter.stream = stream;
  const subjects = await Subject.find(filter).populate('stream');
  res.json(subjects);
});

router.post('/', requireAdmin, async (req, res) => {
  const subject = new Subject(req.body);
  await subject.save();
  res.status(201).json(subject);
});

// Upload syllabus PDF for a subject (admin only)
router.post('/:id/syllabus', requireAdmin, upload.single('syllabus'), async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) return res.status(404).json({ error: 'Subject not found' });
  subject.syllabusFile = req.file ? req.file.filename : subject.syllabusFile;
  await subject.save();
  res.json({ message: 'Syllabus uploaded', syllabusFile: subject.syllabusFile });
});

// Upload a document for a subject (admin only)
router.post('/:id/documents', requireAdmin, upload.single('document'), async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) return res.status(404).json({ error: 'Subject not found' });
  if (req.file) {
    subject.documents = subject.documents || [];
    subject.documents.push(req.file.filename);
    await subject.save();
    res.json({ message: 'Document uploaded', documents: subject.documents });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

module.exports = router;