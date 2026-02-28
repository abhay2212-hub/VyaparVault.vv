const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discountPercent: { type: Number },
    category: { type: String, required: true },
    images: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 4.5 },
    numReviews: { type: Number, default: 0 },
    brand: { type: String, default: 'VyaparVault' },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isMostSelling: { type: Boolean, default: false },
    bulkPricing: [{
        quantity: { type: Number },
        pricePerUnit: { type: Number }
    }],
    specifications: [{
        label: { type: String },
        value: { type: String }
    }],
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
