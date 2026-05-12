// TODO: Implement artist controllers

const Artist = require("../models/Artist.js.old");
const Song = require("../models/Song");
const Album = require("../models/Album");
const User = require("../models/User");

/**
 * @desc    Get all artists (paginated)
 * @route   GET /api/artists
 * @access  Public
 * @query   page, limit, featured, sort
 */
const getArtists = async (req, res, next) => {
  // TODO: Paginated list, filter by featured, default sort by followerCount
};

/**
 * @desc    Get artist by ID with their songs and albums
 * @route   GET /api/artists/:id
 * @access  Public
 */
const getArtistById = async (req, res, next) => {
  // TODO: Find artist, then fetch their songs + albums in parallel
};

/**
 * @desc    Follow/unfollow artist (toggle)
 * @route   POST /api/artists/:id/follow
 * @access  Private
 */
const toggleFollow = async (req, res, next) => {
  // TODO: Toggle artist ID in user.following array
  // Update artist.followerCount accordingly (+1 or -1)
};

module.exports = { getArtists, getArtistById, toggleFollow };
