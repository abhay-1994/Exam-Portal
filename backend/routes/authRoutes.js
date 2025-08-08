console.log("Loading authRoutes.js...");
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  registerAdmin,
  loginAdmin,
} = require("../controllers/authController");
console.log("authRoutes controller functions loaded:", {
  hasRegister: !!register,
  hasLogin: !!login,
});

router.post("/register", register);
router.post("/login", login);

router.post("/add-admin", registerAdmin);
router.post("/login-admin", loginAdmin);

module.exports = router;
console.log("authRoutes.js export complete");
