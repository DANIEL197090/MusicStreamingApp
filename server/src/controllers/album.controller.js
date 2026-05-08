// TODO: Implement album controllers

const Album = require("../models/Album");
const Song = require("../models/Song");

/**
 * @desc    Get all albums (paginated)
 * @route   GET /api/albums
 * @access  Public
 * @query   page, limit, artist, sort
 */
const getAlbums = async (req, res, next) => {
  // TODO: Paginated list, filter by artist, populate artist ref
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
