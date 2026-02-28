"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ChevronRight, Tag } from 'lucide-react';
import Link from 'next/link';

const CartPage = () => {
    // Sample cart data
    const [cartItems, setCartItems] = useState([
        { _id: '1', name: 'VyaparVault Pro Toilet Cleaner (500ml)', price: 199, qty: 2, image: '/images/product1.jpg' },
        { _id: '2', name: 'VyaparVault Floor Disinfectant (1L)', price: 149, qty: 1, image: '/images/product2.jpg' },
    ]);

    const updateQty = (id: string, delta: number) => {
        setCartItems(items => items.map(item =>
            item._id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        ));
    };

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item._id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shipping = subtotal > 499 ? 0 : 49;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    return (
        <main className="min-h-screen pt-24 bg-transparent">
            <motion.section
                className="max-w-7xl mx-auto px-6 py-12 overflow-hidden"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Cart Items */}
                    <div className="flex-1 space-y-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl font-black text-brand-dark tracking-tighter">My <span className="text-brand-primary">Cart ({cartItems.length})</span></h1>
                            <Link href="/shop" className="text-brand-primary font-bold text-sm underline underline-offset-4 hover:text-brand-dark transition-colors">Continue Shopping</Link>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="bg-[#111] border border-zinc-800 p-12 rounded-[40px] shadow-[0_0_20px_rgba(255,255,255,0.05)] text-center flex flex-col items-center gap-6">
                                <div className="bg-zinc-800/50 p-8 rounded-full"><ShoppingCart className="text-[#ffffff] w-12 h-12" /></div>
                                <h2 className="text-2xl font-black text-[#ffffff]">Your cart is empty</h2>
                                <p className="text-[#aaaaaa] font-medium">Looks like you haven't added anything to your cart yet.</p>
                                <Link href="/shop" className="bg-white text-black px-8 py-4 rounded-full font-black mt-4 hover:scale-105 active:scale-95 transition-all">START SHOPPING</Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-[#111] p-6 md:p-8 rounded-[40px] shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-zinc-800 flex flex-col md:flex-row items-center gap-8 group"
                                    >
                                        <div className="w-32 h-32 bg-zinc-800/20 rounded-3xl flex items-center justify-center p-4 relative overflow-hidden">
                                            <div className="text-[#ffffff]/20 font-black text-4xl select-none italic tracking-tighter">VV</div>
                                            <div className="absolute inset-0 border-2 border-[#ffffff]/10 rounded-3xl group-hover:border-[#ffffff]/30 transition-all" />
                                        </div>

                                        <div className="flex-1 space-y-2 text-center md:text-left">
                                            <h3 className="text-xl font-black text-[#ffffff] leading-tight">{item.name}</h3>
                                            <p className="text-sm font-bold text-green-400 italic">Clinical Grade Protection</p>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full md:w-auto">
                                            {/* Quantity Control */}
                                            <div className="flex items-center bg-zinc-800/50 p-2 rounded-2xl gap-4 border border-zinc-700">
                                                <button onClick={() => updateQty(item._id, -1)} className="p-2 bg-[#222] text-white rounded-xl shadow-sm hover:bg-[#333] transition-all"><Minus className="w-4 h-4" /></button>
                                                <span className="font-black text-[#ffffff] w-6 text-center">{item.qty}</span>
                                                <button onClick={() => updateQty(item._id, 1)} className="p-2 bg-[#222] text-white rounded-xl shadow-sm hover:bg-[#333] transition-all"><Plus className="w-4 h-4" /></button>
                                            </div>

                                            <div className="text-center md:text-right min-w-[100px]">
                                                <p className="text-2xl font-black text-[#ffffff]">₹{item.price * item.qty}</p>
                                                <p className="text-[10px] font-bold text-[#aaaaaa] uppercase tracking-widest">₹{item.price} / unit</p>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item._id)}
                                                className="p-4 text-red-400 hover:text-white hover:bg-red-500 rounded-2xl transition-all"
                                            >
                                                <Trash2 className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <div className="bg-[#111] border border-zinc-800 p-8 rounded-[40px] shadow-[0_0_20px_rgba(255,255,255,0.05)] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-zinc-800/50 rounded-3xl"><Truck className="w-8 h-8 text-[#ffffff]" /></div>
                                <div>
                                    <h4 className="text-xl font-black tracking-tighter uppercase italic text-[#ffffff]">Free Delivery</h4>
                                    <p className="text-sm font-medium text-[#aaaaaa]">Add ₹{Math.max(0, 500 - subtotal)} more for free shipping</p>
                                </div>
                            </div>
                            <div className="w-full md:w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                                    className="h-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-[#111] p-8 rounded-[40px] shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-zinc-800 space-y-8">
                                <h3 className="text-2xl font-black text-[#ffffff] tracking-tighter uppercase">Order <span className="text-zinc-500 italic">Summary</span></h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm font-bold text-[#aaaaaa]">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold text-[#aaaaaa]">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? "text-green-500 font-black uppercase text-[10px]" : ""}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold text-[#aaaaaa]">
                                        <span>Estimated Tax (GST 18%)</span>
                                        <span>₹{tax}</span>
                                    </div>
                                    <div className="pt-6 border-t border-zinc-800 flex justify-between items-center">
                                        <span className="text-xl font-black text-[#ffffff]">Total</span>
                                        <div className="text-right">
                                            <span className="text-4xl font-black text-[#ffffff] tracking-tighter italic">₹{total}</span>
                                            <p className="text-[10px] font-bold text-[#aaaaaa] uppercase tracking-widest mt-1">INC. ALL TAXES</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Coupon */}
                                <div className="bg-[#1a1a1a] p-4 rounded-3xl border border-zinc-800 flex items-center gap-4">
                                    <Tag className="text-[#ffffff] w-5 h-5" />
                                    <input type="text" placeholder="Promo code" className="bg-transparent flex-1 text-[#ffffff] text-sm font-bold outline-none uppercase placeholder:capitalize" />
                                    <button className="text-[#ffffff] font-black text-[10px] uppercase tracking-widest hover:text-green-400 focus:text-green-400">Apply</button>
                                </div>

                                <Link href="/checkout" className="w-full bg-white text-black flex items-center justify-center gap-3 py-6 rounded-[32px] font-black text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all group">
                                    PROCEED TO CHECKOUT <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-all" />
                                </Link>

                                <div className="flex flex-col items-center gap-4 pt-4">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-[#aaaaaa] uppercase tracking-widest">
                                        <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Checkout Powered by Razorpay
                                    </div>
                                    <div className="flex gap-4 grayscale opacity-30">
                                        <img src="https://img.icons8.com/color/48/ffffff/visa.png" className="h-4" alt="Visa" />
                                        <img src="https://img.icons8.com/color/48/ffffff/google-pay.png" className="h-4" alt="GPay" />
                                        <img src="https://img.icons8.com/color/48/ffffff/upi.png" className="h-4" alt="UPI" />
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="bg-[#111] p-8 border border-zinc-800 rounded-[40px] text-white flex items-center gap-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                <div className="p-4 bg-zinc-800/50 rounded-3xl"><ShieldCheck className="w-10 h-10 text-green-500" /></div>
                                <div>
                                    <h4 className="font-black text-lg text-[#ffffff]">Satisfaction Guarantee</h4>
                                    <p className="text-xs font-medium text-[#aaaaaa]">100% Quality Assurance on all orders.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </main>
    );
};

export default CartPage;
