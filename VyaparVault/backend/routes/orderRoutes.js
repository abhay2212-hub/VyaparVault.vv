const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc Create new order
// @route POST /api/orders
router.post('/', protect, async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' });
            return;
        } else {
            const createdOrder = await orderService.createOrder({ orderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice });
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Get order by ID
// @route GET /api/orders/:id
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await orderService.getById(req.params.id);

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Update order status to paid
// @route PUT /api/orders/:id/pay
router.put('/:id/pay', protect, async (req, res) => {
    try {
        const updatedOrder = await orderService.updatePayment(req.params.id, { id: req.body.id, status: req.body.status, update_time: req.body.update_time, email_address: req.body.email_address, razorpayPaymentId: req.body.razorpayPaymentId });
        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await orderService.getByUser(req.user._id);
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Get all orders (Admin)
// @route GET /api/orders
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await orderService.getAll();
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Update order status to delivered
// @route PUT /api/orders/:id/deliver
router.put('/:id/deliver', protect, admin, async (req, res) => {
    try {
        const updatedOrder = await orderService.updateDeliver(req.params.id);
        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
