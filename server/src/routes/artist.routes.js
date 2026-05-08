const router = require("express").Router();
const { getArtists, getArtistById, toggleFollow } = require("../controllers/artist.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", getArtists);
router.get("/:id", getArtistById);
router.post("/:id/follow", protect, toggleFollow);

module.exports = router;
