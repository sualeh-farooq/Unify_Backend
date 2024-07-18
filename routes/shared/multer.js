const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        const userId = req.cookies.userId || 'anonymous'; // Assuming user ID is stored in cookies
        // const uniqueSuffix = Date.now() + path.extname(file.originalname);
        // cb(null, `${userId}-${uniqueSuffix}`); // Format filename as userId-timestamp.ext
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
