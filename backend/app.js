const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const streamsRoute = require('./routes/streams');
const subjectsRoute = require('./routes/subjects');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

mongoose.connect('mongodb://localhost:27017/wbchse', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/streams', streamsRoute);
app.use('/api/subjects', subjectsRoute);
app.use('/uploads', express.static(uploadDir)); // serve uploaded files

// Simple admin login endpoint (replace the password below!)
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASS || password === "change_this_password") {
    // You could use JWT for real apps, but we'll use a session cookie for this demo
    res.json({ token: "admin-token-123" });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));