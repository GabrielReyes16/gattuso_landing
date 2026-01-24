'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SupabaseProduct } from '@/lib/supabase';
import { businessInfo } from '@/lib/mock-data';

interface ProductCardProps {
    product: SupabaseProduct;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
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

    // WhatsApp message with product name
    const whatsappMessage = `¡Hola! Me interesa el ${product.name} (S/${Number(product.price).toFixed(2)})`;
    const whatsappUrl = `https://wa.me/${businessInfo.phone}?text=${encodeURIComponent(whatsappMessage)}`;

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

            {/* Image Container */}
            <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-[var(--cream-light)] to-[var(--cream)]">
                {hasImage ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

                    <motion.a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Pedir
                    </motion.a>
                </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-[var(--golden-yellow-light)] to-[var(--warm-orange)] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
        </motion.article>
    );
}

