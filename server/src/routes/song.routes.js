const router = require("express").Router();
const { getSongs, getSongById, getStreamUrl, toggleLike, recordPlay, getLikedSongs } = require("../controllers/song.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", getSongs);
router.get("/liked", protect, getLikedSongs);
router.get("/:id", getSongById);
router.get("/:id/stream", protect, getStreamUrl);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/play", protect, recordPlay);

module.exports = router;
