// TODO: Implement user/history controllers
// Uses MongoDB aggregation pipeline for efficient deduplication and sorting

const ListeningHistory = require("../models/ListeningHistory");

/**
 * @desc    Get recently played songs (deduplicated, most recent first)
 * @route   GET /api/history/recent
 * @access  Private
 * @query   limit (default 30)
 */
const getRecentlyPlayed = async (req, res, next) => {
  // TODO: Use aggregation pipeline:
  // 1. $match user
  // 2. $sort by playedAt desc
  // 3. $group by song to deduplicate, keep first playedAt and count
  // 4. $lookup to join with songs and artists collections

    try {
    const limit = Math.min(parseInt(req.query.limit) || 30, 100);

    const results = await ListeningHistory.aggregate([
      { $match: { user: req.user._id } },
      { $sort: { playedAt: -1 } },
      {
        $group: {
          _id: "$song",
          lastPlayedAt: { $first: "$playedAt" },
          playCount: { $sum: 1 },
          historyId: { $first: "$_id" },
        },
      },
      { $sort: { lastPlayedAt: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "_id",
          as: "song",
        },
      },
      { $unwind: "$song" },
      {
        $lookup: {
          from: "artists",
          localField: "song.artist",
          foreignField: "_id",
          as: "song.artist",
        },
      },
      { $unwind: { path: "$song.artist", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          song: {
            _id: 1,
            title: 1,
            artwork: 1,
            duration: 1,
            streamCount: 1,
            artist: { _id: 1, name: 1, avatar: 1 },
          },
          lastPlayedAt: 1,
          playCount: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: { recentlyPlayed: results },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get most played songs
 * @route   GET /api/history/most-played
 * @access  Private
 * @query   limit (default 20)
 */
const getMostPlayed = async (req, res, next) => {
  // TODO: Use aggregation pipeline:
  // 1. $match user + completedPlay: true
  // 2. $group by song, count plays
  // 3. $sort by playCount desc
  // 4. $lookup songs and artists

    try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);

    const results = await ListeningHistory.aggregate([
      { $match: { user: req.user._id, completedPlay: true } },
      {
        $group: {
          _id: "$song",
          playCount: { $sum: 1 },
          lastPlayedAt: { $max: "$playedAt" },
        },
      },
      { $sort: { playCount: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "_id",
          as: "song",
        },
      },
      { $unwind: "$song" },
      {
        $lookup: {
          from: "artists",
          localField: "song.artist",
          foreignField: "_id",
          as: "song.artist",
        },
      },
      { $unwind: { path: "$song.artist", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          song: {
            _id: 1,
            title: 1,
            artwork: 1,
            duration: 1,
            streamCount: 1,
            artist: { _id: 1, name: 1, avatar: 1 },
          },
          playCount: 1,
          lastPlayedAt: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: { mostPlayed: results },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecentlyPlayed, getMostPlayed };
