const router = require("express").Router();
const { getRecentlyPlayed, getMostPlayed } = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/recent", protect, getRecentlyPlayed);
router.get("/most-played", protect, getMostPlayed);

module.exports = router;
