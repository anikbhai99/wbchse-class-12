const express = require('express');
const Stream = require('../models/stream');
const router = express.Router();

router.get('/', async (req, res) => {
  const streams = await Stream.find();
  res.json(streams);
});

router.post('/', async (req, res) => {
  const stream = new Stream(req.body);
  await stream.save();
  res.status(201).json(stream);
});

module.exports = router;