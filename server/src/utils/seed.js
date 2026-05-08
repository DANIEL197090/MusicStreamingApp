/**
 * Seed script - creates an admin user and sample data
 * Run with: npm run seed
 */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const config = require("../config/env");
const User = require("../models/User");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Song = require("../models/Song");

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting database seed...\n");

    // ==================== CREATE ADMIN ====================
    const existingAdmin = await User.findOne({ email: config.admin.email });
    if (!existingAdmin) {
      await User.create({
        fullName: config.admin.fullName,
        username: config.admin.username,
        email: config.admin.email,
        password: config.admin.password,
        role: "admin",
      });
      console.log("✅ Admin user created");
      console.log(`   Email: ${config.admin.email}`);
      console.log(`   Password: ${config.admin.password}\n`);
    } else {
      console.log("ℹ️  Admin user already exists\n");
    }

    // ==================== CREATE SAMPLE ARTISTS ====================
    const artistData = [
      { name: "Luna Nova", bio: "Electronic music producer blending ambient textures with driving beats.", genres: ["Electronic", "Ambient"], isVerified: true, isFeatured: true },
      { name: "The Midnight Collective", bio: "Indie rock band known for atmospheric soundscapes and heartfelt lyrics.", genres: ["Indie Rock", "Alternative"], isVerified: true },
      { name: "DJ Pulse", bio: "High-energy DJ and producer specializing in house and techno.", genres: ["House", "Techno", "EDM"], isFeatured: true },
      { name: "Aria Grace", bio: "R&B vocalist with a soulful voice and contemporary sound.", genres: ["R&B", "Soul", "Pop"], isVerified: true, isFeatured: true },
      { name: "Neon Dreams", bio: "Synthwave duo creating retro-futuristic soundtracks.", genres: ["Synthwave", "Electronic"] },
    ];

    const existingArtists = await Artist.countDocuments();
    let artists = [];
    if (existingArtists === 0) {
      artists = await Artist.insertMany(artistData);
      console.log(`✅ Created ${artists.length} sample artists`);
    } else {
      artists = await Artist.find().limit(5);
      console.log(`ℹ️  Artists already exist (${existingArtists} found)`);
    }

    // ==================== CREATE SAMPLE ALBUMS ====================
    if (artists.length > 0) {
      const existingAlbums = await Album.countDocuments();
      if (existingAlbums === 0) {
        const albumData = [
          { title: "Stellar Echoes", artist: artists[0]._id, genre: ["Electronic", "Ambient"], releaseDate: new Date("2025-06-15"), description: "A journey through cosmic soundscapes." },
          { title: "City Lights", artist: artists[1]._id, genre: ["Indie Rock"], releaseDate: new Date("2025-08-01"), description: "Stories from the urban nightlife." },
          { title: "Midnight Sessions", artist: artists[2]._id, genre: ["House", "Techno"], releaseDate: new Date("2025-09-20"), description: "Live DJ sets from underground clubs." },
          { title: "Golden Hour", artist: artists[3]._id, genre: ["R&B", "Soul"], releaseDate: new Date("2025-11-10"), description: "Warm melodies for golden moments." },
        ];
        const albums = await Album.insertMany(albumData);
        console.log(`✅ Created ${albums.length} sample albums`);
      } else {
        console.log(`ℹ️  Albums already exist (${existingAlbums} found)`);
      }
    }

    console.log("\n🎵 Seed complete! You can now:");
    console.log("   1. Start the server: npm run dev");
    console.log("   2. Login as admin at POST /api/auth/login");
    console.log("   3. Upload songs via POST /api/admin/songs\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seedDatabase();
