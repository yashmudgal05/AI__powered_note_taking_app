const express = require('express');
const multer = require('multer');
const { createNote, getNotes, deleteNote } = require('../controllers/noteController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/add', upload.single('image'), createNote);
router.get('/all', getNotes);
router.delete('/delete/:id', deleteNote);

module.exports = router;
