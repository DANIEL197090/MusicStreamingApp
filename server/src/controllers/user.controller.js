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
};

module.exports = { getRecentlyPlayed, getMostPlayed };
