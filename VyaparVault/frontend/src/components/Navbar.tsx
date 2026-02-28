"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PillNav from './PillNav';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
    const pathname = usePathname();
    const logoUrl = '/logo.svg';

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/shop' },
        { label: 'Bulk Orders', href: '/bulk-orders' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
    ];

    const { cartCount } = useCart();

    return (
        <div className="fixed top-4 left-0 w-full z-[100] flex justify-center pointer-events-none px-4 md:px-0">
            <div className="pointer-events-auto w-full md:w-auto">
                <PillNav
                    logo={logoUrl}
                    logoAlt="VyaparVault"
                    items={navItems}
                    activeHref={pathname}
                    className="custom-nav"
                    ease="power2.easeOut"
                    baseColor="#ffffff"
                    pillColor="transparent"
                    hoveredPillTextColor="#000000"
                    pillTextColor="#ffffff"
                    initialLoadAnimation={true}
                />
            </div>

            {/* Minimalist Cart Shortcut (Floating) */}
            <div className="fixed top-6 right-8 pointer-events-auto z-[200]">
                <Link href="/cart" className="relative w-14 h-14 bg-[#FFFFFF] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.4)] border border-neutral-200 hover:scale-110 transition-transform group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#000000] text-[#FFFFFF] text-[12px] font-bold w-7 h-7 flex items-center justify-center rounded-full border-2 border-[#FFFFFF] shadow-xl animate-in zoom-in">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
