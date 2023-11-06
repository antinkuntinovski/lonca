const mongoose = require('mongoose');

const parentProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor', // Reference to the 'Vendor' model
    },
    // Add other fields as needed
});

module.exports = mongoose.model('ParentProduct', parentProductSchema);
