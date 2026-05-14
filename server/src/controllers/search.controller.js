// TODO: Implement search controller

const Song = require("../models/Song");
const Artist = require('../modules/artists/artist.model');
const Album = require("../models/Album");
const Playlist = require("../models/Playlist");

/**
 * @desc    Search songs, artists, albums, playlists
 * @route   GET /api/search?q=<query>&type=<all|songs|artists|albums|playlists>
 * @access  Public
 * @query   q (search term), type (filter), page, limit
 */
const search = async (req, res, next) => {
  // TODO: Implement multi-type search
  // 1. Build a case-insensitive regex from query param "q"
  // 2. Based on "type" param, search across one or all collections
  // 3. Songs: search by title, Artists: by name, Albums: by title, Playlists: by title (public only)
  // 4. Return paginated results
};

module.exports = { search };
