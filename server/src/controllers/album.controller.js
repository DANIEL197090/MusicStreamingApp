// Album feature imports
const Album = require("../models/Album");
const Song = require("../models/Song");

/**
 * @desc    Get all albums (paginated)
 * @route   GET /api/albums
 * @access  Public
 */
const getAlbums = async (req, res, next) => {
  try {
    // Stage 1: Parse and validate query parameters
    const { page = 1, limit = 20, artist, sort = "-releaseDate" } = req.query;

    const filter = {};
    if (artist) filter.artist = artist;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;
    
    // Paging results logic to be committed next
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get album by ID with songs
 * @route   GET /api/albums/:id
 * @access  Public
 */
const getAlbumById = async (req, res, next) => {
  // TODO: Find album, populate artist, fetch album's songs
};

module.exports = { getAlbums, getAlbumById };
