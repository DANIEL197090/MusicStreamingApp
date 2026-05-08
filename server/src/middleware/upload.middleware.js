const multer = require("multer");

// Store files in memory buffer (they'll be uploaded to Cloudinary)
const storage = multer.memoryStorage();

// File filter for audio files
const audioFilter = (req, file, cb) => {
  const allowedMimes = [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "audio/aac",
    "audio/flac",
    "audio/x-m4a",
    "audio/mp4",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid audio format: ${file.mimetype}. Allowed: mp3, wav, ogg, aac, flac, m4a`), false);
  }
};

// File filter for image files
const imageFilter = (req, file, cb) => {
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid image format: ${file.mimetype}. Allowed: jpeg, png, webp, gif`), false);
  }
};

// Upload middleware for songs (audio + artwork)
const uploadSong = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "audio") {
      audioFilter(req, file, cb);
    } else if (file.fieldname === "artwork") {
      imageFilter(req, file, cb);
    } else {
      cb(new Error(`Unexpected field: ${file.fieldname}`), false);
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },
}).fields([
  { name: "audio", maxCount: 1 },
  { name: "artwork", maxCount: 1 },
]);

// Upload middleware for single image
const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
}).single("image");

// Upload middleware for cover image
const uploadCover = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
}).single("coverImage");

module.exports = { uploadSong, uploadImage, uploadCover };
