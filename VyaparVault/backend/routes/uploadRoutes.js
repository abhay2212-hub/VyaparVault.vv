const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../utils/cloudinaryClient');

// Use memory storage so we can stream to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// POST /api/upload/image
router.post('/image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const streamifier = require('streamifier');

        const uploadStream = cloudinary.uploader.upload_stream({ folder: 'vyaparvault/products' }, (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ message: 'Upload failed', error });
            }
            res.json({ url: result.secure_url, public_id: result.public_id });
        });

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message || err });
    }
});

module.exports = router;
