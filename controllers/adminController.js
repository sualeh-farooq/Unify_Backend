const multer = require('multer');
const path = require('path');
const hash = require('bcrypt')
const IncomingForm = require('formidable')
const mv = require('mv')
const listingSchema = require('../models/listing');
const sellerSchema = require('../models/sellers')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp'); 
    },
    filename: function (req, file, cb) {
        const userId = req.cookies.userId || 'anonymous';
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
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
    } = req.body;

    const {
        coverPhoto,
        listingPhoto,
        agencyAgreement,
        im
    } = req.files;

    // Move files from /tmp to your desired directory if needed
    const moveFile = (file, targetDir) => {
        return new Promise((resolve, reject) => {
            const sourcePath = path.join('tmp', file.filename);
            const destPath = path.join(process.cwd(), targetDir, file.filename);
            fs.copyFile(sourcePath, destPath, (err) => {
                if (err) return reject(err);
                fs.unlink(sourcePath, (unlinkErr) => {
                    if (unlinkErr) return reject(unlinkErr);
                    resolve(destPath);
                });
            });
        });
    };

    try {
        // Move files if they exist
        const filesToMove = [
            coverPhoto && coverPhoto[0],
            listingPhoto && listingPhoto[0],
            agencyAgreement && agencyAgreement[0],
            im && im[0]
        ].filter(Boolean);

        const movePromises = filesToMove.map(file => moveFile(file, 'public/uploads'));
        await Promise.all(movePromises);

        const newListing = new listingSchema({
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
            coverPhoto: coverPhoto ? coverPhoto[0].filename : '',
            agencyAgreement: agencyAgreement ? agencyAgreement[0].filename : '',
            im: im ? im[0].filename : '',
            listingPhoto: listingPhoto ? listingPhoto[0].filename : ''
        });

        const savedListing = await newListing.save();
        return res.status(200).json({ data: savedListing, message: 'Listing and image uploaded successfully' });
    } catch (err) {
        console.log(`Error ==> ${err}`);
        return res.status(404).json({ message: `Error Occurred ==> ${err}` });
    }
};

const addBuyer = async (req, res) =>{
    console.log('hit')
    return res.status(200).json({message: 'Add Buyer API Hit'})
}


const getListings = async (req, res) => {
    try {
        const listings = await listingSchema.aggregate([
            {
                $addFields: {
                    seller: { $toObjectId: "$seller" }
                }
            },
            {
                $lookup: {
                    from: 'sellers',
                    localField: 'seller',
                    foreignField: '_id',
                    as: 'sellerDetails'
                }
            },
            {
                $unwind: '$sellerDetails'
            }
        ]);

        res.status(200).json({
            message: 'Listings fetch successfully',
            data: listings
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: `There is an error fetching the listings data: ${error}`
        });
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


const deleteListing = async (req, res) => {
    try {
        await sellerSchema.findByIdAndDelete({ _id: req.params.id })
            .then((data) => {
                console.log(`Seller Deleted`)
                res.status(200).json({ data: data, message: 'Seller Deleted Sucesfully' })
            })
            .catch((err) => {
                console.log(err)
                res.status(401).json({ message: 'Something Went Wrong', error: err })
            })
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Something Went Wrong', error: error })
    }
}
module.exports = { addListing, upload, addSeller, getSellers, getListings, deleteListing  , addBuyer};
