"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Star, ArrowRight } from 'lucide-react';
import TextType from './TextType';
import Shuffle from './Shuffle';
import { useRouter } from 'next/navigation';

const Hero = () => {
    const router = useRouter();
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent">
            {/* Background elements removed for 100% transparency */}

            <div className="max-w-7xl mx-auto px-6 flex items-center justify-center pt-20 min-h-[80vh]">
                {/* Centered Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12 text-center max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/20 mx-auto">
                        <Star className="w-4 h-4 text-white/50 fill-white/50" />
                        <span className="text-sm font-bold text-white">Trusted by 10,000+ Indian Homes</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-[#ffffff] leading-[1.1] tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]">
                        <Shuffle
                            text="Vyapar Vault"
                            tag="span"
                            shuffleDirection="right"
                            duration={0.35}
                            animationMode="evenodd"
                            shuffleTimes={1}
                            ease="power3.out"
                            stagger={0.03}
                            threshold={0.1}
                            triggerOnce={true}
                            triggerOnHover
                            respectReducedMotion={true}
                            loop={false}
                            loopDelay={0}
                        />
                    </h1>

                    <div className="text-2xl text-[#e0e0e0] font-medium max-w-2xl mx-auto drop-shadow-md min-h-[4rem]">
                        <TextType
                            text={["Experience clinical-grade hygiene with VyaparVault's advanced cleaning formula. Designed for modern Indian bathrooms."]}
                            as="span"
                            typingSpeed={20}
                            pauseDuration={1500}
                            showCursor
                            cursorCharacter="_"
                            deletingSpeed={10}
                            cursorBlinkDuration={0.5}
                            loop={false}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-8 justify-center">
                        <motion.button
                            onClick={() => {
                                const el = document.getElementById('shop');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                                else router.push('/shop');
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glow-on-hover uppercase tracking-[0.2em] font-black text-xs group min-w-[240px]"
                        >
                            SHOP NOW <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                        <motion.button
                            onClick={() => router.push('/contact')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glow-on-hover uppercase tracking-widest font-black text-sm min-w-[240px]"
                        >
                            BULK PURCHASE
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-3 gap-12 pt-12 border-t border-brand-light">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-4xl font-black text-white italic">10K+</span>
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Happy Homes</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 border-x border-white/10 px-12">
                            <span className="text-4xl font-black text-white italic">24H</span>
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Freshness</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 uppercase">
                            <span className="text-4xl font-black text-white italic">99.9%</span>
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Protection</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator Removed */}
        </section>
    );
};

export default Hero;
