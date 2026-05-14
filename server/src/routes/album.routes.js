const router = require("express").Router();
const { getAlbums, getAlbumById } = require("../controllers/album.controller");

router.get("/", getAlbums);
router.get("/:id", getAlbumById);

module.exports = router;
