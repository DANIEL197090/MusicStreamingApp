const router = require("express").Router();
const { getMyPlaylists, getFeaturedPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist } = require("../controllers/playlist.controller");
const { createPlaylistValidator, updatePlaylistValidator, addSongValidator } = require("../validators/playlist.validator");
const { protect } = require("../middleware/auth.middleware");
const { optionalAuth } = require("../middleware/auth.middleware");

router.get("/featured", getFeaturedPlaylists);
router.get("/", protect, getMyPlaylists);
router.get("/:id", optionalAuth, getPlaylistById);
router.post("/", protect, createPlaylistValidator, createPlaylist);
router.put("/:id", protect, updatePlaylistValidator, updatePlaylist);
router.delete("/:id", protect, deletePlaylist);
router.post("/:id/songs", protect, addSongValidator, addSongToPlaylist);
router.delete("/:id/songs/:songId", protect, removeSongFromPlaylist);

module.exports = router;
