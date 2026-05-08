// TODO: Implement admin controllers
// Admin routes handle CRUD for songs, artists, albums + user management + analytics
// Use Cloudinary utils for file uploads: uploadAudio, uploadImage, deleteFromCloudinary

const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const ListeningHistory = require("../models/ListeningHistory");
const { uploadAudio, uploadImage, deleteFromCloudinary } = require("../utils/cloudinary.utils");

// ==================== SONG MANAGEMENT ====================

/**
 * @desc    Upload/create a song (with audio file + optional artwork)
 * @route   POST /api/admin/songs
 * @access  Admin
 * @files   audio (required), artwork (optional) — via uploadSong middleware
 * @body    { title, artist (ObjectId), album?, genre (JSON string or array), duration?, releaseDate? }
 */
const createSong = async (req, res, next) => {
  // TODO: Upload audio to Cloudinary via uploadAudio(), optionally upload artwork
  // Create Song document with returned URLs and public IDs
};

/** @route PUT /api/admin/songs/:id */
const updateSong = async (req, res, next) => { /* TODO */ };

/** @route DELETE /api/admin/songs/:id — soft delete (set isActive: false) */
const deleteSong = async (req, res, next) => { /* TODO */ };

/** @route PUT /api/admin/songs/:id/feature — toggle isFeatured */
const featureSong = async (req, res, next) => { /* TODO */ };

// ==================== ARTIST MANAGEMENT ====================

/**
 * @desc    Create artist (with optional image)
 * @route   POST /api/admin/artists
 * @files   image (optional) — via uploadImage middleware
 * @body    { name, bio?, genres (JSON string or array), socialLinks? }
 */
const createArtist = async (req, res, next) => { /* TODO */ };

/** @route PUT /api/admin/artists/:id */
const updateArtist = async (req, res, next) => { /* TODO */ };

/** @route DELETE /api/admin/artists/:id */
const deleteArtist = async (req, res, next) => { /* TODO */ };

// ==================== ALBUM MANAGEMENT ====================

/**
 * @desc    Create album (with optional cover image)
 * @route   POST /api/admin/albums
 * @files   coverImage (optional)
 * @body    { title, artist (ObjectId), genre?, releaseDate?, description? }
 */
const createAlbum = async (req, res, next) => { /* TODO */ };

/** @route PUT /api/admin/albums/:id */
const updateAlbum = async (req, res, next) => { /* TODO */ };

/** @route DELETE /api/admin/albums/:id */
const deleteAlbum = async (req, res, next) => { /* TODO */ };

// ==================== USER MANAGEMENT ====================

/** @route GET /api/admin/users — paginated, searchable by name/email */
const getUsers = async (req, res, next) => { /* TODO */ };

/** @route PUT /api/admin/users/:id/suspend — toggle isActive */
const suspendUser = async (req, res, next) => { /* TODO */ };

/** @route DELETE /api/admin/users/:id — cannot delete admin users */
const deleteUser = async (req, res, next) => { /* TODO */ };

// ==================== ANALYTICS ====================

/** @route GET /api/admin/analytics/overview — dashboard stats (totals + top content) */
const getAnalyticsOverview = async (req, res, next) => { /* TODO */ };

/** @route GET /api/admin/analytics/streams?days=30 — daily stream counts */
const getStreamAnalytics = async (req, res, next) => { /* TODO */ };

// ==================== PLAYLIST MANAGEMENT ====================

/** @route POST /api/admin/playlists — create admin-featured playlist */
const createFeaturedPlaylist = async (req, res, next) => { /* TODO */ };

module.exports = {
  createSong, updateSong, deleteSong, featureSong,
  createArtist, updateArtist, deleteArtist,
  createAlbum, updateAlbum, deleteAlbum,
  getUsers, suspendUser, deleteUser,
  getAnalyticsOverview, getStreamAnalytics,
  createFeaturedPlaylist,
};
