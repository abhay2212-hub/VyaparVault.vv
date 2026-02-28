"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, Mail, Truck, LayoutList, ChevronDown, CheckCircle2, ChevronRight, Download, Send, Building2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const BulkOrdersPage = () => {
    const [activeTab, setActiveTab] = useState('pricing');
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    const pricingTiers = [
        { qty: '20-50 Units', discount: '10%', bestFor: 'Small Retailers' },
        { qty: '50-200 Units', discount: '20%', bestFor: 'Hotels & Offices' },
        { qty: '200-500 Units', discount: '30%', bestFor: 'Wholesalers' },
        { qty: '500+ Units', discount: '40%+', bestFor: 'Distributors' },
    ];

    const bulkFAQs = [
        { q: 'What is the minimum order quantity (MOQ)?', a: 'Our MOQ for bulk pricing is 20 units. For quantities less than 20, standard retail prices apply.' },
        { q: 'Do you provide customized packaging?', a: 'Yes, for orders exceeding 1000 units, we offer private labeling and custom branding options.' },
        { q: 'How long does shipping take for large orders?', a: 'Bulk orders are dispatched within 24-48 hours. Delivery time varies between 3-7 business days depending on location.' },
        { q: 'Is there a credit period available?', a: 'For long-term corporate partners, we offer a 15-day credit period subject to credit evaluation.' },
    ];

    return (
        <main className="min-h-screen pt-24 bg-transparent">
            {/* Hero */}
            <section className="bg-transparent py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-accent transform skew-x-12 translate-x-32 opacity-10" />
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 relative z-10 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-[#ffffff]/10 px-4 py-1.5 rounded-full border border-[#ffffff]/20 text-[#ffffff]"
                        >
                            <Building2 className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#ffffff]">Corporate Excellence</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-8xl font-black text-[#ffffff] italic tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            Grow Your <br />
                            <span className="text-[#cccccc] not-italic">Vyapar</span> With Us
                        </h1>
                        <p className="text-[#e0e0e0] font-medium max-w-xl mx-auto lg:mx-0 text-lg drop-shadow-md">
                            Get exclusive wholesale pricing, priority support, and dedicated logistics for your business hygiene needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="bg-white text-brand-primary px-10 py-5 rounded-[24px] font-black text-lg transition-all hover:scale-105 shadow-2xl">INQUIRE NOW</button>
                            <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-[24px] font-black text-lg transition-all hover:bg-white/10 flex items-center justify-center gap-3">
                                <Download className="w-6 h-6" /> BROCHURE
                            </button>
                        </div>
                    </div>

                    <div className="relative group perspective-1000">
                        {/* 3D Card Visual */}
                        <div className="bg-white p-12 rounded-[50px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-8 border-brand-primary/10 transition-transform duration-700 hover:rotate-y-12">
                            <div className="flex items-center gap-6 mb-12">
                                <div className="p-4 bg-brand-accent rounded-3xl"><PhoneCall className="text-white w-8 h-8" /></div>
                                <div>
                                    <h3 className="text-2xl font-black text-brand-dark tracking-tighter">Priority Hotline</h3>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Exclusively for Bulk</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-6 bg-brand-light/50 rounded-3xl border border-brand-light">
                                    <span className="text-sm font-black text-brand-dark">Orders Completed</span>
                                    <span className="text-brand-primary font-black">5,200+</span>
                                </div>
                                <div className="flex items-center justify-between p-6 bg-brand-light/50 rounded-3xl border border-brand-light">
                                    <span className="text-sm font-black text-brand-dark">Business Partners</span>
                                    <span className="text-brand-primary font-black">850+</span>
                                </div>
                                <div className="flex items-center justify-between p-6 bg-brand-light/50 rounded-3xl border border-brand-light">
                                    <span className="text-sm font-black text-brand-dark">India Coverage</span>
                                    <span className="text-brand-primary font-black">PAN India</span>
                                </div>
                            </div>
                            <div className="mt-12 bg-green-500 p-6 rounded-[32px] text-white flex items-center justify-between shadow-xl">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-white/50 tracking-widest">Live Status</p>
                                    <h4 className="font-bold text-lg">Accepting Inquiries</h4>
                                </div>
                                <CheckCircle2 className="w-10 h-10 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bulk Content */}
            <motion.section
                className="max-w-7xl mx-auto px-6 py-24 bg-transparent text-[#e0e0e0] overflow-hidden"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left: Tiers & FAQ */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Pricing Tiers Table/Accordion */}
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-[#ffffff] tracking-tighter drop-shadow-md">Wholesale <span className="text-zinc-500">Pricing Tiers</span></h2>

                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-hidden rounded-[32px] border border-zinc-800 shadow-[0_0_15px_rgba(255,255,255,0.05)] bg-[#111]">
                                <table className="w-full">
                                    <thead className="bg-[#1a1a1a]">
                                        <tr className="text-left font-black text-[10px] uppercase tracking-widest text-[#aaaaaa]">
                                            <th className="px-8 py-6">Order Quantity</th>
                                            <th className="px-8 py-6">Discount</th>
                                            <th className="px-8 py-6">Target Segment</th>
                                            <th className="px-8 py-6">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-800">
                                        {pricingTiers.map((tier, idx) => (
                                            <tr key={idx} className="hover:bg-zinc-800/50 transition-colors group">
                                                <td className="px-8 py-8 font-black text-[#ffffff]">{tier.qty}</td>
                                                <td className="px-8 py-8">
                                                    <span className="bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full font-black text-xs uppercase cursor-pointer">SAVE {tier.discount}</span>
                                                </td>
                                                <td className="px-8 py-8 text-sm font-bold text-[#aaaaaa]">{tier.bestFor}</td>
                                                <td className="px-8 py-8">
                                                    <button className="text-green-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">GET QUOTE <ChevronRight className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Accordion */}
                            <div className="md:hidden space-y-4">
                                {pricingTiers.map((tier, idx) => (
                                    <div key={idx} className="bg-[#111] p-6 rounded-[32px] shadow-lg border border-zinc-800 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-black text-[#ffffff]">{tier.qty}</h4>
                                            <p className="text-xs font-bold text-[#aaaaaa] capitalize">{tier.bestFor}</p>
                                        </div>
                                        <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-2xl font-black text-xs shadow-lg">-{tier.discount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-[#ffffff] tracking-tighter drop-shadow-md">Common <span className="text-zinc-500">Questions</span></h2>
                            <div className="space-y-4">
                                {bulkFAQs.map((faq, idx) => (
                                    <div key={idx} className="bg-[#111] rounded-[32px] overflow-hidden shadow-lg border border-zinc-800">
                                        <button
                                            onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-8 text-left transition-all hover:bg-zinc-800/50"
                                        >
                                            <span className="text-lg font-black text-[#ffffff] tracking-tight leading-tight">{faq.q}</span>
                                            <ChevronDown className={cn("w-6 h-6 text-green-400 transition-transform duration-300", openAccordion === idx && "rotate-180")} />
                                        </button>
                                        <AnimatePresence>
                                            {openAccordion === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-8 pb-8"
                                                >
                                                    <p className="text-[#cccccc] font-medium leading-relaxed border-t border-zinc-800 pt-8">{faq.a}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Inquiry Form */}
                    <div className="relative">
                        <div className="sticky top-32 bg-[#111] border border-zinc-800 p-10 rounded-[40px] shadow-[0_0_20px_rgba(255,255,255,0.05)] text-white space-y-8 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-12 -translate-y-12" />

                            <h3 className="text-3xl font-black tracking-tighter italic text-[#ffffff]">Bulk Inquiry Form</h3>
                            <p className="text-white/60 font-medium text-sm">Please fill your requirements and our relationship manager will contact you within 4 hours.</p>

                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-white/50 tracking-widest pl-2">Full Name</label>
                                    <input type="text" className="w-full bg-white/10 border border-white/20 rounded-[24px] py-4 px-6 !text-white placeholder:text-gray-400 font-bold outline-none focus:bg-white/20 focus:border-brand-accent transition-all" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-white/50 tracking-widest pl-2">Business Email</label>
                                    <input type="email" className="w-full bg-white/10 border border-white/20 rounded-[24px] py-4 px-6 !text-white placeholder:text-gray-400 font-bold outline-none focus:bg-white/20 focus:border-brand-accent transition-all" placeholder="john@company.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-white/50 tracking-widest pl-2">Phone Number</label>
                                    <input type="tel" className="w-full bg-white/10 border border-white/20 rounded-[24px] py-4 px-6 !text-white placeholder:text-gray-400 font-bold outline-none focus:bg-white/20 focus:border-brand-accent transition-all" placeholder="+91 99XXXXXXX" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-white/50 tracking-widest pl-2">Expected Quantity</label>
                                    <select className="w-full bg-white/10 border border-white/20 rounded-[24px] py-4 px-6 !text-white font-bold outline-none appearance-none cursor-pointer focus:bg-white/20">
                                        <option className="bg-brand-primary">20 - 50 Units</option>
                                        <option className="bg-brand-primary">50 - 200 Units</option>
                                        <option className="bg-brand-primary">200 - 500 Units</option>
                                        <option className="bg-brand-primary">500+ Units</option>
                                    </select>
                                </div>
                                <button className="w-full bg-white text-brand-primary py-5 rounded-[24px] font-black text-lg shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                                    SUBMIT INQUIRY <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Support Bar */}
            <motion.section
                className="bg-transparent py-12 border-t border-white/10 overflow-hidden"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <PhoneCall className="w-6 h-6" />, title: 'Expert Assistance', desc: 'Mon-Sat (9AM - 8PM)' },
                        { icon: <Truck className="w-6 h-6" />, title: 'Direct Logistics', desc: 'Own vehicle fulfillment' },
                        { icon: <Mail className="w-6 h-6" />, title: 'Custom Quotes', desc: 'B2B GST invoices' },
                        { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Sample Packs', desc: 'Available for evaluation' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 group">
                            <div className="p-4 bg-zinc-800/50 rounded-2xl group-hover:bg-[#111] border border-transparent group-hover:border-zinc-700 text-[#ffffff] transition-all">{item.icon}</div>
                            <div>
                                <h4 className="text-sm font-black text-[#ffffff] uppercase tracking-tight">{item.title}</h4>
                                <p className="text-[10px] font-bold text-[#aaaaaa] capitalize">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>
        </main>
    );
};

export default BulkOrdersPage;
