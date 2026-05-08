const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");
const { uploadSong, uploadImage, uploadCover } = require("../middleware/upload.middleware");
const { uploadLimiter } = require("../middleware/rateLimiter");
const admin = require("../controllers/admin.controller");

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// Song Management
router.post("/songs", uploadLimiter, uploadSong, admin.createSong);
router.put("/songs/:id", uploadSong, admin.updateSong);
router.delete("/songs/:id", admin.deleteSong);
router.put("/songs/:id/feature", admin.featureSong);

// Artist Management
router.post("/artists", uploadLimiter, uploadImage, admin.createArtist);
router.put("/artists/:id", uploadImage, admin.updateArtist);
router.delete("/artists/:id", admin.deleteArtist);

// Album Management
router.post("/albums", uploadLimiter, uploadCover, admin.createAlbum);
router.put("/albums/:id", uploadCover, admin.updateAlbum);
router.delete("/albums/:id", admin.deleteAlbum);

// User Management
router.get("/users", admin.getUsers);
router.put("/users/:id/suspend", admin.suspendUser);
router.delete("/users/:id", admin.deleteUser);

// Analytics
router.get("/analytics/overview", admin.getAnalyticsOverview);
router.get("/analytics/streams", admin.getStreamAnalytics);

// Featured Playlists
router.post("/playlists", admin.createFeaturedPlaylist);

module.exports = router;
