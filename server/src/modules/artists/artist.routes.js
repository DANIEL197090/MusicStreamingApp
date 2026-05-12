const express = require('express');
const router = express.Router();
const artistController = require('./artist.controller');
const { protect } = require('../../middleware/auth.middleware');

router.get('/', artistController.getAll);
router.get('/:id', artistController.getOne);
router.post('/:id/follow', protect, artistController.toggleFollow);

module.exports = router;