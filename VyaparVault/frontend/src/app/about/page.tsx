"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Zap, Building2, Users, Rocket, Target, Globe, History, Microscope, FlaskConical, Droplet } from 'lucide-react';

const AboutPage = () => {
    return (
        <main className="min-h-screen pt-24 bg-transparent">
            {/* Legend Hero */}
            <section className="bg-transparent py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ffffff] transform skew-x-12 translate-x-32 opacity-5" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-[#ffffff]/10 px-4 py-1.5 rounded-full border border-zinc-800 text-[#ffffff]"
                        >
                            <Sparkles className="w-4 h-4 text-zinc-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#aaaaaa]">Our Legacy</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-8xl font-black text-[#ffffff] italic tracking-tighter leading-none">
                            Defining <span className="text-zinc-500 not-italic">Hygiene</span> <br />
                            For A New India
                        </h1>
                        <p className="text-[#aaaaaa] font-medium max-w-xl mx-auto lg:mx-0 text-xl leading-relaxed">
                            VyaparVault isn't just a cleaning brand; it's a statement of purity. We combine high-concentration active agents with eco-friendly formulas to protect your home.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="aspect-square bg-transparent rounded-[50px] flex items-center justify-center overflow-hidden group">
                            <img
                                src="/ss12.jpeg"
                                alt="VyaparVault Logo"
                                className="w-full h-full object-cover rounded-full invert opacity-90 group-hover:scale-105 transition-transform duration-1000 saturate-0"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <motion.section
                className="max-w-7xl mx-auto px-6 py-24 overflow-hidden"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white p-12 rounded-[50px] shadow-xl border border-brand-light space-y-8 group transition-all hover:bg-brand-primary hover:text-white">
                        <div className="p-6 bg-brand-light rounded-3xl w-24 h-24 flex items-center justify-center group-hover:bg-brand-accent transition-all duration-500">
                            <Target className="w-10 h-10 text-brand-primary group-hover:text-white" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter italic">Our Mission</h2>
                        <p className="text-gray-500 font-medium leading-relaxed group-hover:text-white/70">
                            To bring clinical-grade, laboratory-tested hygiene solutions to every Indian household at an accessible price. We strive to lead the industry through continuous innovation and customer-centric design.
                        </p>
                    </div>

                    <div className="bg-white p-12 rounded-[50px] shadow-xl border border-brand-light space-y-8 group transition-all hover:bg-brand-dark hover:text-white">
                        <div className="p-6 bg-brand-light rounded-3xl w-24 h-24 flex items-center justify-center group-hover:bg-brand-primary transition-all duration-500">
                            <Rocket className="w-10 h-10 text-brand-primary group-hover:text-white" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter italic">Our Vision</h2>
                        <p className="text-gray-500 font-medium leading-relaxed group-hover:text-white/70">
                            To become India's #1 most trusted hygiene brand by 2030, recognized for excellence in bathroom and floor sanitation across both residential and corporate sectors.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Core Values / Stats */}
            <motion.section
                className="bg-transparent py-24 overflow-hidden relative"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: <FlaskConical className="w-8 h-8" />, val: '85+', title: 'Active Formulas' },
                        { icon: <CheckCircle2 className="w-8 h-8" />, val: '100%', title: 'Lab Certified' },
                        { icon: <Globe className="w-8 h-8" />, val: 'Pan India', title: 'Presence' },
                        { icon: <Droplet className="w-8 h-8" />, val: '0%', title: 'Acid Residuals' }
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center space-y-4 text-[#ffffff] p-8 bg-[#111111] rounded-[40px] border border-zinc-800 hover:border-zinc-500 hover:bg-[#1a1a1a] transition-all cursor-default shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] relative group">
                            <div className="absolute inset-0 rounded-[40px] bg-[#ffffff] opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 pointer-events-none" />
                            <div className="p-4 bg-[#ffffff]/10 text-[#ffffff] rounded-2xl inline-block shadow-xl relative z-10">{stat.icon}</div>
                            <h4 className="text-4xl font-black italic tracking-tighter relative z-10 text-[#ffffff]">{stat.val}</h4>
                            <p className="text-[10px] font-black uppercase text-[#aaaaaa] tracking-widest relative z-10">{stat.title}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* The Team / Story */}
            <motion.section
                className="max-w-4xl mx-auto px-6 py-24 text-center space-y-12 overflow-hidden"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter">The <span className="text-brand-primary">Vyapar</span> Story</h2>
                    <div className="w-24 h-1.5 bg-brand-accent rounded-full mx-auto" />
                </div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed italic">
                    "Founded in 2024, VyaparVault started with a simple belief: Every Indian home deserves hospitality-grade cleanliness. We noticed that existing brands either lacked concentration or used harsh chemicals that damaged tiles. Our R&D team spent 18 months developing the 'Blue-Water Guard' formula that now powers our flagship products."
                </p>
            </motion.section>
        </main>
    );
};

const CheckCircle2 = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
);

export default AboutPage;
