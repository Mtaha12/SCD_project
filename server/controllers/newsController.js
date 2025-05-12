const News = require('../models/News');

// Controller to fetch all news articles
const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }); // Sort newest first
    res.status(200).json(news);
  } catch (err) {
    console.error('Error fetching news:', err.message);
    res.status(500).json({ error: 'Failed to fetch news from database' });
  }
};

module.exports = { getAllNews };
