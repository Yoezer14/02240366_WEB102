const { users, videos } = require('../models');

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

exports.getUserVideos = (req, res) => {
  const userVideos = videos.filter(v => v.userId == req.params.id);
  res.json(userVideos);
};