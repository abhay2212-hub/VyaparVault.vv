"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, Zap, Truck, CheckCircle2, Minus, Plus, ChevronRight, Heart, Share2, Info, LayoutList } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ProductDetailPage = () => {
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const product = {
        name: 'VyaparVault Pro Toilet Cleaner',
        price: 199,
        originalPrice: 249,
        discountPercent: 20,
        rating: 4.8,
        numReviews: 450,
        description: 'The VyaparVault Pro Toilet Cleaner is a hospital-grade disinfectant specifically formulated to eliminate 99.9% of germs while providing a long-lasting blue-water shine. Its thick liquid formula adheres to surfaces for maximum contact time and easy stain removal.',
        keyFeatures: [
            'Laboratory Certified: Kills 99.9% Germs',
            'Advanced Blue-Water Guard Protection',
            'Fresh Oceanic Aroma for 24-hour freshness',
            'Safe for all types of ceramic and porcelain bowls',
            'Eco-friendly formula, biodegradable surfactants'
        ],
        specifications: [
            { label: 'Bottle Size', value: '500 ml' },
            { label: 'Form', value: 'Concentrated Liquid' },
            { label: 'Scent', value: 'Oceanic Fresh' },
            { label: 'pH Level', value: 'Balanced Sanitizer' },
            { label: 'Expiry', value: '24 Months from PKD' }
        ],
        bulkTiers: [
            { qty: '20+ units', price: '₹149' },
            { qty: '100+ units', price: '₹129' },
            { qty: '500+ units', price: '₹99' }
        ]
    };

    const PackageIcon = ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="m12 12.5 7.7-4.4" /><path d="m7.3 5.3 4.7 2.7" /></svg>
    );

    return (
        <main className="min-h-screen pt-24 bg-brand-light/10">
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Image Preview Container */}
                    <div className="flex-1 space-y-8">
                        <div className="bg-white p-12 rounded-[60px] shadow-2xl relative border-8 border-brand-primary/5 overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/10 rounded-full transform translate-x-24 -translate-y-24 group-hover:scale-150 transition-transform duration-1000" />
                            <div className="aspect-[4/5] bg-brand-light/30 rounded-[40px] flex items-center justify-center p-20 relative">
                                <span className="text-brand-primary/10 font-black text-[120px] italic tracking-tighter select-none rotate-12">VV</span>
                                <div className="absolute inset-x-20 inset-y-20 bg-white shadow-2xl rounded-[32px] border-4 border-brand-primary/10 flex items-center justify-center p-8 group-hover:rotate-3 transition-transform">
                                    <div className="text-center">
                                        <PackageIcon className="w-24 h-24 text-brand-primary/20 mx-auto mb-4" />
                                        <span className="text-xs font-black text-brand-dark/30 uppercase tracking-[10px] ml-[10px]">PREMIUM</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-10 right-10 bg-brand-dark text-white p-6 rounded-3xl shadow-2xl flex items-center gap-4 border-4 border-white rotate-6">
                                    <h5 className="text-4xl font-black italic tracking-tighter">99.9%</h5>
                                    <div><p className="text-[10px] font-bold uppercase tracking-widest text-white/50 leading-none">Protection</p><p className="text-xs font-black uppercase">CERTIFIED</p></div>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4">
                            {[1, 2, 3].map((i) => (
                                <button key={i} className="flex-1 aspect-square bg-white rounded-3xl border-4 border-brand-primary/5 shadow-lg flex items-center justify-center p-4 hover:border-brand-primary transition-all">
                                    <div className="text-brand-primary font-black text-xl italic opacity-20">V{i}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Summary */}
                    <div className="flex-1 space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="bg-brand-dark text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">HOT SELLER</span>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current text-zinc-800" />)}
                                    <span className="text-[10px] font-bold text-gray-400 ml-2">(450+ Verified Reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-5xl font-black text-brand-dark tracking-tighter italic leading-none">{product.name}</h1>
                            <p className="text-lg font-medium text-gray-500 max-w-lg">{product.description}</p>
                        </div>

                        <div className="flex items-center gap-6 p-8 bg-brand-primary text-white rounded-[40px] shadow-2xl border-4 border-white">
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Limited Offer Price</p>
                                <div className="flex items-end gap-3">
                                    <span className="text-5xl font-black italic tracking-tighter leading-none">₹{product.price}</span>
                                    <span className="text-lg font-bold text-white/40 line-through mb-1">₹{product.originalPrice}</span>
                                </div>
                            </div>
                            <div className="h-12 w-px bg-white/10 mx-2" />
                            <div className="bg-brand-accent text-white px-5 py-2 rounded-2xl font-black text-xs shadow-xl rotate-3">
                                {product.discountPercent}% OFF
                            </div>
                        </div>

                        {/* Bulk Pricing Cards */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Save with Bulk Orders</h4>
                            <div className="grid grid-cols-3 gap-3">
                                {product.bulkTiers.map((tier, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-3xl border border-brand-light shadow-md hover:border-brand-primary transition-all cursor-pointer group text-center">
                                        <p className="text-[8px] font-bold text-gray-400 uppercase group-hover:text-brand-primary">{tier.qty}</p>
                                        <p className="text-xl font-black text-brand-dark tracking-tighter group-hover:text-brand-primary">{tier.price}</p>
                                        <p className="text-[8px] font-black text-zinc-500 mt-1 uppercase">Wholesale</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            {/* Quantity */}
                            <div className="flex items-center bg-white p-2 rounded-3xl shadow-xl border border-brand-light gap-4 w-full sm:w-auto">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-4 bg-brand-light rounded-2xl hover:bg-brand-primary hover:text-white transition-all"><Minus className="w-5 h-5" /></button>
                                <span className="font-black text-2xl text-brand-dark w-12 text-center">{qty}</span>
                                <button onClick={() => setQty(q => q + 1)} className="p-4 bg-brand-light rounded-2xl hover:bg-brand-primary hover:text-white transition-all"><Plus className="w-5 h-5" /></button>
                            </div>

                            <button className="flex-1 btn-primary py-6 text-xl tracking-widest flex items-center justify-center gap-4 shadow-brand-primary/50 group active:scale-95">
                                ADD TO CART <ShoppingCart className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-white p-5 rounded-[24px] shadow-lg border border-brand-light font-black text-brand-primary text-xs flex items-center justify-center gap-3 hover:bg-brand-primary hover:text-white transition-all group">
                                <Heart className="w-4 h-4 group-hover:fill-red-500 group-hover:stroke-red-500 transition-colors" /> WISHLIST
                            </button>
                            <button className="bg-white p-5 rounded-[24px] shadow-lg border border-brand-light font-black text-brand-primary text-xs flex items-center justify-center gap-3 hover:bg-brand-dark hover:text-white transition-all group">
                                <Share2 className="w-4 h-4" /> SHARE
                            </button>
                        </div>

                        {/* USP Badges */}
                        <div className="pt-10 border-t border-brand-light grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-brand-light/50 rounded-2xl text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all"><Truck className="w-5 h-5" /></div>
                                <div><p className="text-xs font-black text-brand-dark">FREE DELIVERY</p><p className="text-[8px] font-bold text-gray-400 capitalize">In Above ₹499 Cart Value</p></div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-brand-light/50 rounded-2xl text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all"><ShieldCheck className="w-5 h-5" /></div>
                                <div><p className="text-xs font-black text-brand-dark">SAFE PACKAGING</p><p className="text-[8px] font-bold text-gray-400 capitalize">Industrial Double-Seal Tech</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs / Detailed Content */}
                <div className="mt-32 space-y-12">
                    <div className="flex items-center justify-center gap-8 border-b-2 border-brand-light pb-4">
                        {[
                            { id: 'description', label: 'Detailed Description', icon: <Info className="w-4 h-4" /> },
                            { id: 'specs', label: 'Specifications', icon: <LayoutList className="w-4 h-4" /> },
                            { id: 'reviews', label: 'Customer Reviews', icon: <Star className="w-4 h-4" /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-3 px-6 py-4 font-black uppercase text-[10px] tracking-widest transition-all relative overflow-hidden",
                                    activeTab === tab.id ? "text-brand-primary" : "text-gray-400 hover:text-brand-dark"
                                )}
                            >
                                {tab.icon} {tab.label}
                                {activeTab === tab.id && <motion.div layoutId="tab-line" className="absolute bottom-[-16px] left-0 w-full h-1 bg-brand-primary rounded-full" />}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'description' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key="desc" className="bg-white p-12 rounded-[50px] shadow-xl border border-brand-light space-y-10">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                    <div className="space-y-6">
                                        <h3 className="text-3xl font-black text-brand-dark italic tracking-tighter">Maximum Sanitization Formula</h3>
                                        <p className="text-gray-500 font-medium leading-[1.8] text-lg">Our proprietary active-disinfectant technology is engineered to break down hard-water stains and lime-scale within seconds. The blue-wash protective layer prevents re-deposition of dirt, keeping your bathroom sparkling longer than any traditional cleaner.</p>
                                    </div>
                                    <div className="bg-brand-primary/5 p-10 rounded-[40px] space-y-8">
                                        <h4 className="text-xl font-black text-brand-primary uppercase tracking-tight italic">Key Benefits</h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {product.keyFeatures.map((f, i) => (
                                                <li key={i} className="flex items-center gap-3 group">
                                                    <div className="p-1.5 bg-zinc-100 rounded-full group-hover:bg-black transition-colors"><CheckCircle2 className="w-4 h-4 text-zinc-700 group-hover:text-white" /></div>
                                                    <span className="text-xs font-bold text-gray-600 tracking-tight">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'specs' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key="specs" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                {product.specifications.map((spec, i) => (
                                    <div key={i} className="bg-white p-8 rounded-[32px] shadow-lg border-2 border-brand-light text-center space-y-3 hover:translate-y-[-5px] transition-all">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[2px]">{spec.label}</p>
                                        <div className="h-0.5 w-8 bg-brand-accent mx-auto" />
                                        <h4 className="text-lg font-black text-brand-dark italic tracking-tighter">{spec.value}</h4>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
};

export default ProductDetailPage;
