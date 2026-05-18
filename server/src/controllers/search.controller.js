// Core search modules
const Song = require("../models/Song");
const Artist = require("../modules/artists/artist.model");
const Album = require("../models/Album");
const Playlist = require("../models/Playlist");

/**
 * @desc    Search songs, artists, albums, playlists
 * @route   GET /api/search?q=<query>&type=<all|songs|artists|albums|playlists>
 * @access  Public
 */
const search = async (req, res, next) => {
  try {
    const { q, type = "all", page = 1, limit = 20 } = req.query;
    
    // Handle empty queries gracefully
    if (!q || q.trim() === "") {
      return res.status(200).json({
        success: true,
        data: type === "all" 
          ? { songs: [], artists: [], albums: [], playlists: [] } 
          : { results: [], pagination: { page: Number(page), limit: Number(limit), total: 0, totalPages: 0 } }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { search };
