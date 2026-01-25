'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { businessInfo } from '@/lib/mock-data';

const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#carta', label: 'Carta' },
    { href: '#ubicanos', label: 'Ubícanos' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 inset-x-0 z-[100] bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <a href="#inicio" className="flex items-center gap-3 group">
                        <img
                            src="https://vqjxwfvwjekponwzmefh.supabase.co/storage/v1/object/public/gattuso/Logo_sin_fondo.png"
                            alt="Logo Gattuso Chicken"
                            className="h-16 md:h-20 w-auto"
                        />
                        <div className="flex flex-col">
                            <span className="text-lg md:text-xl font-bold text-[var(--brasa-red)] group-hover:text-[var(--brasa-red-dark)] transition-colors">
                                {businessInfo.name}
                            </span>
                            <span className="text-[10px] text-[var(--gray-600)] hidden sm:block">
                                {businessInfo.slogan}
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="relative text-[var(--gray-800)] hover:text-[var(--brasa-red)] font-medium transition-colors group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--brasa-red)] group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                        <a
                            href={`https://wa.me/${businessInfo.phone}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[var(--brasa-red)] hover:bg-[var(--brasa-red-dark)] text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-[var(--brasa-red)]/30"
                        >
                            Pedir Ahora
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-[var(--gray-800)] hover:text-[var(--brasa-red)] transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-[var(--gray-200)] overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className="block py-3 px-4 text-[var(--gray-800)] hover:text-[var(--brasa-red)] hover:bg-[var(--cream-light)] rounded-lg font-medium transition-all"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href={`https://wa.me/${businessInfo.phone}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleLinkClick}
                                className="block w-full text-center bg-[var(--brasa-red)] hover:bg-[var(--brasa-red-dark)] text-white py-3 rounded-full font-semibold transition-all"
                            >
                                🍗 Pedir Ahora
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
