const { body } = require("express-validator");

const createSongValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Song title is required")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),
  body("artist")
    .notEmpty()
    .withMessage("Artist ID is required")
    .isMongoId()
    .withMessage("Invalid artist ID"),
  body("album")
    .optional()
    .isMongoId()
    .withMessage("Invalid album ID"),
  body("genre")
    .optional()
    .isArray()
    .withMessage("Genre must be an array"),
  body("duration")
    .optional()
    .isNumeric()
    .withMessage("Duration must be a number"),
  body("releaseDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),
];

const updateSongValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),
  body("artist")
    .optional()
    .isMongoId()
    .withMessage("Invalid artist ID"),
  body("album")
    .optional()
    .isMongoId()
    .withMessage("Invalid album ID"),
  body("genre")
    .optional()
    .isArray()
    .withMessage("Genre must be an array"),
];

module.exports = { createSongValidator, updateSongValidator };
