'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/lib/mock-data';
import { supabase, SupabaseProduct } from '@/lib/supabase';
import { Category } from '@/types';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState<Category>('todos');
    const [products, setProducts] = useState<SupabaseProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch products from Supabase
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);

            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('is_popular', { ascending: false });

                if (error) {
                    throw error;
                }

                setProducts(data || []);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('No pudimos cargar los productos. Intenta de nuevo.');
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const filteredProducts = activeCategory === 'todos'
        ? products
        : products.filter((product) => product.category === activeCategory);

    return (
        <section id="carta" className="py-20 md:py-28 bg-[var(--gray-50)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block bg-[var(--brasa-red)]/10 text-[var(--brasa-red)] text-sm font-semibold px-4 py-2 rounded-full mb-4">
                        🍗 Nuestra Carta
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--gray-800)] mb-4">
                        Elige tu <span className="text-[var(--brasa-red)]">antojo</span>
                    </h2>
                    <p className="text-[var(--gray-600)] text-lg max-w-2xl mx-auto">
                        Desde nuestro clásico pollo a la brasa hasta combos familiares.
                        Todo preparado con el sabor que nos caracteriza. Precios actualizados y accesibles
                    </p>
                </motion.div>

                {/* Category Filter Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${activeCategory === category.id
                                ? 'bg-[var(--brasa-red)] text-white shadow-lg shadow-[var(--brasa-red)]/30'
                                : 'bg-white text-[var(--gray-600)] hover:bg-[var(--cream)] hover:text-[var(--gray-800)] border border-[var(--gray-200)]'
                                }`}
                        >
                            {category.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-[var(--brasa-red)] animate-spin mb-4" />
                        <p className="text-[var(--gray-600)]">Cargando productos...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-red-50 rounded-2xl"
                    >
                        <span className="text-5xl mb-4 block">😔</span>
                        <p className="text-red-600 font-medium">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-[var(--brasa-red)] text-white rounded-full hover:bg-[var(--brasa-red-dark)] transition-colors"
                        >
                            Reintentar
                        </button>
                    </motion.div>
                )}

                {/* Products Grid */}
                {!loading && !error && (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <span className="text-6xl mb-4 block">🔍</span>
                        <p className="text-[var(--gray-600)]">
                            No hay productos en esta categoría por ahora.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
