'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import { businessInfo, sedes } from '@/lib/mock-data';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const formatPhone = (phone: string) => {
        // +51918096489 → 918 096 489
        const digits = phone.replace('+51', '');
        return digits.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    };

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
                        className="lg:col-span-1"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="https://vqjxwfvwjekponwzmefh.supabase.co/storage/v1/object/public/gattuso/Logo_sin_fondo.png"
                                alt="Logo Gattuso Chicken"
                                className="h-24 w-auto"
                            />
                            <div>
                                <h3 className="text-xl font-bold text-[var(--golden-yellow)]">
                                    {businessInfo.name}
                                </h3>
                                <p className="text-sm text-gray-400">{businessInfo.slogan}</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm max-w-md">
                            Hecho con la misma pasión del primer día. El sabor auténtico y la calidad que nos identifica, servidos con el cariño de siempre.
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

                    {/* Sede 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="font-bold text-[var(--golden-yellow)] mb-4">{sedes[0].emoji} {sedes[0].name}</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href={sedes[0].mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                                >
                                    <MapPin className="w-5 h-5 text-[var(--brasa-red)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">{sedes[0].address}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${sedes[0].phone}`}
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                                >
                                    <Phone className="w-5 h-5 text-[var(--brasa-red)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">{formatPhone(sedes[0].phone)}</span>
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Sede 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="font-bold text-[var(--golden-yellow)] mb-4">{sedes[1].emoji} {sedes[1].name}</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href={sedes[1].mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                                >
                                    <MapPin className="w-5 h-5 text-[var(--brasa-red)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">{sedes[1].address}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${sedes[1].phone}`}
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                                >
                                    <Phone className="w-5 h-5 text-[var(--brasa-red)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">{formatPhone(sedes[1].phone)}</span>
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
                            Desarrollado por <a href="https://portfolio-sigma-hazel-12.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[var(--brasa-red)] hover:text-white transition-colors">Math</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
