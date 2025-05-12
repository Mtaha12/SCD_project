const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS setup
app.use(cors({
  origin: ['http://localhost:3000', 'https://geo-news-client-dxl5.vercel.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Routes
const newsRoutes = require('./routes/newsRoutes');
app.use('/api/articles', newsRoutes);

// Root route for checking server status
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!', status: 'OK' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(" MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
