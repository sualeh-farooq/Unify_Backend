const mongoose = require('mongoose')
const Schema = mongoose.Schema
const system_roles = ['admin' , 'broker'];
const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String , 
        unique: true,
        required: true,
    },
    profile : {
        type: String,
    },
    role : {
        type: String,
        enum: system_roles,
        default: 'broker'
    },
    password: {
        type:String
    },
    profile_picture: {
        type:String
    },
    verified: {
        type: Boolean,
        default: false
    },
    listings: {
        type:Array
    }
} , {timeStamps: true})
const userSchema = mongoose.model('Users' , user)
module.exports  = userSchema