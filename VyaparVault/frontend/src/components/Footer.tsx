"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-24 pb-8 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-white to-transparent opacity-10" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {/* Brand Info */}
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-white p-2 rounded-xl group">
                            <ShoppingCart className="text-black w-6 h-6 group-hover:rotate-12 transition-transform" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter uppercase">
                            VyaparVault
                        </span>
                    </Link>
                    <p className="text-white/70 leading-relaxed font-medium">
                        India's next major hygiene brand. Dedicated to providing premium, clinical-grade cleaning solutions for modern homes. Kills 99.9% germs, guaranteed.
                    </p>
                    <div className="flex gap-4">
                        <motion.a whileHover={{ y: -5 }} href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"><Facebook className="w-5 h-5" /></motion.a>
                        <motion.a whileHover={{ y: -5 }} href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"><Instagram className="w-5 h-5" /></motion.a>
                        <motion.a whileHover={{ y: -5 }} href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"><Twitter className="w-5 h-5" /></motion.a>
                        <motion.a whileHover={{ y: -5 }} href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"><Youtube className="w-5 h-5" /></motion.a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-black mb-8 border-b-2 border-brand-accent/50 pb-2 inline-block">Explore</h3>
                    <ul className="space-y-4">
                        {['Shop All Products', 'Bulk Orders', 'Hygiene Tips (Blog)', 'About Us', 'Contact Us'].map((item) => (
                            <li key={item}>
                                <Link href="#" className="text-white/70 hover:text-white flex items-center gap-2 group transition-all">
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full group-hover:w-3 group-hover:bg-white transition-all" />
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-xl font-black mb-8 border-b-2 border-brand-accent/50 pb-2 inline-block">Support</h3>
                    <ul className="space-y-4 text-white/70">
                        {['Shipping Policy', 'Refund Policy', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((item) => (
                            <li key={item}>
                                <Link href="/contact" className="hover:text-white transition-all flex items-center justify-between">
                                    {item}
                                    <ExternalLink className="w-4 h-4 opacity-30" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-black mb-8 border-b-2 border-brand-accent/50 pb-2 inline-block">Contact</h3>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl group hover:bg-white/10 transition-all">
                            <MapPin className="text-white w-6 h-6 shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm uppercase">Registered Office</h4>
                                <p className="text-sm text-white/70">-B-1225 Dev atelier near anand nagar cross vejalpur prahladnagar ahemdabad 380015</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <Phone className="text-white w-5 h-5 shrink-0" />
                            <span className="text-white/70">+91 9909009479</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <Mail className="text-white w-5 h-5 shrink-0" />
                            <span className="text-white/70">vyaparvaultpvt@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                <p className="text-white/40 text-sm font-medium">
                    © 2026 VYAAPAR VAULT PVT LTD. All Rights Reserved.
                </p>
                <div className="flex items-center gap-6">
                    <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Visa" />
                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Mastercard" />
                    <img src="https://img.icons8.com/color/48/000000/google-pay.png" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="GPay" />
                    <img src="https://img.icons8.com/color/48/000000/upi.png" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="UPI" />
                </div>
            </div>

            {/* Floating Contact (WhatsApp) */}
            <motion.a
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                href="https://wa.me/919909009479"
                target="_blank"
                className="fixed bottom-24 right-6 bg-[#25D366] p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] z-50 flex items-center justify-center border-4 border-[#ffffff] lg:bottom-12 transition-all hover:brightness-110"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#000000">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
            </motion.a>
        </footer>
    );
};

export default Footer;
