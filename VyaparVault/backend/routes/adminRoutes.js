const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const supabase = require('../utils/supabaseClient');

// GET /api/admin/overview
router.get('/overview', protect, admin, async (req, res) => {
    try {
        // Orders
        const { data: orders = [], error: oErr } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(100);
        if (oErr) throw oErr;

        const totalRevenue = (orders || []).reduce((s, o) => s + (Number(o.total_price) || 0), 0);
        const activeOrders = (orders || []).filter(o => o.order_status !== 'Delivered').length;

        // Products
        const { data: products = [], error: pErr } = await supabase.from('products').select('*').limit(1000);
        if (pErr) throw pErr;
        const inventoryStock = (products || []).reduce((s, p) => s + (Number(p.stock) || 0), 0);
        const bulkInquiries = (products || []).filter(p => (p.category || '').toLowerCase().includes('kit')).length;

        res.json({ totalRevenue, activeOrders, bulkInquiries, inventoryStock });
    } catch (err) {
        console.error(err && err.stack ? err.stack : err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/admin/orders
router.get('/orders', protect, admin, async (req, res) => {
    try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(50);
        if (error) throw error;
        res.json(data || []);
    } catch (err) {
        console.error(err && err.stack ? err.stack : err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/admin/products
router.get('/products', protect, admin, async (req, res) => {
    try {
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false }).limit(100);
        if (error) throw error;
        res.json(data || []);
    } catch (err) {
        console.error(err && err.stack ? err.stack : err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/admin/users
router.get('/users', protect, admin, async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('id, username, email, role, created_at').order('created_at', { ascending: false }).limit(200);
        if (error) throw error;
        res.json(data || []);
    } catch (err) {
        console.error(err && err.stack ? err.stack : err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
