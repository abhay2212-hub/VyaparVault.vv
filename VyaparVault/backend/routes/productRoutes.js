const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc Get all products
// @route GET /api/products
router.get('/', async (req, res) => {
    try {
        const pageSize = 12;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword || '';

        const count = await productService.countDocuments({ name: keyword });
        const products = await productService.list({ keyword, page, pageSize });

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Get single product
// @route GET /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await productService.getById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Delete product
// @route DELETE /api/products/:id
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await productService.getById(req.params.id);
        if (product) {
            await productService.deleteById(req.params.id);
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Create product
// @route POST /api/products
router.post('/', protect, admin, async (req, res) => {
    try {
        const createdProduct = await productService.createSample(req.user._id);
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Update product
// @route PUT /api/products/:id
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { name, price, description, images, brand, category, stock, isFeatured, isMostSelling, bulkPricing } = req.body;
        const product = await productService.getById(req.params.id);

        if (product) {
            const updatedProduct = await productService.updateById(req.params.id, { name, price, description, images, brand, category, stock, isFeatured, isMostSelling, bulkPricing });
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
