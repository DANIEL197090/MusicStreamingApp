const Artist = require('./artist.model');
// Assuming you have a Track model for getOne
const Track = require('../../models/Song'); 

const getAll = async () => {
  return await Artist.find().sort({ follower_count: -1 });
};

const getOne = async (artistId) => {
  // Parallel fetching as suggested by the guide
  const [artist, tracks] = await Promise.all([
    Artist.findById(artistId),
    Track.find({ artist: artistId })
  ]);
  return { artist, tracks };
};

const toggleFollow = async (artistId, userId) => {
  if (artistId === userId) throw new Error("You cannot follow yourself"); // Self-follow guard
  
  const artist = await Artist.findById(artistId);
  const isFollowing = artist.followers.includes(userId);

  if (isFollowing) {
    artist.followers.pull(userId);
    artist.follower_count -= 1;
  } else {
    artist.followers.addToSet(userId); // Prevents duplicates
    artist.follower_count += 1;
  }

  await artist.save();
  return { following: !isFollowing };
};

module.exports = { getAll, getOne, toggleFollow };