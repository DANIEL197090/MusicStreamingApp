const router = require("express").Router();
const { getTrending, getNewReleases, getRecommended, getFeatured } = require("../controllers/recommendation.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/trending", getTrending);
router.get("/new-releases", getNewReleases);
router.get("/recommended", protect, getRecommended);
router.get("/featured", getFeatured);

module.exports = router;
