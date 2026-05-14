const Album = require("../models/Album");

// GET ALL ALBUMS
const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE ALBUM
const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE ALBUM
const createAlbum = async (req, res) => {
    try {
        const album = await Album.create(req.body);
        res.status(201).json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE ALBUM
const updateAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE ALBUM
const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id);

        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum
};