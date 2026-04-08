'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import WhatsAppSedeSelector from './WhatsAppSedeSelector';
import { useWhatsAppSede } from '@/hooks/useWhatsAppSede';

export default function CartDrawer() {
    const {
        items,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        generateWhatsAppMessage,
        isCartOpen,
        closeCart,
    } = useCart();

    const { isOpen: isSedeSelectorOpen, message, openSelector, closeSelector } = useWhatsAppSede();

    const handleSendOrder = () => {
        const msg = generateWhatsAppMessage();
        openSelector(msg);
    };

    const handleSedeClose = () => {
        closeSelector();
        clearCart();
        closeCart();
    };

    // Emoji fallback based on category
    const getCategoryEmoji = (category: string) => {
        switch (category) {
            case 'brasas': return '🍗';
            case 'combos': return '🍱';
            case 'bebidas': return '🥤';
            default: return '🍽️';
        }
    };

    return (
        <>
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeCart}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150]"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 z-[151] w-full sm:w-[420px] bg-white shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--gray-200)]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[var(--brasa-red)]/10 rounded-xl flex items-center justify-center">
                                        <ShoppingBag className="w-5 h-5 text-[var(--brasa-red)]" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-[var(--gray-800)]">Tu Pedido</h2>
                                        <p className="text-xs text-[var(--gray-600)]">
                                            {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeCart}
                                    className="p-2 rounded-full hover:bg-[var(--gray-100)] transition-colors text-[var(--gray-600)]"
                                    aria-label="Cerrar carrito"
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            {/* Items List */}
                            <div className="flex-1 overflow-y-auto px-5 py-4">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                        <span className="text-6xl mb-4">🛒</span>
                                        <p className="text-[var(--gray-800)] font-semibold text-lg mb-1">
                                            Tu carrito está vacío
                                        </p>
                                        <p className="text-[var(--gray-600)] text-sm">
                                            Agrega productos desde nuestra carta
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => {
                                            const hasImage = item.product.image_url && item.product.image_url.trim() !== '';

                                            return (
                                                <motion.div
                                                    key={item.product.id}
                                                    layout
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="flex gap-3 bg-[var(--gray-50)] rounded-2xl p-3"
                                                >
                                                    {/* Product Image */}
                                                    <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-[var(--cream-light)]">
                                                        {hasImage ? (
                                                            <Image
                                                                src={item.product.image_url}
                                                                alt={item.product.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="64px"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <span className="text-2xl">
                                                                    {getCategoryEmoji(item.product.category)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Product Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-bold text-[var(--gray-800)] truncate">
                                                            {item.product.name}
                                                        </h4>
                                                        <p className="text-sm text-[var(--brasa-red)] font-semibold mt-0.5">
                                                            S/{(item.product.price * item.quantity).toFixed(2)}
                                                        </p>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.product.id,
                                                                        item.quantity - 1
                                                                    )
                                                                }
                                                                className="w-7 h-7 rounded-lg bg-white border border-[var(--gray-200)] flex items-center justify-center hover:bg-[var(--gray-100)] transition-colors text-[var(--gray-600)]"
                                                                aria-label="Disminuir cantidad"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="text-sm font-bold text-[var(--gray-800)] w-6 text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.product.id,
                                                                        item.quantity + 1
                                                                    )
                                                                }
                                                                className="w-7 h-7 rounded-lg bg-white border border-[var(--gray-200)] flex items-center justify-center hover:bg-[var(--gray-100)] transition-colors text-[var(--gray-600)]"
                                                                aria-label="Aumentar cantidad"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="self-start p-1.5 rounded-lg hover:bg-red-50 text-[var(--gray-600)] hover:text-red-500 transition-colors"
                                                        aria-label="Eliminar producto"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Footer — Total + Send Button */}
                            {items.length > 0 && (
                                <div className="border-t border-[var(--gray-200)] px-5 py-4 space-y-3 bg-white">
                                    {/* Total */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-[var(--gray-600)] font-medium">Total del pedido</span>
                                        <span className="text-xl font-bold text-[var(--gray-800)]">
                                            S/{totalPrice.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Send Order Button */}
                                    <motion.button
                                        onClick={handleSendOrder}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-2xl font-bold text-base transition-colors shadow-lg shadow-green-500/30 cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Enviar pedido por WhatsApp
                                    </motion.button>

                                    {/* Clear Cart */}
                                    <button
                                        onClick={clearCart}
                                        className="w-full text-center text-sm text-[var(--gray-600)] hover:text-red-500 transition-colors py-1"
                                    >
                                        Vaciar carrito
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <WhatsAppSedeSelector
                isOpen={isSedeSelectorOpen}
                onClose={handleSedeClose}
                message={message}
            />
        </>
    );
}
