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

const updateSong = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ success: false, message: "Song not found" });
    const { title, artist, album, genre, duration, releaseDate, isFeatured } = req.body;
    if (title) song.title = title;
    if (artist) song.artist = artist;
    if (album !== undefined) song.album = album || null;
    if (genre) song.genre = typeof genre === "string" ? JSON.parse(genre) : genre;
    if (duration) song.duration = duration;
    if (releaseDate) song.releaseDate = releaseDate;
    if (isFeatured !== undefined) song.isFeatured = isFeatured === "true" || isFeatured === true;
    if (req.files && req.files.audio && req.files.audio[0]) {
      if (song.cloudinaryPublicId) await deleteFromCloudinary(song.cloudinaryPublicId, "video");
      const audioResult = await uploadAudio(req.files.audio[0].buffer, req.files.audio[0].originalname);
      song.audioUrl = audioResult.url;
      song.cloudinaryPublicId = audioResult.publicId;
      if (!duration) song.duration = audioResult.duration;
    }
    if (req.files && req.files.artwork && req.files.artwork[0]) {
      if (song.artworkPublicId) await deleteFromCloudinary(song.artworkPublicId);
      const artworkResult = await uploadImage(req.files.artwork[0].buffer, "artwork");
      song.artwork = artworkResult.url;
      song.artworkPublicId = artworkResult.publicId;
    }
    await song.save();
    const populated = await Song.findById(song._id).populate("artist", "name image").populate("album", "title");
    res.json({ success: true, message: "Song updated", data: { song: populated } });
  } catch (error) { next(error); }
};

const deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ success: false, message: "Song not found" });
    if (song.cloudinaryPublicId) await deleteFromCloudinary(song.cloudinaryPublicId, "video");
    if (song.artworkPublicId) await deleteFromCloudinary(song.artworkPublicId);
    song.isActive = false;
    await song.save();
    res.json({ success: true, message: "Song deleted" });
  } catch (error) { next(error); }
};

const featureSong = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ success: false, message: "Song not found" });
    song.isFeatured = !song.isFeatured;
    await song.save();
    res.json({ success: true, message: `Song ${song.isFeatured ? "featured" : "unfeatured"}`, data: { isFeatured: song.isFeatured } });
  } catch (error) { next(error); }
};

// ==================== ARTIST MANAGEMENT ====================

const createArtist = async (req, res, next) => {
  try {
    const { name, bio, genres, socialLinks } = req.body;
    const genresArray = genres ? (typeof genres === "string" ? JSON.parse(genres) : genres) : [];
    const parsedSocial = socialLinks ? (typeof socialLinks === "string" ? JSON.parse(socialLinks) : socialLinks) : {};
    let imageResult = null;
    if (req.file) imageResult = await uploadImage(req.file.buffer, "artists");
    const artist = await Artist.create({
      name, bio: bio || "", genres: genresArray,
      image: imageResult ? imageResult.url : null,
      imagePublicId: imageResult ? imageResult.publicId : null,
      socialLinks: parsedSocial,
    });
    res.status(201).json({ success: true, message: "Artist created", data: { artist } });
  } catch (error) { next(error); }
};

const updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ success: false, message: "Artist not found" });
    const { name, bio, genres, socialLinks, isFeatured } = req.body;
    if (name) artist.name = name;
    if (bio !== undefined) artist.bio = bio;
    if (genres) artist.genres = typeof genres === "string" ? JSON.parse(genres) : genres;
    if (socialLinks) artist.socialLinks = typeof socialLinks === "string" ? JSON.parse(socialLinks) : socialLinks;
    if (isFeatured !== undefined) artist.isFeatured = isFeatured === "true" || isFeatured === true;
    if (req.file) {
      if (artist.imagePublicId) await deleteFromCloudinary(artist.imagePublicId);
      const imageResult = await uploadImage(req.file.buffer, "artists");
      artist.image = imageResult.url;
      artist.imagePublicId = imageResult.publicId;
    }
    await artist.save();
    res.json({ success: true, message: "Artist updated", data: { artist } });
  } catch (error) { next(error); }
};
