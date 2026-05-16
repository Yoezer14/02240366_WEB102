const users = [
  {
    id: 1,
    username: "sonam",
    followers: []
  }
];

const videos = [
  {
    id: 1,
    title: "My First Video",
    userId: 1
  }
];

const comments = [
  {
    id: 1,
    text: "Nice video",
    videoId: 1,
    userId: 1
  }
];

module.exports = {
  users,
  videos,
  comments
};
