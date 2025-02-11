const express = require('express');
const multer = require('multer');
const { createNote, getNotes, deleteNote, searchNotes } = require('../controllers/noteController');
const authenticateToken = require('../middleware/authMiddleware'); // Import JWT middleware

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Routes (Protected)
router.post('/add', authenticateToken, upload.fields([{ name: 'image' }, { name: 'audio' }]), createNote);
router.get('/all', authenticateToken, getNotes);
router.delete('/delete/:id', authenticateToken, deleteNote);
router.get('/search', authenticateToken, searchNotes);

module.exports = router;
