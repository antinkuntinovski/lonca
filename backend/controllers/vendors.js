const Vendor = require('../models/vendor');

exports.getVendors = async (req, res, next) => {
    try {
        const vendors = await Vendor.find();
        console.log(`Found ${vendors.length} vendors`);
        res.status(200).json(vendors);
    } catch (error) {
        next(error);
    }
}

exports.createVendor = async (req, res, next) => {
    try {
        const { name } = req.body;
        const vendor = new Vendor({ name });
        await vendor.save();
        console.log(`Created vendor ${vendor.name}`);
        res.status(201).json(vendor);
    } catch (error) {
        next(error);
    }
};

exports.getVendorById = async (req, res, next) => {
    try {
        const { vendorId } = req.params;
        const vendors = await Vendor.find({ _id: vendorId });
        console.log(`Found ${vendors.length} vendors`);
        res.status(200).json(vendors);
    } catch (error) {
        next(error);
    }
}
