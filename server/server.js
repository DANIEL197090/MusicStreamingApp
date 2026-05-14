require('dotenv').config();
console.log('Loaded ENV:', process.env);


const app = require("./src/app");
const connectDB = require("./src/config/db");
const config = require("./src/config/env");

const startServer = async () => {
  try {
    // Connect to MongoDB Atlas
    await connectDB();

    // Start server
    app.listen(config.port, () => {
      console.log(`\n🎵 ======================================`);
      console.log(`   Music Streaming API`);
      console.log(`   Environment: ${config.nodeEnv}`);
      console.log(`   Port: ${config.port}`);
      console.log(`   URL: http://localhost:${config.port}`);
      console.log(`   Health: http://localhost:${config.port}/api/health`);
      console.log(`🎵 ======================================\n`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
