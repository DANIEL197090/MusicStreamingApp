// TODO: Implement song controllers
// Models needed: Song, User, ListeningHistory
// Songs are served from Cloudinary CDN — the backend is a metadata API, NOT a media proxy

const Song = require("../models/Song.model");
const User = require("../models/User");
const ListeningHistory = require("../models/ListeningHistory");

/**
 * @desc    Get all songs (paginated, filterable)
 * @route   GET /api/songs
 * @access  Public
 * @query   page, limit, genre, artist, album, sort, featured
 */
const getSongs = async (req, res, next) => {
  // TODO: Implement with pagination, filtering by genre/artist/album, sorting
  // Only return isActive: true songs
  // Populate artist and album refs
};

/**
 * @desc    Get single song by ID
 * @route   GET /api/songs/:id
 * @access  Public
 */
const getSongById = async (req, res, next) => {
  // TODO: Find song by ID, populate artist + album, return 404 if not found
};

/**
 * @desc    Get streaming URL for a song (returns Cloudinary CDN URL)
 * @route   GET /api/songs/:id/stream
 * @access  Private
 */
const getStreamUrl = async (req, res, next) => {
  // TODO: Return the song's audioUrl (Cloudinary CDN link)
  // Client plays audio directly from CDN — backend just provides the URL
};

/**
 * @desc    Like/unlike a song (toggle)
 * @route   POST /api/songs/:id/like
 * @access  Private
 */
const toggleLike = async (req, res, next) => {
  // TODO: Toggle song ID in user.likedSongs array
  // If already liked → remove (unlike), else → add (like)
};

/**
 * @desc    Record a song play (listening history + stream count)
 * @route   POST /api/songs/:id/play
 * @access  Private
 * @body    { duration } — how long user listened in seconds
 */
const recordPlay = async (req, res, next) => {
  // TODO: Create ListeningHistory entry
  // If duration >= 30 seconds, mark completedPlay: true and increment song.streamCount
};

/**
 * @desc    Get user's liked songs
 * @route   GET /api/songs/liked
 * @access  Private
 */
const getLikedSongs = async (req, res, next) => {
  // TODO: Populate user.likedSongs with song details (artist, album)
};

module.exports = { getSongs, getSongById, getStreamUrl, toggleLike, recordPlay, getLikedSongs };
