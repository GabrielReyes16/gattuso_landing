'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { businessInfo } from '@/lib/mock-data';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--elegant-black)] text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">🍗</span>
                            <div>
                                <h3 className="text-xl font-bold text-[var(--golden-yellow)]">
                                    {businessInfo.name}
                                </h3>
                                <p className="text-sm text-gray-400">{businessInfo.slogan}</p>
                            </div>
                        </div>
                        <p className="text-gray-400 max-w-md mb-6">
                            Hecho con la misma pasión del primer día. El sabor auténtico y la calidad que nos identifica, servidos con el cariño de siempre
                        </p>


                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="font-bold text-[var(--golden-yellow)] mb-4">Navegación</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#inicio" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[var(--brasa-red)] rounded-full" />
                                    Inicio
                                </a>
                            </li>
                            <li>
                                <a href="#carta" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[var(--brasa-red)] rounded-full" />
                                    Nuestra Carta
                                </a>
                            </li>
                            <li>
                                <a href="#ubicanos" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[var(--brasa-red)] rounded-full" />
                                    Ubícanos
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="font-bold text-[var(--golden-yellow)] mb-4">Contacto</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-[var(--brasa-red)] flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{businessInfo.address}</span>
                            </li>
                            <li>
                                <a
                                    href={`tel:${businessInfo.phone}`}
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                                >
                                    <Phone className="w-5 h-5 text-[var(--brasa-red)]" />
                                    <span className="text-sm">{businessInfo.phone}</span>
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                        <p>© {currentYear} {businessInfo.name}. Todos los derechos reservados.</p>
                        <p className="flex items-center gap-2">
                            Hecho con <span className="text-[var(--brasa-red)]">❤️</span> en Lima, Perú
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
