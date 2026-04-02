'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Truck, CheckCircle2, XCircle } from 'lucide-react';
import { businessHours, deliveryZones, businessInfo, sedes } from '@/lib/mock-data';
import WhatsAppSedeSelector from './WhatsAppSedeSelector';
import { useWhatsAppSede } from '@/hooks/useWhatsAppSede';
import dynamic from 'next/dynamic';

// Leaflet requires window/document, so we must load it client-side only
const SedesMap = dynamic(() => import('./SedesMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-gradient-to-br from-[var(--cream-light)] to-[var(--cream)] flex items-center justify-center rounded-3xl">
            <div className="text-center">
                <span className="text-4xl">🗺️</span>
                <p className="text-sm text-[var(--gray-600)] mt-2">Cargando mapa...</p>
            </div>
        </div>
    ),
});


function parseTime(timeStr: string): number | null {
    if (!timeStr || timeStr.trim() === '') return null;

    // Parse "5:00 pm" or "12:00 am" format
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
    if (!match) return null;

    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toLowerCase();

    // Convert to 24h format
    if (period === 'am' && hours === 12) hours = 0;
    else if (period === 'pm' && hours !== 12) hours += 12;

    return hours * 60 + minutes;
}

function formatTimeDisplay(timeStr: string, context: 'table' | 'open' | 'close' = 'table'): string {
    if (!timeStr || timeStr.trim() === '') return '';

    // Replace 12:00 am with Medianoche, 12:00 pm with Mediodía
    const isMidday = timeStr.toLowerCase().includes('12:00 pm');
    const isMidnight = timeStr.toLowerCase().includes('12:00 am');

    if (isMidday) {
        if (context === 'table') return 'Mediodía';
        if (context === 'close') return 'el mediodía';  // "hasta el mediodía"
        return 'al mediodía';  // "abre al mediodía"
    }
    if (isMidnight) {
        if (context === 'table') return 'Medianoche';
        if (context === 'close') return 'la medianoche';  // "hasta la medianoche"
        return 'a la medianoche';  // "abre a la medianoche"
    }

    // For regular times
    if (context === 'close') return `las ${timeStr}`;  // "hasta las 5:00 pm"
    if (context === 'open') return `a las ${timeStr}`;  // "abre a las 5:00 pm"
    return timeStr;
}

function isOpenNow(): { isOpen: boolean; message: string } {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    // Map JS day (0=Sun) to our array index (0=Lunes)
    const dayIndex = day === 0 ? 6 : day - 1;
    const todayHours = businessHours[dayIndex];

    // Check if closed today (empty open/close)
    if (!todayHours.open || !todayHours.close) {
        const nextDay = businessHours[(dayIndex + 1) % 7];
        return {
            isOpen: false,
            message: nextDay.open ? `Cerrado - Abrimos mañana ${formatTimeDisplay(nextDay.open, 'open')}` : 'Cerrado hoy'
        };
    }

    const openTime = parseTime(todayHours.open);
    const closeTime = parseTime(todayHours.close);

    if (openTime === null || closeTime === null) {
        return { isOpen: false, message: 'Horario no disponible' };
    }

    // Handle midnight closing (12:00 am = 0 minutes, but means end of day)
    const effectiveCloseTime = closeTime === 0 ? 24 * 60 : closeTime;

    if (currentTime >= openTime && currentTime < effectiveCloseTime) {
        return { isOpen: true, message: `Abierto hasta ${formatTimeDisplay(todayHours.close, 'close')}` };
    } else if (currentTime < openTime) {
        return { isOpen: false, message: `Abre ${formatTimeDisplay(todayHours.open, 'open')}` };
    } else {
        // Find next open day
        for (let i = 1; i <= 7; i++) {
            const nextDayIndex = (dayIndex + i) % 7;
            const nextDayHours = businessHours[nextDayIndex];
            if (nextDayHours.open) {
                const dayName = i === 1 ? 'mañana' : nextDayHours.day;
                return { isOpen: false, message: `Cerrado - Abrimos ${dayName} ${formatTimeDisplay(nextDayHours.open, 'open')}` };
            }
        }
        return { isOpen: false, message: 'Cerrado' };
    }
}


