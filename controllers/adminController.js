const multer = require('multer');
const path = require('path');
const hash = require('bcrypt')
const IncomingForm = require('formidable')
const mv = require('mv')
const listingSchema = require('../models/listing');
const sellerSchema = require('../models/sellers')


// Multer for Admin Media Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        const userId = req.cookies.userId || 'anonymous';
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, `${userId}-${uniqueSuffix}`);
    }
});

const upload = multer({ storage: storage });

// Add Listing
const addListing = async (req, res) => {
    const {
        deal_name,
        asking_price,
        commision,
        funds,
        revenue,
        ebitda,
        seller,
        location,
        industry,
        broker,
        adTitle,
        status,
        webAd
    } = req.body

    const {
        coverPhoto,
        listingPhoto, agencyAgreement, im
    } = req.files
    const addListing = new listingSchema({
        dealName: deal_name,
        askingPrice: asking_price,
        commision: commision,
        marketingFunds: funds,
        revenue: revenue,
        ebitda: ebitda,
        seller: seller,
        location: location,
        industry: industry,
        broker: broker,
        adTitle: adTitle,
        webAd: webAd,
        status: status,
        coverPhoto: coverPhoto !== undefined ? coverPhoto[0].filename : '',
        agencyAgreement: agencyAgreement !== undefined ? agencyAgreement[0].filename : '',
        im: im !== undefined ? im[0].filename : '',
        listingPhoto: listingPhoto !== undefined ? listingPhoto[0].filename : ''
    })
    try {
        addListing.save()
            .then((data) => {
                const savedListing = data
                return res.status(200).json({ data: savedListing, message: 'Listing and image uploaded successfully' });
            })
    } catch (err) {
        console.log(`Error ==> ${err}`)
        return res.status(404).json({ message: `Error Occured ==> ${err} ` })
    }


};

//Get Listings


const getListings = async (req, res) => {
    try {
        const response = await listingSchema.find()
            .then((data) => {
                const listings = data
                res.status(200).json({ message: 'Listings fetch succesfully', data: listings })
            })
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: `There is an error fetching the listings data ${error}` })
    }
};


// Add Seller
const addSeller = async (req, res) => {
    const { name, phone, email, business, interest, broker, type } = req.body
    const registerSeller = new sellerSchema({
        name: name,
        email: email,
        phone: phone,
        interest: interest,
        broker: broker,
        business: business,
        sellerType: type
    })
    try {
        registerSeller.save()
            .then((data) => {
                let savedSeller = data
                return res.status(200).json({ message: 'Seller Added Succesfully', data: savedSeller })
            }).catch((err) => {
                console.log(`Error Occured While Adding Seller`, err)
                return res.status(502).json({ message: `Error Occured in Adding Seller ${err}` })
            })
    } catch (error) {
        return res.status(502).json({ message: `Error Occured in Adding Seller ${error}` })

    }
}


const getSellers = async (req, res) => {
    try {
        await sellerSchema.find()
            .then((data) => {
                let sellers = data
                return res.status(200).json({ message: 'List of All Sellers', data: sellers })
            }).catch((err) => {
                console.log(err)
                return res.status(404).json({ message: `Error Fetching Sellers Data ${err}` })
            })
    } catch (error) {
        return res.status(404).json({ message: `Error Fetching Sellers Data ${error}` })

    }
}

module.exports = { addListing, upload, addSeller, getSellers, getListings };
