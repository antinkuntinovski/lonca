const ParentProduct = require('../models/parent-product');

exports.getAllParentProducts = async (req, res, next) => {
    try {
        console.log('Get All Parent Products');
        const parentProducts = await ParentProduct.find();

        res.status(200).json(parentProducts);
    } catch (error) {
        next(error);
    }
};

exports.getParentProductsByVendor = async (req, res, next) => {
    try {
        const { vendorId } = req.params; // Assuming you're extracting the vendor ID from the route parameters
        console.log(`Get Parent products by Vendor ID: ${vendorId}`);
        const parentProducts = await ParentProduct.find({
            'vendor': vendorId
        });
        //console.log(`Found ${parentProducts.length}`);
        res.status(200).json(parentProducts);
    } catch (error) {
        next(error);
    }
};

exports.createParentProduct = async (req, res, next) => {
    try {
        const { name, vendor } = req.body;

        const parentProduct = new ParentProduct({ name, vendor });

        await parentProduct.save();
        console.log(`Created parent product ${parentProduct.name}`);
        res.status(201).json(parentProduct);
    } catch (error) {
        next(error);
    }
};