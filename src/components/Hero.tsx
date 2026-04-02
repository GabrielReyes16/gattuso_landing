'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { businessInfo } from '@/lib/mock-data';
import WhatsAppSedeSelector from './WhatsAppSedeSelector';
import { useWhatsAppSede } from '@/hooks/useWhatsAppSede';

export default function Hero() {
    const { isOpen, message, openSelector, closeSelector } = useWhatsAppSede();

    return (
        <>
            <section
                id="inicio"
                className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--cream-light)] via-white to-[var(--cream)]" />

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--warm-orange)]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-48 h-48 bg-[var(--brasa-red)]/10 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[var(--golden-yellow)]/20 rounded-full blur-2xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left order-2 lg:order-1"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 bg-[var(--golden-yellow)]/20 text-[var(--gray-800)] px-4 py-2 rounded-full text-sm font-medium mb-6"
                            >
                                <span className="animate-pulse">🔥</span>
                                <span>Recién salido del horno</span>
                            </motion.div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                                <span className="text-[var(--gray-800)]">El Pollo que</span>
                                <br />
                                <span className="bg-gradient-to-r from-[var(--brasa-red)] via-[var(--warm-orange)] to-[var(--golden-yellow)] bg-clip-text text-transparent">
                                    Enamora Lima
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-[var(--gray-600)] mb-8 max-w-xl mx-auto lg:mx-0">
                                Doradito por fuera, jugoso por dentro. Nuestro pollo a la brasa
                                con el <strong className="text-[var(--brasa-red)]">sabor de siempre</strong>,
                                preparado con carbón y el toque secreto de la casa.
                                ¡Pide ya y antójate! 🍗
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <motion.a
                                    href="#carta"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center gap-2 bg-[var(--brasa-red)] hover:bg-[var(--brasa-red-dark)] text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-[var(--brasa-red)]/30"
                                >
                                    Ver Carta
                                    <ChevronDown className="animate-bounce" size={20} />
                                </motion.a>

                                <motion.button
                                    onClick={() => openSelector(businessInfo.whatsappMessage)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-green-500/30 cursor-pointer"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </motion.button>
                            </div>

                            {/* Trust Badges - Hidden on mobile */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="hidden sm:flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 text-sm text-[var(--gray-600)]"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--golden-yellow)]">★★★★★</span>
                                    <span>4.9 en Google</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>🚀</span>
                                    <span>Delivery en 20 min</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>❤️</span>
                                    <span>Hecho con amor</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative order-1 lg:order-2"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--warm-orange)]/30 to-[var(--brasa-red)]/30 rounded-full blur-3xl scale-75" />

                            {/* Image Container */}
                            <div className="relative animate-float">
                                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] mx-auto">
                                    {/* Circular Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--warm-orange)] to-[var(--brasa-red)] rounded-full opacity-20" />

                                    {/* Hero Image */}
                                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[var(--cream)] to-[var(--golden-yellow-light)] flex items-center justify-center overflow-hidden shadow-2xl">
                                        <img
                                            src="https://vqjxwfvwjekponwzmefh.supabase.co/storage/v1/object/public/gattuso/mostrito.webp"
                                            alt="Pollo a la brasa Gattuso"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Floating Elements */}
                                    <motion.div
                                        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="absolute -top-2 -right-2 bg-white rounded-2xl shadow-xl p-3"
                                    >
                                        <span className="text-3xl">🍟</span>
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                                        transition={{ duration: 3.5, repeat: Infinity }}
                                        className="absolute -bottom-2 -left-2 bg-white rounded-2xl shadow-xl p-3"
                                    >
                                        <span className="text-3xl">🥗</span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator - Hidden on mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <a href="#carta" className="flex flex-col items-center gap-2 text-[var(--gray-600)] hover:text-[var(--brasa-red)] transition-colors">
                        <span className="text-sm">Descubre nuestra carta</span>
                        <ChevronDown className="animate-bounce" size={24} />
                    </a>
                </motion.div>
            </section>

            <WhatsAppSedeSelector
                isOpen={isOpen}
                onClose={closeSelector}
                message={message}
            />
        </>
    );
}
