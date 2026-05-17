const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    image: {
      type: String,
      default: null,
    },
    imagePublicId: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: [2000, "Bio cannot exceed 2000 characters"],
      default: "",
    },
    genres: [
      {
        type: String,
        trim: true,
      },
    ],
    followerCount: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    socialLinks: {
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
artistSchema.index({ name: "text" });
artistSchema.index({ isFeatured: 1 });
artistSchema.index({ followerCount: -1 });

module.exports = mongoose.models.Artist || mongoose.model('Artist', artistSchema);
