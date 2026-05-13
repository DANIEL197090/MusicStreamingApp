const artistService = require('./artist.service');

const getAll = async (req, res) => {
  const artists = await artistService.getAll();
  res.status(200).json(artists);
};

const getOne = async (req, res) => {
  const data = await artistService.getOne(req.params.id);
  res.status(200).json(data);
};

const toggleFollow = async (req, res) => {
  try {
    const result = await artistService.toggleFollow(req.params.id, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAll, getOne, toggleFollow };