const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listing = new Schema({
    dealName: {
        type: String,
        required: true
    },
    askingPrice: {
        type: String,
        required: true
    },
    commision: {
        type: String,
        required: true
    },
    marketingFunds: {
        type: String,
        required: true
    },
    revenue: {
        type: String,
        required: true
    },
    ebitda: {
        type: String,
    },
    seller: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
   
    industry: {
        type: String,
        required: true
    },
    broker: {
        type: String,
        required: true
    },
    adTitle: {
        type: String
    },
    webAd: {
        type: String
    },
    coverPhoto: {
        type: String,
    },
    listingPhoto: {
        type: String
    },
    agencyAgreement: {
        type: String
    },
    im: {
        type: String
    },
    status: {
        type: String
    }
    
})

const listingSchema = mongoose.model('listings' , listing)
module.exports = listingSchema



