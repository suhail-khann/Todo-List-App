const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/todos', (req, res) => {
  // Temporary response until database is connected
  res.json([]);
});

app.post('/todos', (req, res) => {
  try {
    const { text, completed } = req.body;
    // Temporary response until database is connected
    res.status(201).json({
      id: Date.now().toString(),
      text,
      completed
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

app.put('/todos/:id', (req, res) => {
  // Temporary response until database is connected
  res.json(req.body);
});

app.delete('/todos/:id', (req, res) => {
  // Temporary response until database is connected
  res.json({ success: true });
});

app.post('/summarize', (req, res) => {
  // Temporary response until OpenAI and Slack are connected
  res.json({ message: 'Summary sent to Slack' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});