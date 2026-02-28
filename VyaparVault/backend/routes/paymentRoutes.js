const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../middleware/authMiddleware');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc Create Razorpay Order
// @route POST /api/payments/razorpay
router.post('/razorpay', protect, async (req, res) => {
    try {
        const { amount, currency = "INR" } = req.body;

        const options = {
            amount: Math.round(amount * 100), // amount in smallest currency unit
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await instance.orders.create(options);

        if (!razorpayOrder) {
            return res.status(500).json({ message: "Failed to create Razorpay order" });
        }

        res.json(razorpayOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Verify Razorpay Payment
// @route POST /api/payments/verify
router.post('/verify', protect, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            res.json({ message: "Payment Verified Successfully", success: true });
        } else {
            res.status(400).json({ message: "Invalid Signature", success: false });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
