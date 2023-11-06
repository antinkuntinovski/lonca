const ParentProduct = require('../models/parent-product');
const Order = require('../models/order');

exports.getAllOrders = async (req, res, next) => {
    try {
        console.log('Get All Orders');
        const orders = await Order.find();
        //console.log(`Found ${orders.length} orders`);
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

exports.getCartItemsByProductId = async (req, res, next) => {
    try {
        const { productId } = req.params; // Assuming you're extracting the product ID from the route parameters

        console.log(`Get Cart Items by Product ID: ${productId}`);

        const allOrders = await Order.find();

        const filteredOrders = allOrders.filter(order =>
            order.cart_item.some(item => item.product && item.product.$oid === productId)
        );

        const matchingCartItems = filteredOrders.map(order =>
            order.cart_item.filter(item => item.product && item.product.$oid === productId)
        );

        console.log(`Found ${matchingCartItems.length} cart items`);

        res.status(200).json(matchingCartItems);
    } catch (error) {
        next(error);
    }
};

exports.getCartItemsByVendor = async (req, res, next) => {
    try {
        const { vendorId } = req.params;

        console.log(`Get Cart Items by Vendor ID: ${vendorId}`);

        const parents = await ParentProduct.find({ vendor: vendorId });

        const parentIds = parents.map(parent => parent._id.toString());

        console.log(`Found ${parents.length} parents`);
        //console.log(parentIds);

        const matchingCartItems = await Order.find({
            'cart_item.product.$oid': { $in: parentIds }
        });

        //console.log(`Found cart items for all parents`);
        //console.log(matchingCartItems.length);

        const flattenedCartItems = matchingCartItems.flatMap(order =>
            order.cart_item
                .filter(item => parentIds.includes(item.product.$oid))
                .map(item => ({
                    cart_item: item,
                    payment_at: order.payment_at
                }))
        );

        res.status(200).json(flattenedCartItems);
    } catch (error) {
        next(error);
    }
};

exports.getOrdersInYear = async (req, res, next) => {
    try {
        const { year } = req.params;
        const begin = new Date(`${year}-01-01`);
        const nextYear = parseInt(year) + 1;
        const end = new Date(`${nextYear}-01-01`);

        console.log(`Get Orders by Year: ${year}`);

        const ordersWithinAYear = await Order.find({
            payment_at: { $gte: begin, $lte: end }
        });
        //console.log(`Found ${ordersWithinAYear.length} orders in ${year}`);
        res.status(200).json(ordersWithinAYear);
    } catch (error) {
        next(error);
    }
};

exports.getCartItemsByVendorAndYear = async (req, res, next) => {
    try {
        const { vendorId, year } = req.params;

        console.log(`Get Cart Items by Vendor ID: ${vendorId}, Year: ${year}`);

        const parents = await ParentProduct.find({ vendor: vendorId });
        const parentIds = parents.map(parent => parent._id.toString());

        //console.log(`Found ${parents.length} parents`);

        const begin = new Date(`${year}-01-01`);
        const nextYear = parseInt(year) + 1;
        const end = new Date(`${nextYear}-01-01`);

        const matchingCartItems = await Order.find({
            'cart_item.product.$oid': { $in: parentIds },
            payment_at: { $gte: begin, $lt: end }
        });

        //console.log(`Found cart items for all parents within the specified year`);
        //console.log(matchingCartItems.length);

        const flattenedCartItems = matchingCartItems.flatMap(order =>
            order.cart_item
                .filter(item => parentIds.includes(item.product.$oid))
                .map(item => ({
                    cart_item: item,
                    payment_at: order.payment_at
                }))
        );

        res.status(200).json(flattenedCartItems);
    } catch (error) {
        next(error);
    }
};

exports.getCartItemsByVendorAndMonth = async (req, res, next) => {
    try {
        const { vendorId, year, month } = req.params;

        console.log(`Get Cart Items by Vendor ID: ${vendorId}, Year: ${year}`);

        const parents = await ParentProduct.find({ vendor: vendorId });
        const parentIds = parents.map(parent => parent._id.toString());

        //console.log(`Found ${parents.length} parents`);

        const begin = new Date(`${year}-${month}-01`);
        const nextMonth = parseInt(month) + 1;
        const end = new Date(`${year}-${nextMonth}-01`);

        const matchingCartItems = await Order.find({
            'cart_item.product.$oid': { $in: parentIds },
            payment_at: { $gte: begin, $lt: end }
        });

        //console.log(`Found cart items for all parents within the specified year`);
        //console.log(matchingCartItems.length);

        const flattenedCartItems = matchingCartItems.flatMap(order =>
            order.cart_item
                .filter(item => parentIds.includes(item.product.$oid))
                .map(item => ({
                    cart_item: item,
                    payment_at: order.payment_at
                }))
        );

        res.status(200).json(flattenedCartItems);
    } catch (error) {
        next(error);
    }
};