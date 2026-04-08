'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { SupabaseProduct } from '@/lib/supabase';

export interface CartItem {
    product: SupabaseProduct;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: SupabaseProduct) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getItemQuantity: (productId: string) => number;
    totalItems: number;
    totalPrice: number;
    generateWhatsAppMessage: () => string;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    lastAddedId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [lastAddedId, setLastAddedId] = useState<string | null>(null);

    const addToCart = useCallback((product: SupabaseProduct) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
        setLastAddedId(product.id);
        // Clear the lastAddedId after animation
        setTimeout(() => setLastAddedId(null), 600);
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((item) => item.product.id !== productId));
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const getItemQuantity = useCallback(
        (productId: string) => {
            return items.find((item) => item.product.id === productId)?.quantity || 0;
        },
        [items]
    );

    const totalItems = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    const totalPrice = useMemo(
        () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        [items]
    );

    const generateWhatsAppMessage = useCallback(() => {
        if (items.length === 0) return '';

        const header = 'Hola! Me gustaría pedir:\n\n';

        const productLines = items
            .map((item) => {
                return `${item.quantity}x ${item.product.name} - S/${(item.product.price * item.quantity).toFixed(2)}`;
            })
            .join('\n');

        const total = `\n\nTotal: S/${totalPrice.toFixed(2)}`;

        return header + productLines + total;
    }, [items, totalPrice]);

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    const value = useMemo(
        () => ({
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getItemQuantity,
            totalItems,
            totalPrice,
            generateWhatsAppMessage,
            isCartOpen,
            openCart,
            closeCart,
            lastAddedId,
        }),
        [
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getItemQuantity,
            totalItems,
            totalPrice,
            generateWhatsAppMessage,
            isCartOpen,
            openCart,
            closeCart,
            lastAddedId,
        ]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
