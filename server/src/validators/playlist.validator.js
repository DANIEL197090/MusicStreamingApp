const { body } = require("express-validator");

const createPlaylistValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Playlist title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("isPublic")
    .optional()
    .isBoolean()
    .withMessage("isPublic must be a boolean"),
];

const updatePlaylistValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];

const addSongValidator = [
  body("songId")
    .notEmpty()
    .withMessage("Song ID is required")
    .isMongoId()
    .withMessage("Invalid song ID"),
];

module.exports = {
  createPlaylistValidator,
  updatePlaylistValidator,
  addSongValidator,
};
