const Song = require('../models/song.model');


const trendingSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ playCount: -1 }).limit(20).populate("artist", "name avatar");
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const newReleases = async (req, res) => {
  try {
    const songs = await Song.find().sort({ releaseDate: -1 }).limit(20).populate("artist", "name avatar");
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const featuredcontent = async (req, res) => {
  try {
    const songs = await Song.find({ isFeatured: true }).populate("artist", "name avatar");
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getRecommendations = async (req, res) => {
  try {
    // Example logic: fetch 10 random songs
    const songs = await Song.find().limit(10);
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  trendingSongs,
  newReleases,
  featuredcontent,
  getRecommendations
};