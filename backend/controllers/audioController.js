const speech = require('@google-cloud/speech');
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });
const client = new speech.SpeechClient();

const processAudio = async (req, res) => {
    const filePath = req.file.path;
    const audioBytes = fs.readFileSync(filePath).toString('base64');

    const request = {
        audio: { content: audioBytes },
        config: { encoding: 'LINEAR16', sampleRateHertz: 16000, languageCode: 'en-US' },
    };

    const [response] = await client.recognize(request);
    const transcription = response.results.map(r => r.alternatives[0].transcript).join('\n');

    fs.unlinkSync(filePath);
    res.json({ transcription });
};

module.exports = { processAudio, upload };
