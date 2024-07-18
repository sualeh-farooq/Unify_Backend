const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('../routes/auth')
const imageRoutes = require('../routes/image_routes')
const path = require('path')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const adminRoutes = require('../routes/admin')
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        console.log(`Database Connected`)
        app.listen(process.env.PORT, () => {
            console.log('Server Started with DB')
        })
    })
    .catch((err) => {
        console.log(err)
    })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the extension to the filename
    }
});

 const upload = multer({ storage: storage })



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use('/api/images', express.static('public/uploads'))


app.get('/', (req, res) => {
    res.send(`<p>Server is running</p>`)
})


app.use('/api/images', imageRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/admin' , adminRoutes)


// Middleware function handler on every request API
app.use((req, res, next) => {
    console.log(`Method: ${req.method}`)
    console.log(`Path: ${req.path}`)
    console.log(`URL: ${req.url}`)
    next()
})


module.exports = upload