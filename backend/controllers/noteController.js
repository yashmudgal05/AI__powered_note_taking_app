const db = require('../config/db');
const OpenAI = require("openai");
const tesseract = require("tesseract.js");
const fs = require('fs');
const speech = require('@google-cloud/speech');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new speech.SpeechClient();

const createNote = async (req, res) => {
    const { title, content, tags } = req.body;
    let imageText = "";
    let audioText = "";

    try {
        // 🔍 Process Image using OCR
        if (req.files && req.files.image) {
            const { data: { text } } = await tesseract.recognize(req.files.image[0].path);
            imageText = text;
            fs.unlinkSync(req.files.image[0].path);
        }

        // 🎤 Process Audio using Google Speech-to-Text
        if (req.files && req.files.audio) {
            const filePath = req.files.audio[0].path;
            const audioBytes = fs.readFileSync(filePath).toString('base64');

            const request = {
                audio: { content: audioBytes },
                config: { encoding: 'LINEAR16', sampleRateHertz: 16000, languageCode: 'en-US' },
            };

            const [response] = await client.recognize(request);
            audioText = response.results.map(r => r.alternatives[0].transcript).join('\n');

            fs.unlinkSync(filePath);
        }

        // 🧠 AI Summary based on Available Inputs
        const fullContent = `${content} ${imageText} ${audioText}`;
        const aiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Summarize this: ${fullContent}` }],
        });

        const summary = aiResponse.choices[0].message.content;

        // 📦 Insert into Database
        db.query(
            'INSERT INTO notes (user_id, title, content, summary, tags, image_url, audio_url) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [req.userId, title, content, summary, tags, req.files.image ? req.files.image[0].path : null, req.files.audio ? req.files.audio[0].path : null], 
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Note added!", id: result.insertId });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Failed to create note" });
    }
};

// Get Notes (Only User-Specific Notes)
const getNotes = (req, res) => {
    db.query('SELECT * FROM notes WHERE user_id = ?', [req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Delete Note (Only Owner Can Delete)
const deleteNote = (req, res) => {
    const noteId = req.params.id;

    db.query('DELETE FROM notes WHERE id = ? AND user_id = ?', [noteId, req.userId], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

        res.json({ message: "Note deleted successfully" });
    });
};

// Search Notes using AI
const searchNotes = async (req, res) => {
    const { query } = req.query;
    const aiPrompt = `Find notes related to: ${query}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: aiPrompt }],
        });

        const keywords = response.choices[0].message.content.split(", ");

        db.query(
            'SELECT * FROM notes WHERE user_id = ? AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)',
            [req.userId, `%${keywords[0]}%`, `%${keywords[0]}%`, `%${keywords[0]}%`], 
            (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(results);
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Failed to process search request" });
    }
};

module.exports = { createNote, getNotes, deleteNote, searchNotes };
