"use client";
import React from 'react';
import Hero from '@/components/Hero';
import ScrollReveal from '@/components/ScrollReveal';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { Shield, Zap, Sparkles, Truck, PhoneCall, CheckCircle2, ChevronRight, MessageCircle, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    // Sample product data
    const featuredProducts = [
        {
            _id: '1',
            name: 'VyaparVault Pro Toilet Cleaner',
            price: 199,
            originalPrice: 249,
            discountPercent: 20,
            isMostSelling: true,
            numReviews: 450,
            image: '/product/aa1.png'
        },
        {
            _id: '2',
            name: 'VyaparVault Floor Disinfectant',
            price: 149,
            originalPrice: 199,
            discountPercent: 25,
            isMostSelling: false,
            numReviews: 280,
            image: '/product/aa2.png'
        },
        {
            _id: '3',
            name: 'VyaparVault Multi-Surface Sanitizer',
            price: 299,
            originalPrice: 399,
            discountPercent: 25,
            isMostSelling: false,
            numReviews: 120,
            image: '/product/aa3.png'
        },
        {
            _id: '4',
            name: 'VyaparVault Glass Cleaner Sparkle',
            price: 99,
            originalPrice: 129,
            discountPercent: 23,
            isMostSelling: true,
            numReviews: 310,
            image: '/product/aa4.png'
        }
    ];

    return (
        <main className="overflow-x-hidden">
            <Hero />


            {/* Shop Section */}
            <motion.section
                className="py-24 max-w-7xl mx-auto px-6 overflow-hidden"
                id="shop"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10"
                        >
                            <Sparkles className="w-4 h-4 text-white/60" />
                            <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Our Top Sellers</span>
                        </motion.div>
                        <ScrollReveal
                            as="h2"
                            textClassName="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-tight block"
                        >
                            Shop Our Premium Collection
                        </ScrollReveal>
                    </div>
                    <Link href="/shop" className="group border-2 border-white/20 px-8 py-3 font-black text-xs tracking-widest text-white hover:bg-white hover:text-black transition-all flex items-center gap-3 w-full md:w-auto justify-center">
                        EXPLORE FULL CATALOGUE <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </motion.section>

            {/* Bulk Orders Promo */}
            <motion.section
                className="bg-transparent border-y border-white/5 relative py-24 overflow-hidden"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 rounded-l-full -z-10" />
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        {/* Comparison Card */}
                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-[40px] shadow-2xl relative border border-white/10 overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 transform translate-x-16 -translate-y-16 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-1000" />

                            <ScrollReveal
                                as="h3"
                                textClassName="text-2xl font-black text-white tracking-tighter italic block mb-8"
                            >
                                Why Businesses Choose VyaparVault?
                            </ScrollReveal>
                            <ul className="space-y-6">
                                {[
                                    '15% Higher Concentration of Active Ingredients',
                                    'Long-Lasting Blue-Water Effect for 72 Hours',
                                    'Clinical-Grade Disinfection for High-Traffic Areas',
                                    'Zero Leak Packaging with Secure Seal Tech',
                                    'Eco-Friendly Formula, Hospital Tested'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 group">
                                        <div className="p-1 bg-white/5 rounded-full group-hover:bg-white transition-colors duration-300">
                                            <CheckCircle2 className="text-white/40 group-hover:text-black w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-bold text-white/60 tracking-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -bottom-8 -right-8 bg-white text-black p-8 rounded-[32px] shadow-2xl rotate-3 border-4 border-white/10 flex flex-col items-center">
                            <span className="text-5xl font-black tracking-tighter">40%</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-black/50">SAVINGS ON BULK</span>
                        </div>
                    </motion.div>

                    <div className="space-y-8">
                        <ScrollReveal
                            as="h2"
                            textClassName="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] block"
                        >
                            Perfect for Corporate & Bulk Orders
                        </ScrollReveal>
                        <ScrollReveal
                            as="p"
                            textClassName="text-lg text-white/60 font-medium block"
                        >
                            Whether it's for your office, hotel chain, or retail outlet, VyaparVault provides high-performance cleaning at wholesale pricing.
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-xl"><Truck className="text-white w-6 h-6" /></div>
                                <div>
                                    <p className="text-xs font-black text-white/20 uppercase">Delivery</p>
                                    <p className="text-sm font-black text-white">Doorstep Fulfillment</p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-xl"><MessageCircle className="text-white w-6 h-6" /></div>
                                <div>
                                    <p className="text-xs font-black text-white/20 uppercase">Support</p>
                                    <p className="text-sm font-black text-white">Priority Handling</p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            <Link href="/bulk-orders" className="bg-white text-black px-8 py-4 rounded-full font-black text-center hover:bg-white/90 transition-all">GET BULK QUOTE</Link>
                            <Link href="tel:+919909009479" className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-black flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                                <PhoneCall className="w-5 h-5" /> 9909009479
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Testimonials */}
            <motion.section
                className="py-24 bg-transparent overflow-hidden"
                id="reviews"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-20">
                    <ScrollReveal
                        as="h2"
                        textClassName="text-4xl md:text-6xl font-black text-white tracking-tighter block"
                    >
                        Voices of Hygiene
                    </ScrollReveal>
                    <ScrollReveal
                        as="p"
                        textClassName="text-white/40 font-medium italic block"
                    >
                        "Real stories from real Indian bathrooms"
                    </ScrollReveal>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: 'Priya Sharma', role: 'Home Maker', text: 'I replaced my usual brand with VyaparVault and the difference is huge. The shine on the floor lasts for days!' },
                        { name: 'Rahul Verma', role: 'Hotel Manager', text: 'For our hotel, we need something that works fast. VyaparVault is the only product that handles heavy stains effectively.' },
                        { name: 'Amit Gupta', role: 'Bulk Buyer', text: 'The pricing for bulk orders is unbeatable. Fast delivery and premium quality. Highly recommended for retail.' }
                    ].map((review, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 backdrop-blur-md p-8 rounded-[40px] border border-white/10 transition-all shadow-xl hover:shadow-white/10 hover:border-white/30 relative group"
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-4 bg-neutral-900 rounded-full shadow-2xl border border-white/10 transition-all duration-500">
                                <Star className="w-6 h-6 text-white/50 fill-white/50" />
                            </div>
                            <p className="text-white/80 font-medium leading-relaxed italic mb-8 pt-4">"{review.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-black text-xl">
                                    {review.name[0]}
                                </div>
                                <div className="text-left">
                                    <h4 className="font-black text-white tracking-tight">{review.name}</h4>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{review.role}</p>
                                </div>
                                <div className="ml-auto bg-white/10 px-2 py-1 rounded text-[8px] font-black text-white/40 flex items-center gap-1 border border-white/10">
                                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </main>
    );
}
