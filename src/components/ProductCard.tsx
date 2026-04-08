'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SupabaseProduct } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react';

interface ProductCardProps {
    product: SupabaseProduct;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    const { addToCart, updateQuantity, getItemQuantity } = useCart();
    const quantity = getItemQuantity(product.id);
    const isInCart = quantity > 0;

    // Emoji fallback based on category
    const getCategoryEmoji = (category: string) => {
        switch (category) {
            case 'brasas': return '🍗';
            case 'combos': return '🍱';
            case 'bebidas': return '🥤';
            default: return '🍽️';
        }
    };

    const hasImage = product.image_url && product.image_url.trim() !== '';

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[var(--gray-100)]"
        >
            {/* Popular Badge */}
            {product.is_popular && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[var(--warm-orange)] to-[var(--brasa-red)] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    🔥 Popular
                </div>
            )}

            {/* In-Cart Badge */}
            {isInCart && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 z-10 bg-green-500 text-white text-xs font-bold w-7 h-7 rounded-full shadow-lg flex items-center justify-center"
                >
                    <Check size={14} strokeWidth={3} />
                </motion.div>
            )}

            {/* Image Container */}
            <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-[var(--cream-light)] to-[var(--cream)]">
                {hasImage ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading={index < 4 ? "eager" : "lazy"}
                        priority={index < 4}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIRAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABgRAAMBAQAAAAAAAAAAAAAAAAABAgMR/9oADAMBAAIRAxEAPwC1t3dF/YXEVtqE8U8DuFeVlKuhJ6JA6I/tWaKKmyKXI5tn/9k="
                    />
                ) : (
                    // Fallback emoji when no image
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                            {getCategoryEmoji(product.category)}
                        </span>
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-[var(--gray-800)] mb-2 group-hover:text-[var(--brasa-red)] transition-colors">
                    {product.name}
                </h3>

                <p className="text-sm text-[var(--gray-600)] mb-4 line-clamp-2">
                    {product.description}
                </p>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xs text-[var(--gray-600)]">S/</span>
                        <span className="text-2xl font-bold text-[var(--brasa-red)]">
                            {Number(product.price).toFixed(2)}
                        </span>
                    </div>

                    {/* Add to cart / Quantity controls */}
                    {!isInCart ? (
                        <button
                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                            className="flex items-center gap-1.5 bg-[var(--brasa-red)] hover:bg-[var(--brasa-red-dark)] text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer active:scale-95"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Agregar
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, quantity - 1); }}
                                className="w-9 h-9 rounded-full bg-[var(--gray-100)] hover:bg-[var(--gray-200)] active:bg-[var(--gray-200)] flex items-center justify-center transition-colors text-[var(--gray-800)] cursor-pointer"
                                aria-label="Disminuir cantidad"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="text-base font-bold text-[var(--gray-800)] w-7 text-center select-none">
                                {quantity}
                            </span>
                            <button
                                onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, quantity + 1); }}
                                className="w-9 h-9 rounded-full bg-[var(--brasa-red)] hover:bg-[var(--brasa-red-dark)] active:bg-[var(--brasa-red-dark)] text-white flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="Aumentar cantidad"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </motion.article>
    );
}
