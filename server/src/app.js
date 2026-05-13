const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { apiLimiter } = require("./middleware/rateLimiter");
const { errorHandler, notFound } = require("./middleware/error.middleware");

// Import routes
const authRoutes = require("./routes/auth.routes");
const songRoutes = require("./routes/song.routes");
// const artistRoutes = require("./routes/artist.routes"); // Moved to app.js for better modularity
const albumRoutes = require("./routes/album.routes");
const playlistRoutes = require("./routes/playlist.routes");
const searchRoutes = require("./routes/search.routes");
const recommendationRoutes = require("./routes/recommendation.routes");
const historyRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// ==================== MIDDLEWARE ====================

// Security headers
app.use(helmet());

// CORS - allow requests from admin dashboard
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? [process.env.ADMIN_URL || "https://admin.yourdomain.com"]
      : ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"],
    credentials: true,
  })
);

// Request logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
app.use("/api", apiLimiter);

// ==================== ROUTES ====================

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "🎵 Music Streaming API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/feed", recommendationRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/artists', require('./modules/artists/artist.routes'));

// ==================== ERROR HANDLING ====================

app.use(notFound);
app.use(errorHandler);

module.exports = app;
