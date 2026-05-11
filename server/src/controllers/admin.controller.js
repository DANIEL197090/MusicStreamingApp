const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const ListeningHistory = require("../models/ListeningHistory");
const { uploadAudio, uploadImage, deleteFromCloudinary } = require("../utils/cloudinary.utils");

// ==================== SONG MANAGEMENT ====================

const createSong = async (req, res, next) => {
  try {
    const { title, artist, album, genre, duration, releaseDate } = req.body;
    const genreArray = genre ? (typeof genre === "string" ? JSON.parse(genre) : genre) : [];
    const artistDoc = await Artist.findById(artist);
    if (!artistDoc) return res.status(404).json({ success: false, message: "Artist not found" });
    if (!req.files || !req.files.audio || !req.files.audio[0]) {
      return res.status(400).json({ success: false, message: "Audio file is required" });
    }
    const audioResult = await uploadAudio(req.files.audio[0].buffer, req.files.audio[0].originalname);
    let artworkResult = null;
    if (req.files.artwork && req.files.artwork[0]) {
      artworkResult = await uploadImage(req.files.artwork[0].buffer, "artwork");
    }
    const song = await Song.create({
      title, artist, album: album || null, genre: genreArray,
      duration: duration || audioResult.duration,
      audioUrl: audioResult.url, cloudinaryPublicId: audioResult.publicId,
      artwork: artworkResult ? artworkResult.url : null,
      artworkPublicId: artworkResult ? artworkResult.publicId : null,
      releaseDate: releaseDate || new Date(),
    });
    const populated = await Song.findById(song._id).populate("artist", "name image").populate("album", "title");
    res.status(201).json({ success: true, message: "Song uploaded successfully", data: { song: populated } });
  } catch (error) { next(error); }
};
