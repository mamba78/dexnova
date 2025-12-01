const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// Get all data
app.get('/data', (req, res) => {
  const users = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'users.json'), 'utf8') || '[]');
  const links = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'links.json'), 'utf8') || '[]');
  const chains = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'chains.json'), 'utf8') || '{}');
  res.json({ users, links, chains });
});

// Update users
app.post('/users', (req, res) => {
  fs.writeFileSync(path.join(DATA_DIR, 'users.json'), JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// Update footer links
app.post('/links', (req, res) => {
  fs.writeFileSync(path.join(DATA_DIR, 'links.json'), JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// Update chain visibility
app.post('/chains', (req, res) => {
  fs.writeFileSync(path.join(DATA_DIR, 'chains.json'), JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.listen(3001, () => console.log('Admin API running on port 3001'));
