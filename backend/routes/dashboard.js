const express = require("express");
const orderController = require("../controllers/orders");
const vendorController = require("../controllers/vendors");
const parentController = require("../controllers/parents");
const router = express.Router();

router.post('/vendors', vendorController.createVendor);
router.get('/vendors', vendorController.getVendors);
router.get('/vendors/:vendorId', vendorController.getVendorById);

router.get('/parents', parentController.getAllParentProducts);
router.post('/parents', parentController.createParentProduct);
router.get('/parents/:vendorId', parentController.getParentProductsByVendor);

router.get('/orders', orderController.getAllOrders);
router.get('/orders/product/:productId', orderController.getCartItemsByProductId);
router.get('/orders/vendor/:vendorId', orderController.getCartItemsByVendor);
router.get('/orders/:year', orderController.getOrdersInYear);
router.get('/orders/:vendorId/:year', orderController.getCartItemsByVendorAndYear);
router.get('/orders/:vendorId/:year/:month', orderController.getCartItemsByVendorAndMonth);

module.exports = router;
