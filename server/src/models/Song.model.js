const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Song title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: [true, "Artist is required"],
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },
    genre: [
      {
        type: String,
        trim: true,
      },
    ],
    duration: {
      type: Number, // in seconds
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 second"],
    },
    audioUrl: {
      type: String,
      required: [true, "Audio URL is required"],
    },
    cloudinaryPublicId: {
      type: String,
      default: null,
    },
    artwork: {
      type: String,
      default: null,
    },
    artworkPublicId: {
      type: String,
      default: null,
    },
    streamCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    releaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
songSchema.index({ title: "text" });
// Index for trending queries
songSchema.index({ streamCount: -1, createdAt: -1 });
// Index for filtering
songSchema.index({ artist: 1, album: 1 });
songSchema.index({ genre: 1 });
songSchema.index({ isFeatured: 1, isActive: 1 });

module.exports = mongoose.models.Song || mongoose.model('Song', songSchema);