const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellers = new Schema({
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
    business: {
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
    sellerType: {
        type: String,
    }
})

const sellerSchema = mongoose.model('sellers' , sellers)

module.exports = sellerSchema