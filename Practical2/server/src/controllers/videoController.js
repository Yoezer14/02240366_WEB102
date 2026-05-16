const { videos } = require('../models');

exports.getAllVideos = (req, res) => {
  res.json(videos);
};

exports.getVideoById = (req, res) => {
  const video = videos.find(v => v.id == req.params.id);

  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }

  res.json(video);
};