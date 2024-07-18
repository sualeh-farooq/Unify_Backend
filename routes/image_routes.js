const express = require('express');
const multer = require('multer');
const path = require('path');
const controllers = require('../controllers/imageControllers');
const Cookies = require('js-cookie')

const imageRoutes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        const userId = req; // Assuming user ID is stored in cookies
console.log(userId)
        // const uniqueSuffix = Date.now() + path.extname(file.originalname);
        // cb(null, `${userId}-${uniqueSuffix}`); // Format filename as userId-timestamp.ext
    }             
});

const upload = multer({ storage: storage });

imageRoutes.post('/', upload.single('image'), controllers.storeImg);

module.exports = imageRoutes;
