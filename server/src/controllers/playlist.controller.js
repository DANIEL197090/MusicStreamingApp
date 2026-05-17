// TODO: Implement playlist controllers

const { validationResult } = require("express-validator");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

/**
 * @desc    Get current user's playlists
 * @route   GET /api/playlists
 * @access  Private
 */
const getMyPlaylists = async (req, res, next) => {
  // TODO: Find playlists where user matches req.user._id
};

/**
 * @desc    Get featured/public playlists
 * @route   GET /api/playlists/featured
 * @access  Public
 */
const getFeaturedPlaylists = async (req, res, next) => {
  // TODO: Find playlists where isFeatured: true and isPublic: true
};

/**
 * @desc    Get playlist by ID
 * @route   GET /api/playlists/:id
 * @access  Public (if public) / Private (if private — owner only)
 */
const getPlaylistById = async (req, res, next) => {
  // TODO: Find playlist, check visibility rules, populate songs
};

/**
 * @desc    Create playlist
 * @route   POST /api/playlists
 * @access  Private
 */
const createPlaylist = async (req, res, next) => {
  // TODO: Validate input, create playlist with user: req.user._id
};

/**
 * @desc    Update playlist
 * @route   PUT /api/playlists/:id
 * @access  Private (owner only)
 */
const updatePlaylist = async (req, res, next) => {
  // TODO: Find playlist owned by user, update allowed fields
};

/**
 * @desc    Delete playlist
 * @route   DELETE /api/playlists/:id
 * @access  Private (owner only)
 */
const deletePlaylist = async (req, res, next) => {
  // TODO: Find and delete playlist owned by user
};

/**
 * @desc    Add song to playlist
 * @route   POST /api/playlists/:id/songs
 * @access  Private (owner only)
 */
const addSongToPlaylist = async (req, res, next) => {
  // TODO: Verify song exists, check for duplicates, push to playlist.songs
};

/**
 * @desc    Remove song from playlist
 * @route   DELETE /api/playlists/:id/songs/:songId
 * @access  Private (owner only)
 */
const removeSongFromPlaylist = async (req, res, next) => {
  // TODO: Pull songId from playlist.songs array
};

module.exports = { getMyPlaylists, getFeaturedPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist };
