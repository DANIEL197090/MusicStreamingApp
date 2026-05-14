const express = require("express");
const router = express.Router();

const {
    getAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum
} = require("../controllers/albumController");

// GET ALL
router.get("/", getAlbums);

// GET ONE
router.get("/:id", getAlbumById);

// CREATE
router.post("/", createAlbum);

// UPDATE
router.put("/:id", updateAlbum);

// DELETE
router.delete("/:id", deleteAlbum);

module.exports = router;