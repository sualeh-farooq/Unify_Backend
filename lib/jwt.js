require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_TOKEN
const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, secret, { expiresIn: '1h' })
}
const verifyToken = (token) => {
    return jwt.verify(token, secret)
}
module.exports = {generateToken , verifyToken}