const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const noteRoutes = require('./routes/notesRoutes');
const userRoutes = require('./routes/userRoutes');
const { processAudio, upload } = require('./controllers/audioController');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);
app.post('/api/audio', upload.single('audio'), processAudio);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
