// Feed recommendation modules
const mongoose = require("mongoose");
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
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const userId = req.user._id;

    // 1. Get user's listening history
    const history = await ListeningHistory.find({ user: userId })
      .limit(100)
      .populate("song");

    const playedSongIds = history
      .map(h => h.song?._id)
      .filter(id => id && mongoose.Types.ObjectId.isValid(id.toString()));

    // 2. Identify top genres and artists from history
    const genresCount = {};
    const artistsCount = {};

    history.forEach(h => {
      if (h.song) {
        if (h.song.genre && Array.isArray(h.song.genre)) {
          h.song.genre.forEach(g => {
            genresCount[g] = (genresCount[g] || 0) + 1;
          });
        }
        if (h.song.artist && mongoose.Types.ObjectId.isValid(h.song.artist.toString())) {
          const artistStr = h.song.artist.toString();
          artistsCount[artistStr] = (artistsCount[artistStr] || 0) + 1;
        }
      }
    });

    const topGenres = Object.keys(genresCount).sort((a, b) => genresCount[b] - genresCount[a]).slice(0, 3);
    const topArtists = Object.keys(artistsCount)
      .filter(id => mongoose.Types.ObjectId.isValid(id))
      .sort((a, b) => artistsCount[b] - artistsCount[a])
      .slice(0, 3);

    let recommendedSongs = [];

    // 3. Build recommendation query
    if (topGenres.length > 0 || topArtists.length > 0) {
      const matchCriteria = {
        isActive: true,
        _id: { $nin: playedSongIds }
      };

      const orCriteria = [];
      if (topGenres.length > 0) {
        orCriteria.push({ genre: { $in: topGenres } });
      }
      if (topArtists.length > 0) {
        orCriteria.push({ artist: { $in: topArtists } });
      }

      if (orCriteria.length > 0) {
        matchCriteria.$or = orCriteria;
      }

      recommendedSongs = await Song.find(matchCriteria)
        .sort({ streamCount: -1, createdAt: -1 })
        .limit(limit)
        .populate("artist", "name image bio")
        .populate("album", "title coverImage coverImagePublicId releaseDate");
    }

    // 4. Fallback if not enough recommendations (or no history)
    if (recommendedSongs.length < limit) {
      const needed = limit - recommendedSongs.length;
      const excludeIds = [...playedSongIds, ...recommendedSongs.map(s => s._id)]
        .filter(id => id && mongoose.Types.ObjectId.isValid(id.toString()));
      
      const fallbackSongs = await Song.find({
        isActive: true,
        _id: { $nin: excludeIds }
      })
        .sort({ streamCount: -1, createdAt: -1 })
        .limit(needed)
        .populate("artist", "name image bio")
        .populate("album", "title coverImage coverImagePublicId releaseDate");

      recommendedSongs = [...recommendedSongs, ...fallbackSongs];
    }

    return res.status(200).json({
      success: true,
      data: { songs: recommendedSongs },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get featured content (admin-promoted)
 * @route   GET /api/feed/featured
 * @access  Public
 */
const getFeatured = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);

    const [songs, artists, playlists] = await Promise.all([
      // Featured songs
      Song.find({ isFeatured: true, isActive: true })
        .limit(limit)
        .populate("artist", "name image bio")
        .populate("album", "title coverImage coverImagePublicId releaseDate"),
      // Featured artists
      Artist.find({ $or: [{ is_featured: true }, { isFeatured: true }] })
        .limit(limit),
      // Featured playlists (public only)
      Playlist.find({ isFeatured: true, isPublic: true })
        .limit(limit)
        .populate("user", "username")
    ]);

    return res.status(200).json({
      success: true,
      data: {
        songs,
        artists,
        playlists
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTrending, getNewReleases, getRecommended, getFeatured };
