const express = require('express');
const router = express.Router();

const videoController = require('../controllers/videoController');

router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);

module.exports = router;