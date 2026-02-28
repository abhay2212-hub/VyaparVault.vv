"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe, Send, PhoneCall, Building2, Facebook, Instagram, Twitter } from 'lucide-react';

const ContactPage = () => {
    return (
        <main className="min-h-screen pt-24 bg-transparent overflow-hidden">
            {/* Contact Hero */}
            <section className="bg-transparent py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ffffff] transform skew-x-12 translate-x-32 opacity-5" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-[#ffffff]/10 px-4 py-1.5 rounded-full border border-zinc-800 text-[#ffffff]"
                    >
                        <MessageSquare className="w-4 h-4 text-zinc-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#aaaaaa]">Connect With Us</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-black text-[#ffffff] italic tracking-tighter leading-none">
                        Let's Talk <span className="text-zinc-500 not-italic">Hygiene</span>
                    </h1>
                    <p className="text-[#aaaaaa] font-medium max-w-xl mx-auto text-xl italic pt-4">
                        We're here to answer any questions you have about our products, bulk orders, or corporate services.
                    </p>
                </div>
            </section>

            {/* Info Cards */}
            <motion.section
                className="max-w-7xl mx-auto px-6 py-24 overflow-hidden"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: <PhoneCall className="w-8 h-8" />, title: 'Call Support', desc: '9909009479', sub: 'Available 9AM - 8PM (Mon-Sat)' },
                        { icon: <Mail className="w-8 h-8" />, title: 'Email Us', desc: 'vyaparvaultpvt@gmail.com', sub: 'We reply within 4 hours.' },
                        { icon: <Building2 className="w-8 h-8" />, title: 'Registered Office', desc: '-B-1225 Dev atelier', sub: 'vejalpur, ahemdabad 380015' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-[#111] p-10 rounded-[50px] shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-zinc-800 space-y-6 group hover:translate-y-[-10px] transition-all">
                            <div className="p-5 bg-zinc-800/50 rounded-2xl w-20 h-20 flex items-center justify-center text-[#ffffff] group-hover:bg-green-500/20 group-hover:text-green-400 transition-all duration-500 shadow-lg group-hover:rotate-6">
                                {item.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-[#ffffff] tracking-tighter">{item.title}</h3>
                                <p className="text-[#cccccc] font-black italic">{item.desc}</p>
                                <p className="text-[10px] font-bold text-[#aaaaaa] uppercase tracking-widest">{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Form */}
                    <div className="bg-[#111] p-12 md:p-16 rounded-[60px] shadow-[0_0_20px_rgba(255,255,255,0.05)] border-8 border-zinc-800/50 space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-[#ffffff] tracking-tighter uppercase italic">Send <span className="text-zinc-400">A Message</span></h2>
                            <p className="text-[#aaaaaa] font-medium text-sm capitalize">Whether it's feedback or a bulk inquiry, we'd love to hear from you.</p>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#aaaaaa] tracking-widest pl-2">First Name</label>
                                <input type="text" className="w-full bg-[#1a1a1a] text-white border-2 border-transparent rounded-[24px] py-5 px-8 font-bold outline-none focus:bg-[#222] focus:border-zinc-400 transition-all shadow-inner" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#aaaaaa] tracking-widest pl-2">Last Name</label>
                                <input type="text" className="w-full bg-[#1a1a1a] text-white border-2 border-transparent rounded-[24px] py-5 px-8 font-bold outline-none focus:bg-[#222] focus:border-zinc-400 transition-all shadow-inner" placeholder="Doe" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#aaaaaa] tracking-widest pl-2">Email Address</label>
                                <input type="email" className="w-full bg-[#1a1a1a] text-white border-2 border-transparent rounded-[24px] py-5 px-8 font-bold outline-none focus:bg-[#222] focus:border-zinc-400 transition-all shadow-inner" placeholder="john@company.com" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#aaaaaa] tracking-widest pl-2">Your Message</label>
                                <textarea rows={4} className="w-full bg-[#1a1a1a] text-white border-2 border-transparent rounded-[32px] py-5 px-8 font-bold outline-none focus:bg-[#222] focus:border-zinc-400 transition-all resize-none shadow-inner" placeholder="How can we help you?" />
                            </div>
                            <button className="md:col-span-2 bg-white text-black py-6 rounded-[32px] font-black text-xl tracking-widest flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] group">
                                SEND MESSAGE <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    {/* Map & Socials */}
                    <div className="space-y-12">
                        <div className="bg-[#111111] p-12 rounded-[60px] shadow-[0_0_20px_rgba(255,255,255,0.05)] space-y-10 relative overflow-hidden border border-zinc-800">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-[#ffffff]/5 rounded-full transform -translate-x-16 -translate-y-16" />

                            <h3 className="text-3xl font-black tracking-tighter uppercase italic text-[#ffffff]">Follow <span className="text-brand-accent">@VyaparVault</span></h3>
                            <p className="text-[#aaaaaa] text-sm font-medium pr-12">Join our hygiene community on social media for daily tips and exclusive brand updates.</p>

                            <div className="flex gap-6">
                                {[
                                    { icon: <Facebook className="w-6 h-6" />, name: 'Facebook' },
                                    { icon: <Instagram className="w-6 h-6" />, name: 'Instagram' },
                                    { icon: <Twitter className="w-6 h-6" />, name: 'Twitter' }
                                ].map((soc, i) => (
                                    <motion.a
                                        key={i}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        href="#"
                                        className="p-5 bg-[#ffffff]/10 rounded-3xl hover:bg-brand-accent transition-all duration-300 text-[#ffffff]"
                                    >
                                        {soc.icon}
                                    </motion.a>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-zinc-800 space-y-6">
                                <div className="flex items-center gap-4">
                                    <Clock className="w-6 h-6 text-brand-accent" />
                                    <div>
                                        <p className="text-xs font-black uppercase text-[#aaaaaa] tracking-widest">Business Hours</p>
                                        <p className="text-lg font-bold text-[#ffffff]">Mon - Sat: 09:00 - 20:00</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Globe className="w-6 h-6 text-brand-accent" />
                                    <div>
                                        <p className="text-xs font-black uppercase text-[#aaaaaa] tracking-widest">Global Inquiries</p>
                                        <p className="text-lg font-bold text-[#ffffff]">export@vyaparvault.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Embedded Google Maps Section */}
                        <div className="bg-[#111] p-2 rounded-[50px] shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-zinc-800 flex flex-col items-center justify-center group overflow-hidden relative">
                            <div className="w-full h-64 md:h-80 rounded-[40px] overflow-hidden">
                                <iframe
                                    src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Dev%20Atelier,Ahmedabad+(VyaparVault)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                            <div className="w-full pt-6 pb-2 px-8 flex justify-between items-center">
                                <div>
                                    <h4 className="text-sm font-black text-[#ffffff] uppercase tracking-widest">Dev Atelier</h4>
                                    <p className="text-[10px] text-[#aaaaaa]">Ahmedabad, Gujarat</p>
                                </div>
                                <MapPin className="text-green-400 w-6 h-6 animate-bounce" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </main>
    );
};

export default ContactPage;
