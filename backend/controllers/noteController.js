const db = require('../config/db');
const OpenAI = require("openai");
const tesseract = require("tesseract.js");
const fs = require('fs');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create a new note
const createNote = async (req, res) => {
    const { title, content } = req.body;
    let imageText = "";

    if (req.file) {
        // OCR - Extract text from image
        const { data: { text } } = await tesseract.recognize(req.file.path);
        imageText = text;
        fs.unlinkSync(req.file.path); // Delete the file after processing
    }

    const fullContent = `${content} ${imageText}`;

    // Generate AI summary
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize this: ${fullContent}` }],
    });

    const summary = response.choices[0].message.content;

    db.query('INSERT INTO notes (title, content, summary, image_url) VALUES (?, ?, ?, ?)', 
        [title, content, summary, req.file ? req.file.path : null], 
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Note added!", id: result.insertId });
        }
    );
};

// Get all notes
const getNotes = (req, res) => {
    db.query('SELECT * FROM notes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Delete a note
const deleteNote = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM notes WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Note deleted!" });
    });
};

module.exports = { createNote, getNotes, deleteNote };
