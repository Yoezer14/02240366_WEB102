const express = require('express');
const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const uploadDir = 'uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid File Type'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

app.post('/api/upload', upload.single('file'), (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No File Uploaded'
            });
        }

        res.status(200).json({
            success: true,
            message: 'File Uploaded Successfully',
            file: req.file.filename
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.use((err, req, res, next) => {

    res.status(500).json({
        success: false,
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});