const { comments } = require('../models');

exports.getAllComments = (req, res) => {
  res.json(comments);
};

exports.getCommentById = (req, res) => {
  const comment = comments.find(c => c.id == req.params.id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  res.json(comment);
};