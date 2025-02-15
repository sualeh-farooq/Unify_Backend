const express = require('express');
const adminRoutes = express.Router();
const {upload , addListing , addSeller  ,getListings , getSellers, deleteListing, addBuyer, getBuyers} = require('../controllers/adminController'); // Import the multer configuration

// adminRoutes.post('/addlisting', upload.single('image'), adminController.addListing);


adminRoutes.post('/addListing', upload.fields([
    { name: 'coverPhoto', maxCount: 1 },
    { name: 'listingPhoto', maxCount: 1 },
    { name: 'agencyAgreement', maxCount: 1 },
    { name: 'im', maxCount: 1 }
]), addListing);

adminRoutes.post('/addBuyer' , upload.fields([
    {name: 'agreement' , maxCount: 1}
]) , addBuyer)


adminRoutes.post('/addSeller' , addSeller )
adminRoutes.get('/getSeller' , getSellers  )
adminRoutes.get('/getlistings' , getListings)
adminRoutes.delete('/deletelisting/:id' , deleteListing )
adminRoutes.get('/getBuyer' , getBuyers)



module.exports = adminRoutes;
