"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, ShoppingBag, Users, BarChart3, Settings, Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, Filter, TrendingUp, TrendingDown, Package, CreditCard, Clock, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    React.useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('vv_token') : null;
        if (!token) setShowLogin(true);
    }, []);

    const doLogin = async () => {
        setLoading(true);
        setAuthError(null);
        try {
            const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${base}/api/auth/admin-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                throw new Error(j.message || `Login failed (${res.status})`);
            }
            const json = await res.json();
            localStorage.setItem('vv_token', json.token);
            setShowLogin(false);
        } catch (err: any) {
            setAuthError(err.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    const doLogout = () => {
        localStorage.removeItem('vv_token');
        setShowLogin(true);
    };

    const sidebarItems = [
        { id: 'overview', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview' },
        { id: 'orders', icon: <ShoppingBag className="w-5 h-5" />, label: 'Manage Orders' },
        { id: 'products', icon: <Package className="w-5 h-5" />, label: 'Inventory' },
        { id: 'customers', icon: <Users className="w-5 h-5" />, label: 'Customers' },
        { id: 'analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
    ];

    const recentOrders = [
        // placeholder until fetched
    ];

    const [overview, setOverview] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [productForm, setProductForm] = useState<any>({ name: '', price: 0, original_price: 0, discount_percent: 0, stock: 0, category: '', description: '', image: '', file: null });

    // normalize order for UI display
    const normalizeOrder = (o: any) => {
        const id = o.id || o.orderId || o._id || String(o.order_id || o.id || '')
        const customer = (o.userInfo && (o.userInfo.username || o.userInfo.email)) || o.customer || o.customer_name || o.user || (o.email) || 'Guest';
        const totalRaw = o.total_price ?? o.totalPrice ?? o.total ?? o.amount ?? 0;
        const total = typeof totalRaw === 'number' ? totalRaw : Number(totalRaw || 0);
        const created = o.created_at || o.createdAt || o.created || o.date || null;
        const date = created ? new Date(created).toLocaleString() : '—';
        const status = o.orderStatus || o.order_status || o.status || (o.isDelivered ? 'Delivered' : 'Processing');
        return { id, customer, total, date, status, raw: o };
    }

    React.useEffect(() => {
        if (showLogin) return;
        const loadAdmin = async () => {
            try {
                const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const token = typeof window !== 'undefined' ? localStorage.getItem('vv_token') : null;
                const headers: any = { 'Content-Type': 'application/json' };
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const [ovRes, orRes, prRes, usRes] = await Promise.all([
                    fetch(`${base}/api/admin/overview`, { headers }),
                    fetch(`${base}/api/admin/orders`, { headers }),
                    fetch(`${base}/api/admin/products`, { headers }),
                    fetch(`${base}/api/admin/users`, { headers })
                ]);

                if (ovRes.ok) setOverview(await ovRes.json());
                if (orRes.ok) setOrders(await orRes.json());
                if (prRes.ok) setProducts(await prRes.json());
                if (usRes.ok) setUsers(await usRes.json());
            } catch (err) {
                console.error('Failed to load admin data', err);
            }
        };
        loadAdmin();
    }, [showLogin]);

    const openAddProduct = () => {
        setEditingProduct(null);
        setProductForm({ name: '', price: 0, original_price: 0, discount_percent: 0, stock: 0, category: '', description: '', image: '', file: null });
        setShowProductModal(true);
    };

    const openEditProduct = (p: any) => {
        setEditingProduct(p);
        setProductForm({
            name: p.name || '',
            price: p.price || 0,
            original_price: p.original_price || p.originalPrice || 0,
            discount_percent: p.discount_percent || p.discountPercent || 0,
            stock: p.stock || 0,
            category: p.category || '',
            description: p.description || '',
            image: (p.images && p.images[0]) || p.image || '',
            file: null
        });
        setShowProductModal(true);
    };

    const saveProduct = async () => {
        try {
            setLoading(true);
            const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = typeof window !== 'undefined' ? localStorage.getItem('vv_token') : null;
            const headers: any = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            // upload file if provided
            let imageUrl = productForm.image || '';
            if (productForm.file) {
                const fd = new FormData();
                fd.append('image', productForm.file);
                const upRes = await fetch(`${base}/api/upload/image`, { method: 'POST', body: fd });
                if (!upRes.ok) {
                    const e = await upRes.json().catch(() => ({}));
                    throw new Error(e.message || 'Image upload failed');
                }
                const upJson = await upRes.json();
                imageUrl = upJson.url || upJson.secure_url || '';
            }

            const payload = {
                name: productForm.name,
                price: productForm.price,
                original_price: productForm.original_price,
                discount_percent: productForm.discount_percent,
                description: productForm.description,
                images: imageUrl ? [imageUrl] : [],
                brand: '',
                category: productForm.category,
                stock: productForm.stock
            };

            if (!editingProduct) {
                const createRes = await fetch(`${base}/api/products`, { method: 'POST', headers });
                if (!createRes.ok) throw new Error('Failed to create product');
                const created = await createRes.json();
                const id = created.id || created.ID || created.id;
                const updRes = await fetch(`${base}/api/products/${id}`, { method: 'PUT', headers, body: JSON.stringify(payload) });
                if (!updRes.ok) throw new Error('Failed to update new product');
            } else {
                const id = editingProduct.id || editingProduct.ID || editingProduct.id;
                const updRes = await fetch(`${base}/api/products/${id}`, { method: 'PUT', headers, body: JSON.stringify(payload) });
                if (!updRes.ok) throw new Error('Failed to update product');
            }

            // reload products
            const prRes = await fetch(`${base}/api/admin/products`, { headers });
            if (prRes.ok) setProducts(await prRes.json());
            setShowProductModal(false);
        } catch (err: any) {
            console.error(err);
            alert(err.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    if (showLogin) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[40px] p-12 w-full max-w-md shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                    <div className="flex justify-center mb-10">
                        <div className="bg-white/10 p-4 rounded-[24px] border border-white/30">
                            <Package className="text-white w-10 h-10" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-center mb-2 !text-white italic tracking-tighter uppercase">Admin Access</h3>
                    <p className="text-white/60 text-center text-[10px] font-bold uppercase tracking-widest mb-10">Secure Gateway for VyaparVault</p>

                    {authError && (
                        <div className="bg-red-500/20 border border-red-500/30 !text-white text-xs p-4 rounded-xl mb-6 flex items-center gap-3">
                            <XCircle className="w-4 h-4 text-red-400" />
                            {authError}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/70 ml-1">Email Address</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@vyaparvault.com"
                                className="w-full bg-white/5 border border-white/20 rounded-xl py-4 px-5 !text-white placeholder:text-white/30 outline-none focus:border-white/50 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/70 ml-1">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                type="password"
                                className="w-full bg-white/5 border border-white/20 rounded-xl py-4 px-5 !text-white placeholder:text-white/30 outline-none focus:border-white/50 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <button
                        onClick={doLogin}
                        disabled={loading}
                        className="w-full mt-10 py-5 bg-white text-black font-black text-[12px] uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                    >
                        {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
                    </button>

                    <button
                        onClick={() => setShowLogin(false)}
                        className="w-full mt-6 py-2 text-white/50 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all"
                    >
                        Back to Website
                    </button>
                </div>
            </div>
        );
    }
    return (
        <main className="min-h-screen pt-24 bg-transparent flex flex-col lg:flex-row">
            {/* Product Modal */}
            {showProductModal && (
                <div onClick={(e) => { if (e.target === e.currentTarget) setShowProductModal(false); }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md">
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 w-full max-w-2xl relative shadow-[0_0_80px_rgba(255,255,255,0.05)]">
                        <button onClick={() => setShowProductModal(false)} aria-label="Close" className="absolute right-8 top-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all border border-white/20">✕</button>
                        <h3 className="text-3xl font-bold mb-8 text-white">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Product Name</label>
                                <input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/40 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Price (₹)</label>
                                <input value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })} type="number" className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/40 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Original Price (₹)</label>
                                <input value={productForm.original_price} onChange={(e) => setProductForm({ ...productForm, original_price: Number(e.target.value) })} type="number" className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/40 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Stock</label>
                                <input value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })} type="number" className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/40 transition-all" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Category</label>
                                <input value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/40 transition-all" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Image Preview</label>
                                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center gap-4">
                                    {(productForm.image || productForm.file) ? (
                                        <img src={productForm.file ? URL.createObjectURL(productForm.file) : productForm.image} alt="preview" className="h-32 object-contain" />
                                    ) : (
                                        <div className="h-32 w-32 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center text-white/20">
                                            <Plus className="w-8 h-8" />
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" onChange={(e: any) => setProductForm({ ...productForm, file: e.target.files && e.target.files[0] || null })} className="text-xs text-white/40" />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Description</label>
                                <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} rows={4} className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/40 transition-all resize-none" />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-6 mt-10">
                            <button onClick={() => setShowProductModal(false)} className="text-white/40 font-bold hover:text-white transition-all uppercase text-xs tracking-widest">CANCEL</button>
                            <button onClick={saveProduct} className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">SAVE PRODUCT</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Sidebar */}
            <aside className="w-full lg:w-72 bg-transparent border-r border-white/10 p-8 space-y-12">
                <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-xl border border-white/20"><Package className="text-white w-5 h-5" /></div>
                    <span className="text-xl font-black text-white tracking-tighter uppercase">Admin Panel</span>
                </div>

                <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all",
                                activeTab === item.id ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] translate-x-2" : "text-white/40 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-24 space-y-6 border-t border-white/10">
                    <button onClick={doLogout} className="flex items-center gap-4 text-zinc-400 font-bold hover:text-red-500 transition-all px-6">
                        <XCircle className="w-5 h-5" /> Logout
                    </button>
                </div>
            </aside>

            {/* Dashboard Content */}
            <section className="flex-1 p-8 md:p-12 space-y-12 overflow-y-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Dashboard <span className="text-white/40 font-medium">/ {activeTab}</span></h2>
                        <p className="text-sm font-medium text-white/50">Managing VyaparVault corporate hygiene solutions.</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors w-4 h-4" />
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 font-medium text-sm outline-none focus:border-white/40 transition-all text-white placeholder:text-white/20" placeholder="Search orders..." />
                        </div>
                        <button onClick={openAddProduct} className="bg-white text-black p-4 rounded-2xl shadow-xl hover:scale-105 transition-all"><Plus className="w-5 h-5" /></button>
                    </div>
                </header>

                {/* Stats Grid */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {overview ? (
                            [
                                { label: 'Total Revenue', value: `₹${overview.totalRevenue.toFixed(2)}`, icon: <TrendingUp className="text-white w-5 h-5" />, bg: 'bg-white/10' },
                                { label: 'Orders', value: `${overview.activeOrders}`, icon: <Package className="text-white w-5 h-5" />, bg: 'bg-white/10' },
                                { label: 'Bulk Leads', value: `${overview.bulkInquiries}`, icon: <Users className="text-white w-5 h-5" />, bg: 'bg-white/10' },
                                { label: 'Stock Units', value: `${overview.inventoryStock}`, icon: <BarChart3 className="text-white w-5 h-5" />, bg: 'bg-white/10' }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white/5 backdrop-blur-lg p-8 rounded-[32px] border border-white/10 space-y-4 hover:border-white/30 transition-all group">
                                    <div className={`p-3 bg-white/10 rounded-xl inline-block border border-white/10`}>{stat.icon}</div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-white/50 tracking-widest mb-1">{stat.label}</p>
                                        <h3 className="text-2xl font-bold text-white tabular-nums tracking-tight">{stat.value}</h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-4 text-white/40 text-sm animate-pulse font-bold tracking-widest uppercase">Initializing dashboard metrics...</div>
                        )}
                    </div>
                )}

                {/* Table: Recent Transactions */}
                {activeTab === 'overview' && (
                    <div className="bg-white/5 backdrop-blur-md rounded-[40px] border border-white/10 p-10 overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-bold text-white tracking-tight uppercase flex items-center gap-4">
                                Recent Transactions
                                <span className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest text-white/50 border border-white/10">REAL-TIME</span>
                            </h3>
                            <button className="text-xs font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest">View Records</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-[10px] font-bold uppercase text-white/60 tracking-widest border-b border-white/10">
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {(orders || []).slice(0, 10).map((order, idx) => {
                                        const no = normalizeOrder(order);
                                        return (
                                            <tr key={idx} className="group hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-6 font-bold text-white text-xs tabular-nums">#{no.id.slice(-8)}</td>
                                                <td className="px-6 py-6 font-medium text-white text-sm">{no.customer}</td>
                                                <td className="px-6 py-6 font-bold text-white text-sm">₹{no.total}</td>
                                                <td className="px-6 py-6 text-xs text-white/40">{no.date}</td>
                                                <td className="px-6 py-6">
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider",
                                                        no.status === 'Delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                            no.status === 'Processing' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                                                'bg-white/10 text-white/60 border border-white/10'
                                                    )}>
                                                        {no.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <button className="p-2 hover:bg-white hover:text-black rounded-lg transition-all text-white"><Edit2 className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="bg-white/5 backdrop-blur-md rounded-[30px] border border-white/10 p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Order Management</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-[10px] font-bold uppercase text-white/40 tracking-widest border-b border-white/10">
                                        <th className="px-6 py-4">Order ID</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {(orders || []).map((order, idx) => {
                                        const no = normalizeOrder(order);
                                        return (
                                            <tr key={idx} className="group hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-6 font-bold text-white text-xs">#{no.id}</td>
                                                <td className="px-6 py-6 font-medium text-white/80 text-sm">{no.customer}</td>
                                                <td className="px-6 py-6 font-bold text-white text-sm">₹{no.total}</td>
                                                <td className="px-6 py-6 text-xs text-white/40">{no.date}</td>
                                                <td className="px-6 py-6">
                                                    <span className="text-[10px] font-bold uppercase px-3 py-1 bg-white/10 border border-white/20 rounded text-white">{no.status}</span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="bg-white/5 backdrop-blur-md rounded-[30px] border border-white/10 p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Product Inventory</h3>
                            <button onClick={openAddProduct} className="px-6 py-2 bg-white text-black font-bold rounded-xl text-xs uppercase tracking-widest transition-all">Add New Item</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-[10px] font-bold uppercase text-white/40 tracking-widest border-b border-white/10">
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {(products || []).map((p, idx) => (
                                        <tr key={idx} className="group hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-6 font-bold text-white text-sm">{p.name}</td>
                                            <td className="px-6 py-6 font-bold text-white text-sm">₹{p.price}</td>
                                            <td className="px-6 py-6 text-sm text-white/60 tabular-nums">{p.stock}</td>
                                            <td className="px-6 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => openEditProduct(p)} className="p-2 hover:bg-white hover:text-black rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Secondary Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
                    <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 relative overflow-hidden">
                        <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-8">Monthly Performance</h4>
                        <div className="h-48 flex items-end gap-3 border-b border-white/10 pb-4">
                            {(() => {
                                const now = new Date();
                                const months: { label: string; total: number }[] = [];
                                for (let i = 5; i >= 0; i--) {
                                    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                                    months.push({ label: d.toLocaleString(undefined, { month: 'short' }), total: 0 });
                                }
                                (orders || []).forEach((o) => {
                                    const no = normalizeOrder(o);
                                    const dt = new Date(o.created_at || o.createdAt || o.created || o.date || null);
                                    if (isNaN(dt.getTime())) return;
                                    const idx = months.findIndex(m => m.label === dt.toLocaleString(undefined, { month: 'short' }));
                                    if (idx >= 0) months[idx].total += no.total;
                                });
                                const max = Math.max(...months.map(m => m.total), 1);
                                return months.map((m, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                        <div className="w-full bg-white/10 rounded-lg relative overflow-hidden min-h-[4px]" style={{ height: `${(m.total / max) * 100}%` }}>
                                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <span className="text-[10px] font-bold text-white/20 uppercase tabular-nums">{m.label}</span>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase">Operational Queue</h4>
                            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-[8px] font-bold uppercase border border-red-500/30">Pending</span>
                        </div>
                        <div className="space-y-4">
                            {(() => {
                                const pending = (orders || []).map(normalizeOrder).filter(o => o.status !== 'Delivered').slice(0, 3);
                                if (pending.length === 0) return <div className="text-white/20 text-xs py-8 text-center border-2 border-dashed border-white/10 rounded-3xl font-bold uppercase tracking-widest">All systems go. No pending tasks.</div>;
                                return pending.map((task, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-white/30 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-5">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all text-white"><Clock className="w-5 h-5" /></div>
                                            <div>
                                                <h5 className="text-sm font-bold text-white">#{task.id.slice(-6)} - {task.customer}</h5>
                                                <p className="text-[10px] font-medium text-white/40">{task.date}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="text-white w-5 h-5" />
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdminDashboard;
