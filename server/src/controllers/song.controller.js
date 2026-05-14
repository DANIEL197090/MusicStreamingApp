

const Song = require("../models/Song");
const User = require("../models/User");
const ListeningHistory = require("../models/ListeningHistory");
const { paginate } = require("../utils/pagination");

/**
 * @desc    Get all songs (paginated, filterable)
 * @route   GET /api/songs
 * @access  Public
 * @query   page, limit, genre, artist, album, sort, featured
 */
const getSongs = async (req, res, next) => {


  try {
    const { genre, artist, album, sort, featured, page = 1, limit = 20 } = req.query;

    const filter = { isActive: true };
    if (genre) filter.genre = { $in: [genre] };
    if (artist) filter.artist = artist;
    if (album) filter.album = album;
    if (featured === "true") filter.isFeatured = true;

    let sortOption = { createdAt: -1 };
    if (sort === "popular") sortOption = { streamCount: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "title") sortOption = { title: 1 };

    const query = Song.find(filter)
      .populate("artist", "name avatar genre")
      .populate("album", "title artwork")
      .sort(sortOption);

    const result = await paginate(query, page, limit);

    return res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single song by ID
 * @route   GET /api/songs/:id
 * @access  Public
 */
const getSongById = async (req, res, next) => {
  
  try {
    const song = await Song.findById(req.params.id)
      .populate("artist", "name avatar genre bio")
      .populate("album", "title artwork releaseDate");

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: { song },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get streaming URL for a song (returns Cloudinary CDN URL)
 * @route   GET /api/songs/:id/stream
 * @access  Private
 */
const getStreamUrl = async (req, res, next) => {

  try {
    const song = await Song.findById(req.params.id).select("audioUrl title isActive");

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    if (!song.isActive) {
      return res.status(403).json({
        success: false,
        message: "This song is not available",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        streamUrl: song.audioUrl,
        title: song.title,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Like/unlike a song (toggle)
 * @route   POST /api/songs/:id/like
 * @access  Private
 */
const toggleLike = async (req, res, next) => {


  try {
    const songId = req.params.id;

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    const user = await User.findById(req.user._id);
    const isLiked = user.likedSongs.includes(songId);

    if (isLiked) {
      user.likedSongs = user.likedSongs.filter(
        (id) => id.toString() !== songId
      );
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Song unliked",
        data: { liked: false },
      });
    } else {
      user.likedSongs.push(songId);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Song liked",
        data: { liked: true },
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Record a song play (listening history + stream count)
 * @route   POST /api/songs/:id/play
 * @access  Private
 * @body    { duration } — how long user listened in seconds
 */
const recordPlay = async (req, res, next) => {


  try {
    const { duration } = req.body;
    const songId = req.params.id;

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    const completedPlay = duration >= 30;

    await ListeningHistory.create({
      user: req.user._id,
      song: songId,
      duration,
      completedPlay,
      playedAt: new Date(),
    });

    if (completedPlay) {
      await Song.findByIdAndUpdate(songId, { $inc: { streamCount: 1 } });
    }

    return res.status(201).json({
      success: true,
      message: "Play recorded",
      data: { completedPlay },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's liked songs
 * @route   GET /api/songs/liked
 * @access  Private
 */
const getLikedSongs = async (req, res, next) => {
  

  try {
    const user = await User.findById(req.user._id).populate({
      path: "likedSongs",
      match: { isActive: true },
      populate: [
        { path: "artist", select: "name avatar" },
        { path: "album", select: "title artwork" },
      ],
    });

    return res.status(200).json({
      success: true,
      data: {
        likedSongs: user.likedSongs,
        count: user.likedSongs.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSongs, getSongById, getStreamUrl, toggleLike, recordPlay, getLikedSongs };
