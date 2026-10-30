const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');
const ALLOWED_FOLDERS = ['cars', 'news', 'reviews'];

// POST /api/uploads?folder=cars&filename=photo.jpg — raw file body
router.post('/', express.raw({ type: '*/*', limit: '15mb' }), (req, res) => {
  try {
    const folder = ALLOWED_FOLDERS.includes(req.query.folder) ? req.query.folder : 'misc';
    const original = path.basename(String(req.query.filename || 'file')).replace(/[^a-z0-9._-]/gi, '_');
    if (!req.body || !req.body.length) return res.status(400).json({ error: 'Empty file' });

    const dir = path.join(UPLOAD_DIR, folder);
    fs.mkdirSync(dir, { recursive: true });
    const fileName = `${Date.now()}_${original}`;
    fs.writeFileSync(path.join(dir, fileName), req.body);

    res.status(201).json({ url: `/uploads/${folder}/${fileName}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = { router, UPLOAD_DIR };
