const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  image: { type: String }, // URL to the image
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  follower_count: { type: Number, default: 0 },
  is_featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);