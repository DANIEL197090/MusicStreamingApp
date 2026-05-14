// TODO: Implement search controller

const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Playlist = require("../models/Playlist");

const search = async (req, res, next) => {
  try {
    const { q, type} = req.query;

    if (!q) {
      return res.status(400).json({ success: false, message: "Query parameter 'q' is required" });
    }

    let results = {};

    // Search songs
    if (!type || type === "song") {
      results.songs = await Song.find({ title: { $regex: q, $options: "i" } }).populate("artist", "name avatar");
    }

    // Search artists
    if (!type || type === "artist") {
      results.artists = await Artist.find({ name: { $regex: q, $options: "i" } }).select("-password");
    }

    // Search albums
    if (!type || type === "album") {
      results.albums = await Album.find({ title: { $regex: q, $options: "i" } }).populate("artist", "name avatar");
    }

    // Search playlists
    if (!type || type === "playlist") {
      results.playlists = await Playlist.find({ title: { $regex: q, $options: "i" } }).populate("user", "username avatar");
    }

    res.status(200).json({
      success: true,
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { search };