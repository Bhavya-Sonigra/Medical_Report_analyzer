const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);

    res.status(200).json({
      message: 'PDF uploaded and parsed successfully',
      extractedText: data.text,
      fileName: req.file.filename
    });
  } catch (err) {
    console.error('PDF parse error:', err);
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
});

module.exports = router;
