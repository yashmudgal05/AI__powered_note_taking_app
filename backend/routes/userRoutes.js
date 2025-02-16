const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();
const multer = require("multer");
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// User Registration
router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
        [name, email, hashedPassword], 
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User registered successfully!" });
        }
    );
});

// User Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("request received for login")

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(400).json({ error: "User not found" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, userId: user.id });
    });
});

// ✅ Get User Details (Protected Route)
router.get("/user", authenticateToken, (req, res) => {
    const userId = req.userId; // ✅ Correctly extract userId

    db.query("SELECT id, name, email FROM users WHERE id = ?", [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "User not found" });

        res.json(results[0]); // ✅ Return user details
    });
});

// Get user profile details
router.get("/profile", (req, res) => {
    db.query("SELECT name, email, profileImage FROM users WHERE id = ?", [req.userId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result[0]);
    });
  });

  router.get("/profile/:id", (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT name, email, profileImage FROM users WHERE id = ?";
  
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(result[0]);
      console.log(result[0]);
    });
  });
  
  
  // Update profile picture
  router.post("/update-photo/:id", upload.single("profileImage"), (req, res) => {
    const userId = req.params.id;
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });
  
    const profileImage = `/uploads/${req.file.filename}`;
  
    const sql = "UPDATE users SET profileImage = ? WHERE id = ?";
    db.query(sql, [profileImage, userId], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to update profile image" });
      }
      res.json({ message: "Profile photo updated successfully!", profileImage });
    });
  });

module.exports = router;
