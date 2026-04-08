'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartFAB() {
    const { totalItems, totalPrice, openCart, lastAddedId } = useCart();

    if (totalItems === 0) return null;

    return (
        <AnimatePresence>
            <motion.button
                key="cart-fab"
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCart}
                className="fixed bottom-24 right-6 z-[100] flex items-center gap-2.5 bg-[var(--brasa-red)] hover:bg-[var(--brasa-red-dark)] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-[var(--brasa-red)]/40 transition-colors cursor-pointer"
                aria-label="Ver carrito"
            >
                {/* Cart Icon with badge */}
                <div className="relative">
                    <ShoppingCart className="w-6 h-6" />

                    {/* Item Count Badge */}
                    <motion.span
                        key={totalItems}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-[var(--golden-yellow)] text-[var(--elegant-black)] text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
                    >
                        {totalItems > 99 ? '99+' : totalItems}
                    </motion.span>
                </div>

                {/* Total Price */}
                <span className="text-sm font-bold whitespace-nowrap">
                    S/{totalPrice.toFixed(2)}
                </span>

                {/* Pulse animation on add */}
                {lastAddedId && (
                    <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 rounded-full bg-[var(--brasa-red)]"
                    />
                )}
            </motion.button>
        </AnimatePresence>
    );
}
