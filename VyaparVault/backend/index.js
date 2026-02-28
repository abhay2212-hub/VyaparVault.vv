require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const supabase = require('./utils/supabaseClient');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.PRODUCTION_CORS ? process.env.PRODUCTION_CORS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.warn('Supabase not configured. Set SUPABASE_URL and SUPABASE_KEY in .env');
} else {
    console.log('Using Supabase as the primary database');
}

// Routes (Placeholder)
app.get('/', (req, res) => {
    res.send('VyaparVault API is Running...');
});

// Import Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Debug: list registered routes
if (app._router) {
    console.log('Registered routes:');
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
            const methods = Object.keys(r.route.methods).join(',').toUpperCase();
            console.log(`${methods} ${r.route.path}`);
        } else if (r.name === 'router' && r.regexp) {
            console.log('Mounted router:', r.regexp);
        }
    });
}

// expose debug routes list
app.get('/debug/routes', (req, res) => {
    if (!app._router) return res.json([]);
    const routes = [];
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
            routes.push({ path: r.route.path, methods: Object.keys(r.route.methods) });
        } else if (r.name === 'router' && r.regexp) {
            routes.push({ mounted: String(r.regexp) });
        }
    });
    res.json(routes);
});

// Serving Static Files for Frontend (Compatibility for Aqua Host / Single Domain)
if (process.env.SERVE_FRONTEND === 'true') {
    const frontendPath = path.join(__dirname, 'public');
    app.use(express.static(frontendPath));
    app.use(express.static(path.join(frontendPath, 'out'))); // if uploaded as 'out'

    // Handle SPA routing - send all non-api requests to index.html
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api/')) {
            res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
                if (err) {
                    res.sendFile(path.join(frontendPath, 'out', 'index.html'), (err2) => {
                        if (err2) res.status(404).send("Frontend not found. Ensure frontend/out is copied to backend/public");
                    });
                }
            });
        }
    });
}

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
