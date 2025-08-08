// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    withCredentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Route imports
try {
  const authRoutes = require("./routes/authRoutes");
  const adminRoutes = require("./routes/adminRoutes");
  const studentRoutes = require("./routes/studentRoutes");

  // Check if routes are valid functions (Express routers)
  if (typeof authRoutes !== "function") {
    throw new Error(
      "authRoutes is not exporting a router. Check ./routes/authRoutes.js"
    );
  }
  if (typeof adminRoutes !== "function") {
    throw new Error(
      "adminRoutes is not exporting a router. Check ./routes/adminRoutes.js"
    );
  }
  if (typeof studentRoutes !== "function") {
    throw new Error(
      "studentRoutes is not exporting a router. Check ./routes/studentRoutes.js"
    );
  }

  // Mount routes
  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/student", studentRoutes);
} catch (err) {
  console.error("❌ Route loading error:", err.message);
  process.exit(1); // Stop server if routes are invalid
}

const PORT = process.env.PORT || 5003;
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

app.listen(PORT, () => console.log(`🚀 Backend listening on port ${PORT}`));
