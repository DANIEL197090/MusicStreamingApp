const { validationResult } = require("express-validator");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

/**
 * @desc    Get current user's playlists
 * @route   GET /api/playlists
 * @access  Private
 */
const getMyPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("songs", "title artist duration coverImage");

    res.status(200).json({
      success: true,
      count: playlists.length,
      data: playlists,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get featured/public playlists
 * @route   GET /api/playlists/featured
 * @access  Public
 */
const getFeaturedPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ isFeatured: true, isPublic: true })
      .sort({ createdAt: -1 })
      .populate("user", "username profileImage")
      .populate("songs", "title artist duration coverImage");

    res.status(200).json({
      success: true,
      count: playlists.length,
      data: playlists,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get playlist by ID
 * @route   GET /api/playlists/:id
 * @access  Public (if public) / Private (if private — owner only)
 */
const getPlaylistById = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate("user", "username profileImage")
      .populate({
        path: "songs",
        select: "title artist album duration coverImage audioUrl streamCount",
        populate: [
          { path: "artist", select: "name" },
          { path: "album", select: "title coverImage" },
        ],
      });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // If playlist is private, only the owner can view it
    if (!playlist.isPublic) {
      if (!req.user || playlist.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "This playlist is private",
        });
      }
    }

    res.status(200).json({
      success: true,
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create playlist
 * @route   POST /api/playlists
 * @access  Private
 * @body    { title, description?, isPublic? }
 */
const createPlaylist = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { title, description, isPublic } = req.body;

    const playlist = await Playlist.create({
      title,
      description: description || "",
      isPublic: isPublic !== undefined ? isPublic : true,
      user: req.user._id,
      songs: [],
    });

    res.status(201).json({
      success: true,
      message: "Playlist created successfully",
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update playlist
 * @route   PUT /api/playlists/:id
 * @access  Private (owner only)
 */
const updatePlaylist = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // Only the owner can update the playlist
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this playlist",
      });
    }

    // Update only allowed fields
    const allowedFields = ["title", "description", "isPublic", "coverImage"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        playlist[field] = req.body[field];
      }
    });

    await playlist.save();

    res.status(200).json({
      success: true,
      message: "Playlist updated successfully",
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete playlist
 * @route   DELETE /api/playlists/:id
 * @access  Private (owner only)
 */
const deletePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // Only the owner can delete the playlist
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this playlist",
      });
    }

    await playlist.deleteOne();

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add song to playlist
 * @route   POST /api/playlists/:id/songs
 * @access  Private (owner only)
 * @body    { songId }
 */
const addSongToPlaylist = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { songId } = req.body;

    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // Only the owner can add songs
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to modify this playlist",
      });
    }

    // Verify the song exists
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // Check for duplicates
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song is already in this playlist",
      });
    }

    playlist.songs.push(songId);
    await playlist.save();

    // Re-populate songs for the response
    await playlist.populate("songs", "title artist duration coverImage");

    res.status(200).json({
      success: true,
      message: "Song added to playlist",
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove song from playlist
 * @route   DELETE /api/playlists/:id/songs/:songId
 * @access  Private (owner only)
 */
const removeSongFromPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // Only the owner can remove songs
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to modify this playlist",
      });
    }

    // Check if song is in the playlist
    const songIndex = playlist.songs.indexOf(req.params.songId);
    if (songIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Song not found in this playlist",
      });
    }

    playlist.songs.pull(req.params.songId);
    await playlist.save();

    // Re-populate songs for the response
    await playlist.populate("songs", "title artist duration coverImage");

    res.status(200).json({
      success: true,
      message: "Song removed from playlist",
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyPlaylists, getFeaturedPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist };
