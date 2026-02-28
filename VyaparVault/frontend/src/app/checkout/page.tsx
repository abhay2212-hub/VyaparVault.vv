"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Truck, CreditCard, ChevronRight, ChevronLeft, ShieldCheck, CheckCircle2, Building2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const CheckoutPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { id: 1, name: 'Shipping', icon: <MapPin className="w-5 h-5" /> },
        { id: 2, name: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
        { id: 3, name: 'Review', icon: <ShieldCheck className="w-5 h-5" /> },
    ];

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    return (
        <main className="min-h-screen pt-24 bg-brand-light/10">
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Steps & Forms */}
                    <div className="flex-1 space-y-12">
                        {/* Step Indicator */}
                        <div className="flex items-center justify-between bg-white p-6 rounded-[40px] shadow-xl border border-brand-light">
                            {steps.map((step, idx) => (
                                <React.Fragment key={step.id}>
                                    <div className="flex flex-col items-center gap-3 relative">
                                        <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-500 font-black shadow-xl border-4 ${currentStep >= step.id ? 'bg-brand-primary text-white border-brand-accent/30' : 'bg-brand-light/50 text-brand-dark/30 border-transparent'}`}>
                                            {currentStep > step.id ? <CheckCircle2 className="w-8 h-8" /> : step.icon}
                                        </div>
                                        <span className={`text-[10px] uppercase font-black tracking-widest ${currentStep >= step.id ? 'text-brand-primary' : 'text-brand-dark/30'}`}>{step.name}</span>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div className="h-0.5 flex-1 bg-brand-light mx-4 relative overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                                                className="h-full bg-brand-primary"
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Forms Container */}
                        <div className="bg-white p-10 md:p-14 rounded-[50px] shadow-2xl space-y-12 relative overflow-hidden border-8 border-brand-primary/5">
                            <AnimatePresence mode="wait">
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-10"
                                    >
                                        <h2 className="text-4xl font-black text-brand-dark tracking-tighter uppercase italic">Shipping <span className="text-brand-primary">Details</span></h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Full Name</label>
                                                <input type="text" className="w-full bg-brand-light/20 border-2 border-transparent rounded-[24px] py-5 px-8 font-bold outline-none focus:bg-white focus:border-brand-primary transition-all" placeholder="Enter your full name" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Phone Number</label>
                                                <input type="tel" className="w-full bg-brand-light/20 border-2 border-transparent rounded-[24px] py-5 px-8 font-bold outline-none focus:bg-white focus:border-brand-primary transition-all" placeholder="+91 XXXX" />
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Street Address</label>
                                                <input type="text" className="w-full bg-brand-light/20 border-2 border-transparent rounded-[24px] py-5 px-8 font-bold outline-none focus:bg-white focus:border-brand-primary transition-all" placeholder="Apt, Building, Area" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">City</label>
                                                <input type="text" className="w-full bg-brand-light/20 border-2 border-transparent rounded-[24px] py-5 px-8 font-bold outline-none focus:bg-white focus:border-brand-primary transition-all" placeholder="New Delhi" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Pincode</label>
                                                <input type="text" className="w-full bg-brand-light/20 border-2 border-transparent rounded-[24px] py-5 px-8 font-bold outline-none focus:bg-white focus:border-brand-primary transition-all" placeholder="110001" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-10"
                                    >
                                        <h2 className="text-4xl font-black text-brand-dark tracking-tighter uppercase italic">Payment <span className="text-brand-primary">Method</span></h2>
                                        <div className="space-y-6">
                                            {[
                                                { id: 'razorpay', name: 'Razorpay', desc: 'Secure Online Payment (UPI, Cards, Netbanking)', icon: <CreditCard className="w-6 h-6" /> },
                                                { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive the package', icon: <ShoppingBag className="w-6 h-6" /> },
                                            ].map((method) => (
                                                <label key={method.id} className="group relative flex items-center gap-6 p-8 rounded-[32px] border-4 border-brand-light/50 bg-brand-light/10 cursor-pointer transition-all hover:border-brand-primary/20 hover:bg-brand-light/30">
                                                    <input type="radio" name="payment" className="w-6 h-6 accent-brand-primary scale-125" />
                                                    <div className="p-4 bg-white rounded-2xl shadow-lg border border-brand-light group-hover:scale-110 transition-transform">
                                                        {method.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-black text-brand-dark tracking-tighter">{method.name}</h4>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{method.desc}</p>
                                                    </div>
                                                    <div className="ml-auto flex items-center gap-2 grayscale group-hover:grayscale-0 transition-grayscale">
                                                        {method.id === 'razorpay' && (
                                                            <img src="https://img.icons8.com/color/48/000000/razorpay.png" className="h-6" alt="Razorpay" />
                                                        )}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-10"
                                    >
                                        <div className="flex items-center gap-4 bg-zinc-100 p-8 rounded-[40px] border border-zinc-200 mb-12">
                                            <div className="p-4 bg-black rounded-3xl"><CheckCircle2 className="text-white w-10 h-10 animate-bounce" /></div>
                                            <div>
                                                <h3 className="text-2xl font-black text-brand-dark">Almost There!</h3>
                                                <p className="text-sm font-bold text-gray-500 uppercase tracking-tighter">Please review your order details before final confirmation.</p>
                                            </div>
                                        </div>

                                        {/* Summary grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="bg-brand-light/20 p-8 rounded-[32px] border border-brand-light">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Shipping To</h4>
                                                <p className="text-xl font-black text-brand-dark tracking-tighter">John Doe</p>
                                                <p className="text-sm font-bold text-gray-500">123, Clean Plaza, New Delhi, 110001</p>
                                                <p className="text-sm font-bold text-gray-500">+91 9999999999</p>
                                            </div>
                                            <div className="bg-brand-light/20 p-8 rounded-[32px] border border-brand-light">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Payment Method</h4>
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white rounded-xl shadow-lg border border-brand-light"><CreditCard className="w-6 h-6 text-brand-primary" /></div>
                                                    <p className="text-xl font-black text-brand-dark tracking-tighter">Pay via Razorpay</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-12 border-t border-brand-light">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="flex items-center gap-2 font-black text-brand-primary text-sm uppercase tracking-widest disabled:opacity-30 group"
                                >
                                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> BACK
                                </button>

                                <button
                                    onClick={nextStep}
                                    className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 text-lg uppercase tracking-widest shadow-brand-primary/50 group"
                                >
                                    {currentStep === 3 ? 'PLACE ORDER' : 'CONTINUE'}
                                    <ChevronRight className={`w-6 h-6 ${currentStep < 3 && 'group-hover:translate-x-1 transition-transform'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Sticky Card */}
                    <div className="w-full lg:w-[450px]">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-brand-dark p-10 rounded-[50px] shadow-2xl space-y-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary transform translate-x-12 -translate-y-12 rounded-full opacity-30" />

                                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">Your <span className="text-brand-accent">Selection</span></h3>
                                    <span className="bg-white/10 px-3 py-1 rounded text-[10px] font-black tracking-widest">2 ITEMS</span>
                                </div>

                                {/* Mini Cart List */}
                                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar-light">
                                    {[1, 2].map((item) => (
                                        <div key={item} className="flex items-center gap-4 group">
                                            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
                                                <div className="text-white/10 font-black text-xl italic tracking-tighter">VV</div>
                                                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/30 transition-all" />
                                            </div>
                                            <div className="flex-1 space-y-0.5">
                                                <h4 className="text-sm font-black text-white group-hover:text-brand-accent transition-colors">VyaparVault Pro Toilet Cleaner</h4>
                                                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Qty: 1 × ₹199</p>
                                            </div>
                                            <span className="text-lg font-black text-brand-accent">₹199</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 space-y-4 border-t border-white/10">
                                    <div className="flex justify-between items-center text-xs font-bold text-white/50">
                                        <span>Subtotal</span>
                                        <span>₹547</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-white/50">
                                        <span>Shipping</span>
                                        <span className="text-zinc-200">FREE</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-white/50">
                                        <span>Tax (GST 18%)</span>
                                        <span>₹98</span>
                                    </div>
                                    <div className="pt-6 flex justify-between items-center">
                                        <span className="text-sm font-black uppercase tracking-widest text-white/30">Total Bill</span>
                                        <div className="text-right">
                                            <span className="text-5xl font-black text-white italic tracking-tighter">₹645</span>
                                            <p className="text-[10px] font-black text-brand-accent uppercase tracking-tighter mt-1">Hospital Grade Protection</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Help box */}
                            <div className="bg-brand-light/30 p-8 rounded-[40px] border border-brand-light flex items-center gap-6">
                                <div className="p-4 bg-brand-primary rounded-3xl"><Building2 className="w-10 h-10 text-brand-accent" /></div>
                                <div>
                                    <h4 className="font-black text-brand-dark italic tracking-tight uppercase text-sm">Need Help?</h4>
                                    <p className="text-[10px] font-bold text-gray-500">Contact our 24/7 support line <br /> <span className="text-brand-primary font-black">9909009479</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CheckoutPage;
