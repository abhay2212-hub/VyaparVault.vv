import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Waves from "@/components/Waves";
import { CartProvider } from "@/context/CartContext";
import SpeederLoader from "@/components/SpeederLoader";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "VyaparVault | Kills 99.9% Germs. Long-Lasting Freshness.",
    description: "VYAPARVAULT: Premium bathroom and toilet cleaners for a hygienic and fresh home. Trusted by 10,000+ Indian Homes.",
    keywords: "Bathroom cleaner, toilet cleaner, hygiene products, FMCG, India, VyaparVault, disinfectant",
    robots: "index, follow",
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://vyaparvault.com",
        title: "VyaparVault | Premium Hygiene Brand",
        description: "Experience the next level of cleaning with VyaparVault's premium range.",
        siteName: "VyaparVault",
    }
};

// Move viewport and themeColor to their dedicated exports per Next.js guidance
export const viewport = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
export const themeColor = "#000000";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Suspense fallback={null}>
                    <SpeederLoader />
                </Suspense>
                {/* Fixed Background Effect */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <Waves
                        lineColor="rgba(255, 255, 255, 0.2)"
                        backgroundColor="transparent"
                        waveSpeedX={0.0125}
                        waveSpeedY={0.01}
                        waveAmpX={40}
                        waveAmpY={20}
                        friction={0.9}
                        tension={0.01}
                        maxCursorMove={120}
                        xGap={12}
                        yGap={36}
                    />
                </div>

                <CartProvider>
                    <Navbar />
                    <main className="min-h-screen pt-20 relative z-10">
                        {children}
                    </main>
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}
