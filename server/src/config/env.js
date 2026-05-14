const path = require('path');        // ✅ import path
require('dotenv').config({ 
  path: path.resolve(__dirname, '../../.env') // ✅ point to root .env
});

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@musicapp.com",
    password: process.env.ADMIN_PASSWORD || "password123",
    username: process.env.ADMIN_USERNAME || "admin",
    fullName: process.env.ADMIN_FULLNAME || "System Admin",
  },
};

console.log('Loaded Mongo URI:', process.env.MONGO_URI);
console.log('Loaded JWT Secret:', process.env.JWT_SECRET);
console.log('Loaded Cloudinary Config:');
console.log('  - Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('  - API Key:', process.env.CLOUDINARY_API_KEY);
console.log('  - API Secret:', process.env.CLOUDINARY_API_SECRET);
console.log('Loaded Admin Config:');
console.log('  - Email:', process.env.ADMIN_EMAIL);
console.log('  - Username:', process.env.ADMIN_USERNAME);
console.log('  - Full Name:', process.env.ADMIN_FULLNAME);