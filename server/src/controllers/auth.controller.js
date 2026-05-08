// TODO: Implement authentication controllers
// Each controller receives (req, res, next) and should use the User model + JWT utils
// Use validationResult(req) from express-validator to check input errors before processing

const { validationResult } = require("express-validator");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt.utils");

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 * @body    { fullName, username, email, password }
 */
const register = async (req, res, next) => {
  // TODO: Implement registration
  // 1. Check validationResult(req) for errors
  // 2. Check if user already exists (by email or username)
  // 3. Create user via User.create()
  // 4. Generate JWT token via generateToken(user._id)
  // 5. Return { success: true, data: { user, token } }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 * @body    { email, password }
 */
const login = async (req, res, next) => {
  // TODO: Implement login
  // 1. Find user by email with .select("+password")
  // 2. Check if user.isActive (not suspended)
  // 3. Compare password via user.comparePassword(password)
  // 4. Generate token and return user + token
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private (requires protect middleware)
 */
const getMe = async (req, res, next) => {
  // TODO: Implement get profile
  // req.user is already set by auth middleware
  // Populate likedSongs and following fields
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 * @body    { fullName?, username? }
 */
const updateProfile = async (req, res, next) => {
  // TODO: Implement profile update
  // Only allow updating fullName and username
  // Check if new username is taken before updating
};

module.exports = { register, login, getMe, updateProfile };
