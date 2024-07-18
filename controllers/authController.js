const userSchema = require('../models/users')
const bcrypt = require('bcrypt')
const { generateToken } = require('../lib/jwt')



const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email });
 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = bcrypt.compare(password, user.password).then((result) => {
            if (result) {
                const token = generateToken(user)
                return res.status(200).json({ message: 'Success Login Credentials', token, data: user })
            } else {
                return res.status(404).json({ message: 'Incorrect Passowrds', })
            }
        })
            .catch((err) => console.log(err))

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const signUp = async (req, res) => {
    const { name, email, password, confirm_password } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords Do Not Match' })
    }
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    console.log(passwordHash)
    const registerUser = new userSchema({
        name: name,
        email: email,
        password: passwordHash,
    })
    try {
        registerUser.save()
            .then((data) => {
                const savedUser = data

                res.status(200).json({ data: savedUser, token, message: 'User Registered' })
            })
    } catch (error) {
        console.log(`Error ==> ${err}`)
        return res.status(404).json({ message: `Error Occured ==> ${err} ` })
    }
}

module.exports = {
    loginUser, signUp
}