// Feed recommendation modules
const Song = require("../models/Song");
const ListeningHistory = require("../models/ListeningHistory");
const Artist = require("../modules/artists/artist.model");
const Playlist = require("../models/Playlist");

/**
 * @desc    Get trending songs (most streamed)
 * @route   GET /api/feed/trending
 * @access  Public
 */
const getTrending = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const songs = await Song.find({ isActive: true })
      .sort({ streamCount: -1, createdAt: -1 })
      .limit(limit)
      .populate("artist", "name image bio")
      .populate("album", "title coverImage coverImagePublicId releaseDate");

    return res.status(200).json({
      success: true,
      data: { songs },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get new releases (last 14 days)
 * @route   GET /api/feed/new-releases
 * @access  Public
 */
const getNewReleases = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    
    // Check release threshold date
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    let songs = await Song.find({
      isActive: true,
      releaseDate: { $gte: fourteenDaysAgo }
    })
      .sort({ releaseDate: -1 })
      .limit(limit)
      .populate("artist", "name image bio")
      .populate("album", "title coverImage coverImagePublicId releaseDate");

    // Fallback: If no songs in the last 14 days, get the latest songs.
    if (songs.length === 0) {
      songs = await Song.find({ isActive: true })
        .sort({ releaseDate: -1 })
        .limit(limit)
        .populate("artist", "name image bio")
        .populate("album", "title coverImage coverImagePublicId releaseDate");
    }

    return res.status(200).json({
      success: true,
      data: { songs },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get personalized recommendations based on listening history
 * @route   GET /api/feed/recommended
 * @access  Private
 */
const getRecommended = async (req, res, next) => {
  // TODO: Implement getRecommended
};

/**
 * @desc    Get featured content (admin-promoted)
 * @route   GET /api/feed/featured
 * @access  Public
 */
const getFeatured = async (req, res, next) => {
  // TODO: Implement getFeatured
};

module.exports = { getTrending, getNewReleases, getRecommended, getFeatured };
