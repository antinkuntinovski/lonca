const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    cart_item: [
        {
            product: {
                $oid: String,
            },
            series: String,
            item_count: Number,
            quantity: Number,
            cogs: Number,
            price: Number,
            vendor_margin: Number,
            order_status: String,
        }
    ],
    payment_at: Date,
});

module.exports = mongoose.model('Order', orderSchema);
