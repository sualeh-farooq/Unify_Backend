const express = require('express');
const adminRoutes = express.Router();
const {upload , addListing , addSeller  ,getListings , getSellers} = require('../controllers/adminController'); // Import the multer configuration

// adminRoutes.post('/addlisting', upload.single('image'), adminController.addListing);


adminRoutes.post('/addListing', upload.fields([
    { name: 'coverPhoto', maxCount: 1 },
    { name: 'listingPhoto', maxCount: 1 },
    { name: 'agencyAgreement', maxCount: 1 },
    { name: 'im', maxCount: 1 }
]), addListing);

adminRoutes.post('/addSeller' , addSeller )
adminRoutes.get('/getSeller' , getSellers  )
adminRoutes.get('/getlistings' , getListings)



module.exports = adminRoutes;