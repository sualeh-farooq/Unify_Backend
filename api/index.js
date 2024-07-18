const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('../routes/auth');
const imageRoutes = require('../routes/image_routes');
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const adminRoutes = require('../routes/admin');
require('dotenv').config();

mongoose.connect('mongodb+srv://sualehfarooq65:sualeh123@cluster0.ep9momm.mongodb.net/unify?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log(`Database Connected`);
    })
    .catch((err) => {
        console.log(err);
    });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
// app.use('/api/images', express.static('public/uploads'));
// app.use('/files', express.static(path.join(__dirname, 'public/uploads')));
// app.use('/files', express.static(path.join(__dirname, 'public/uploads')))
// app.use('*/files',express.static('public/uploads'));

app.use('/files', express.static(path.join(__dirname, '../public/uploads')))



app.get('/', (req, res) => {
    res.send(`<p>Server is running</p>`);
});

app.use('/api/images', imageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res, next) => {
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.path}`);
    console.log(`URL: ${req.url}`);
    next();
});

module.exports = app;
