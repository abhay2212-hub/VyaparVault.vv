"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, Grid, List, Sparkles, X, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const ShopPage = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const categories = ['All', 'Toilet Cleaners', 'Floor Cleaners', 'Glass Cleaners', 'Sanitizers', 'Kit/Bulk'];

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${base}/api/products`);
                if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
                const json = await res.json();
                const rows = json.products || json;
                const mapped = (rows || []).map((d: any, index: number) => ({
                    _id: d.id || d._id,
                    id: d.id || d._id,
                    name: d.name,
                    price: d.price,
                    originalPrice: d.original_price ?? d.originalPrice,
                    discountPercent: d.discount_percent ?? d.discountPercent ?? 0,
                    isMostSelling: d.is_most_selling ?? d.isMostSelling ?? false,
                    isFeatured: d.is_featured ?? d.isFeatured ?? false,
                    numReviews: d.num_reviews ?? d.numReviews ?? 0,
                    image: (d.images && d.images.length) ? d.images[0] : (d.image || `/product/aa${(index % 8) + 1}.png`),
                    description: d.description,
                    category: d.category
                }));
                setProducts(mapped);
            } catch (err: any) {
                setError(err.message || String(err));
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <main className="min-h-screen pt-24 bg-transparent overflow-hidden">
            {/* Shop Header */}
            <section className="bg-transparent py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ffffff] transform skew-x-12 translate-x-32 opacity-5" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-white border border-white/10"
                    >
                        <Sparkles className="w-4 h-4 text-white/40" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Premium Catalogue</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none">
                        Our <span className="text-white/40 not-italic">Clean</span> Library
                    </h1>
                    <p className="text-white/60 font-medium max-w-xl mx-auto text-sm md:text-base">
                        Explore our full range of professional hygiene products. Certified 99.9% germ-killing formula for your protection.
                    </p>
                </div>
            </section>

            {/* Filter & Toolbar */}
            <motion.section
                className="bg-transparent z-30 border-b border-zinc-800/50 relative"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Search */}
                    <div className="relative w-full md:w-96 flex items-center gap-4">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white w-5 h-5 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full bg-white/5 text-white border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:bg-white/10 focus:border-white/30 focus:outline-none focus:ring-4 focus:ring-white/5 transition-all placeholder:text-white/20"
                            />
                        </div>
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="bg-[#111111] border border-zinc-800 text-[#ffffff] p-3 rounded-2xl flex md:hidden items-center justify-center shadow-lg hover:bg-zinc-800 transition-all"
                        >
                            <Filter className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Filters (Desktop) */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            {categories.slice(0, 4).map((cat) => (
                                <button key={cat} className="px-5 py-2 whitespace-nowrap rounded-full text-xs font-black uppercase tracking-widest text-white/60 hover:bg-white hover:text-black transition-all">
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="h-6 w-px bg-zinc-800 mx-2" />

                    </div>
                </div>
            </motion.section>

            {/* Product Grid */}
            <motion.section
                className="max-w-7xl mx-auto px-6 py-12 overflow-hidden"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>


            </motion.section>

            {/* Mobile Filter Modal */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 w-full h-[85vh] bg-neutral-900 border-t border-white/10 z-[110] rounded-t-[50px] shadow-2xl p-8 overflow-hidden flex flex-col"
                        >
                            <div className="w-16 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-3xl font-black text-white">FILTERS</h3>
                                <button onClick={() => setIsFilterOpen(false)} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                                    <X className="w-6 h-6 text-white/60" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-10 pr-2">
                                <div>
                                    <h4 className="text-sm font-black text-white/40 uppercase tracking-widest mb-6">Categories</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {categories.map((cat) => (
                                            <button key={cat} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 font-black text-xs text-white/40 hover:bg-white hover:text-black transition-all whitespace-nowrap">
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-black text-white/40 uppercase tracking-widest mb-6">Price Range</h4>
                                    <div className="space-y-4">
                                        <input type="range" className="w-full accent-white h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" min="0" max="5000" />
                                        <div className="flex justify-between text-xs font-black text-white/40">
                                            <span>₹0</span>
                                            <span>₹5,000+</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-black text-white/40 uppercase tracking-widest mb-6">Sort By</h4>
                                    {['Popularity', 'Newest First', 'Price: Low to High', 'Price: High to Low', 'Customer Rating'].map(item => (
                                        <label key={item} className="flex items-center gap-4 py-3 bg-white/5 border border-white/10 px-6 rounded-2xl cursor-pointer hover:bg-white/10 transition-all">
                                            <input type="radio" name="sort" className="w-5 h-5 accent-white bg-white/10 border-white/10" />
                                            <span className="text-sm font-bold text-white/60">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full bg-white text-black py-5 rounded-[24px] font-black text-lg shadow-2xl mt-8 hover:bg-white/90 transition-all">
                                APPLY FILTERS
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
};

export default ShopPage;
