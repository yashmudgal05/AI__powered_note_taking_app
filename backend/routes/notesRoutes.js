const express = require('express');
const multer = require('multer');
const { createNote, getNotes, deleteNote, searchNotes } = require('../controllers/noteController');
const authenticateToken = require('../middleware/authMiddleware'); // Import JWT middleware

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post(
    "/add",
    authenticateToken, // Ensure user is authenticated
    upload.fields([{ name: "image", maxCount: 1 }, { name: "audio", maxCount: 1 }]), 
    createNote
  );
  
router.get('/all', authenticateToken, getNotes);
router.delete('/delete/:id', authenticateToken, deleteNote);
router.get('/search', authenticateToken, searchNotes);

module.exports = router;
