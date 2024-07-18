const express = require('express')
const authRoutes = express.Router()
const controllers = require('../controllers/authController')

authRoutes.post('/login' , controllers.loginUser)
authRoutes.post('/register' ,  controllers.signUp)
authRoutes.get('/' , (req, res)=>res.redirect('/login'))
module.exports = authRoutes