// Core search modules
const Song = require("../models/Song");
const Artist = require("../modules/artists/artist.model");
const Album = require("../models/Album");
const Playlist = require("../models/Playlist");

/**
 * @desc    Search songs, artists, albums, playlists
 * @route   GET /api/search?q=<query>&type=<all|songs|artists|albums|playlists>
 * @access  Public
 */
const search = async (req, res, next) => {
  try {
    const { q, type = "all", page = 1, limit = 20 } = req.query;
    
    // Handle empty queries gracefully
    if (!q || q.trim() === "") {
      return res.status(200).json({
        success: true,
        data: type === "all" 
          ? { songs: [], artists: [], albums: [], playlists: [] } 
          : { results: [], pagination: { page: Number(page), limit: Number(limit), total: 0, totalPages: 0 } }
      });
    }

    const regex = new RegExp(q.trim(), "i");
    const parsedPage = Math.max(Number(page) || 1, 1);
    const parsedLimit = Math.max(Number(limit) || 20, 1);
    const skip = (parsedPage - 1) * parsedLimit;

    // Stage 1: Search across all categories
    if (type === "all") {
      const [songs, artists, albums, playlists] = await Promise.all([
        Song.find({ title: regex, isActive: true })
          .limit(10)
          .populate("artist", "name image bio")
          .populate("album", "title coverImage coverImagePublicId releaseDate"),
        Artist.find({ name: regex })
          .limit(10),
        Album.find({ title: regex })
          .limit(10)
          .populate("artist", "name image bio"),
        Playlist.find({ title: regex, isPublic: true })
          .limit(10)
          .populate("user", "username")
      ]);

      return res.status(200).json({
        success: true,
        data: { songs, artists, albums, playlists }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { search };
