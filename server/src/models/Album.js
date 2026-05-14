const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Album title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: [true, "Artist is required"],
    },
    coverImage: {
      type: String,
      default: null,
    },
    coverImagePublicId: {
      type: String,
      default: null,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    genre: [
      {
        type: String,
        trim: true,
      },
    ],
    releaseDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
albumSchema.index({ title: "text" });
albumSchema.index({ artist: 1 });
albumSchema.index({ releaseDate: -1 });

module.exports = mongoose.model("Album", albumSchema);
