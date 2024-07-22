const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buyers = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String , 
        required: true
    },
    budget: {
        type:String , 
        required:true
    },
    interest: {
        type:String , 
        required: true
    },
    broker: {
        type: Number,
        required:true 
    },
    agreement: {
        type: String
    },
    buyerType: {
        type: String,
    },
})

const buyerSchema = mongoose.model('buyers' , buyers)

module.exports = buyerSchema