"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const SpeederLoader = () => {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Show loader on initial mount and small delay for transition feel
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    if (!loading) return null;

    return (
        <div className="loader-container">
            <div className="loader">
                <span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className="base">
                    <span></span>
                    <div className="face"></div>
                </div>
            </div>
            <div className="longfazers">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default SpeederLoader;
