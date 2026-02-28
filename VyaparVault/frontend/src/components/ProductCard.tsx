"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Eye, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCart } from '@/context/CartContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ProductCard = ({ product }: any) => {
    const { items, addToCart, updateQuantity } = useCart();
    const cartItem = items.find(item => item.id === product._id);

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group bg-white/5 backdrop-blur-md rounded-[32px] p-4 border border-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:border-white/20 overflow-hidden relative"
        >
            <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 transition-all group-hover:left-8">
                {product.isMostSelling && (
                    <span className="bg-brand-dark text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border border-white/20 uppercase tracking-widest">Most Selling</span>
                )}
                {product.discountPercent > 0 && (
                    <span className="bg-zinc-800 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border border-white/20 uppercase tracking-widest">-{product.discountPercent}% OFF</span>
                )}
            </div>

            {/* Favorite */}
            <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-black opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:shadow-xl z-10">
                <Heart className="w-5 h-5" />
            </button>

            {/* Image Container */}
            <div className="aspect-square bg-brand-light/50 rounded-[24px] mb-6 overflow-hidden relative flex items-center justify-center group-hover:bg-brand-light transition-all">
                <div className="text-white/5 font-black text-6xl rotate-12 group-hover:rotate-0 transition-transform duration-700 select-none">VV</div>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute inset-0 flex items-center justify-center p-8"
                >
                    <div className="bg-transparent w-full h-[80%] rounded-2xl flex items-center justify-center transition-all overflow-hidden relative">
                        {/* Glass Overlay for image */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm -z-10 rounded-2xl border border-white/10" />
                        {/* Render real image when available, otherwise fallback */}
                        {product?.images && product.images[0] ? (
                            // use native img so it works regardless of configuration
                            <img
                                src={product.images[0]}
                                alt={product.name || 'product'}
                                className="w-full h-full object-contain"
                                onError={(e: any) => { e.currentTarget.src = '/placeholder.png'; }}
                            />
                        ) : product?.image ? (
                            <img
                                src={product.image}
                                alt={product.name || 'product'}
                                className="w-full h-full object-contain"
                                onError={(e: any) => { e.currentTarget.src = '/placeholder.png'; }}
                            />
                        ) : (
                            <span className="font-black text-brand-dark opacity-20 text-center text-xs tracking-tighter uppercase whitespace-normal leading-tight px-4 leading-[1.2]">Premium <br /> Bathroom <br /> Cleaner</span>
                        )}
                    </div>
                </motion.div>

                {/* Quick View Removed */}
            </div>

            {/* Content */}
            <div className="space-y-4 pt-2">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn("w-3 h-3 fill-current text-white/80", s > 4 && "opacity-20")} />
                    ))}
                    <span className="text-[10px] font-bold text-gray-400 ml-1">{product.numReviews || 0} Reviews</span>
                </div>

                <Link href={`/product/${product._id}`} className="block group/link">
                    <h3 className="text-xl font-black text-white group-hover/link:text-white/80 transition-colors leading-tight">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-white">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xs font-bold text-white/40 line-through">₹{product.originalPrice}</span>
                            )}
                        </div>
                        <p className="text-[8px] font-bold text-white/40 tracking-widest uppercase">Inc. of all taxes</p>
                    </div>

                    {cartItem ? (
                        <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-2xl p-2 shadow-lg h-14">
                            <button onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)} className="text-white w-8 h-8 flex items-center justify-center font-black text-xl hover:bg-white/20 rounded-xl transition-all">-</button>
                            <span className="text-white font-black text-sm w-4 text-center">{cartItem.quantity}</span>
                            <button onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} className="text-white w-8 h-8 flex items-center justify-center font-black text-xl hover:bg-white/20 rounded-xl transition-all">+</button>
                        </div>
                    ) : (
                        <motion.button
                            onClick={() => addToCart(product)}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white text-black p-4 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 hover:bg-white/90 h-14 w-14"
                        >
                            <ShoppingCart className="w-6 h-6" />
                        </motion.button>
                    )}
                </div>

                {/* Action Indicator */}
                <div className="flex items-center gap-2 pt-2">
                    <div className="h-1 flex-1 bg-brand-light rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '85%' }}
                            className="h-full bg-white/40 rounded-full"
                        />
                    </div>
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-tighter">85% Recommended</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
