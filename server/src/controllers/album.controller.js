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

    // Stage 2: Fetch data and count in parallel
    const [albums, total] = await Promise.all([
      Album.find(filter)
        .populate("artist", "name image")
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Album.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        albums,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
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
  try {
    // Stage 1: Fetch album details by ID
    const album = await Album.findById(req.params.id)
      .populate("artist", "name image")
      .lean();

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }
    
    // songs fetch to be committed in Commit 6
  } catch (error) {
    next(error);
  }
};

module.exports = { getAlbums, getAlbumById };
