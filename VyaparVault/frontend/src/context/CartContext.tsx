"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem('vv_cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart JSON');
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('vv_cart', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (product: any) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product._id);
            if (existing) {
                return prev.map(item => item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            const productImage = (product.images && product.images.length > 0) ? product.images[0] : (product.image || "");
            return [...prev, { id: product._id, name: product.name, price: product.price, image: productImage, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
    };

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
