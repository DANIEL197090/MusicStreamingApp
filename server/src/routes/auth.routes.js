const router = require("express").Router();
const { register, login, getMe, updateProfile } = require("../controllers/auth.controller");
const { registerValidator, loginValidator, updateProfileValidator } = require("../validators/auth.validator");
const { protect } = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/rateLimiter");

router.post("/register", authLimiter, registerValidator, register);
router.post("/login", authLimiter, loginValidator, login);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfileValidator, updateProfile);

module.exports = router;