export default function Contact() {
    const { isOpen, message } = isOpenNow();
    const { isOpen: sedeOpen, message: sedeMessage, openSelector, closeSelector } = useWhatsAppSede();

    return (
        <>
        <section id="ubicanos" className="py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block bg-[var(--warm-orange)]/10 text-[var(--warm-orange)] text-sm font-semibold px-4 py-2 rounded-full mb-4">
                        📍 Ubícanos
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--gray-800)] mb-4">
                        Te esperamos <span className="text-[var(--warm-orange)]">aquí</span>
                    </h2>
                    <p className="text-[var(--gray-600)] text-lg max-w-2xl mx-auto">
                        Visítanos o pide delivery. ¡Llegamos a tu puerta con el pollo calientito!
                    </p>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden shadow-xl h-[400px] lg:h-full min-h-[400px]"
                    >
                        <SedesMap />

                        {/* Map Overlay Card - Both Sedes */}
                        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg z-[10]">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-[var(--brasa-red)] p-2 rounded-xl">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="font-bold text-[var(--gray-800)]">{businessInfo.name}</h4>
                            </div>
                            <div className="space-y-2">
                                {sedes.map((sede) => (
                                    <div key={sede.id} className="flex items-center gap-2 text-sm">
                                        <span className="font-semibold text-[var(--brasa-red)] whitespace-nowrap">{sede.name}:</span>
                                        <span className="text-[var(--gray-600)] truncate">{sede.address}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Hours Card */}
                        <div className="bg-[var(--cream-light)] rounded-3xl p-6 border border-[var(--cream)]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[var(--warm-orange)] p-2.5 rounded-xl">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--gray-800)]">Horarios de Atención</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                        <span className={`text-sm font-medium ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                                            {message}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {businessHours.map((schedule) => {
                                    const isClosed = !schedule.open || !schedule.close;
                                    return (
                                        <div
                                            key={schedule.day}
                                            className={`flex justify-between items-center text-sm py-2.5 px-4 rounded-lg ${isClosed ? 'bg-red-50' : 'bg-white/50'}`}
                                        >
                                            <span className="text-[var(--gray-600)] font-medium">{schedule.day}</span>
                                            <span className={`font-semibold text-right ${isClosed ? 'text-red-500' : 'text-[var(--gray-800)]'}`}>
                                                {isClosed ? 'Cerrado' : `${formatTimeDisplay(schedule.open)} - ${formatTimeDisplay(schedule.close)}`}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Delivery Zones Card */}
                        <div className="bg-[var(--gray-50)] rounded-3xl p-6 border border-[var(--gray-100)]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[var(--golden-yellow)] p-2.5 rounded-xl">
                                    <Truck className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--gray-800)]">Zonas de Delivery</h3>
                                    <p className="text-sm text-[var(--gray-600)]">Llegamos en 30 minutos o menos</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {deliveryZones.map((zone) => (
                                    <div
                                        key={zone.name}
                                        className="flex items-center gap-2 text-sm py-1.5 px-3 rounded-lg bg-white"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span className="text-[var(--gray-700)]">{zone.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact CTA */}
                        <div className="bg-gradient-to-r from-[var(--brasa-red)] to-[var(--warm-orange)] rounded-3xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-white/20 p-2.5 rounded-xl">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold">¿Tienes alguna pregunta?</h3>
                                    <p className="text-sm opacity-90">Contáctanos directamente</p>
                                </div>
                            </div>

                            <button
                                onClick={() => openSelector(businessInfo.whatsappMessage)}
                                className="flex items-center justify-center gap-2 bg-white text-[var(--brasa-red)] font-bold py-3 px-6 rounded-full hover:bg-[var(--cream)] transition-colors w-full cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Escríbenos por WhatsApp
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div >
        </section >

            <WhatsAppSedeSelector
                isOpen={sedeOpen}
                onClose={closeSelector}
                message={sedeMessage}
            />
        </>
    );
}
