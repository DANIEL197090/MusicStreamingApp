const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation.controller');

// This must match the exported function name
router.get('/recommendations', recommendationController.getRecommendations);
router.get('/trending', recommendationController.trendingSongs);
router.get('/new-releases', recommendationController.newReleases);
router.get('/featured', recommendationController.featuredcontent);
module.exports = router;
