'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { sedes } from '@/lib/mock-data';

// Custom marker icon using a red pin SVG (avoids Leaflet's default icon issues with bundlers)
const createSedeIcon = () => {
    return L.divIcon({
        className: 'sede-marker',
        html: `
            <div style="position: relative; width: 36px; height: 48px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="36" height="48">
                    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#e11d48"/>
                    <circle cx="12" cy="11" r="5" fill="white"/>
                    <circle cx="12" cy="11" r="2.5" fill="#e11d48"/>
                </svg>
            </div>
        `,
        iconSize: [36, 48],
        iconAnchor: [18, 48],
        popupAnchor: [0, -48],
    });
};

export default function SedesMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Calculate center between both sedes
        const centerLat = sedes.reduce((sum, s) => sum + s.lat, 0) / sedes.length;
        const centerLng = sedes.reduce((sum, s) => sum + s.lng, 0) / sedes.length;

        // Create map
        const map = L.map(mapRef.current, {
            center: [centerLat, centerLng],
            zoom: 15,
            scrollWheelZoom: false,
            zoomControl: true,
        });

        // Use CartoDB Voyager tiles (clean, modern look, free)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20,
        }).addTo(map);

        // Add markers for each sede
        const icon = createSedeIcon();
        const bounds: L.LatLngExpression[] = [];

        sedes.forEach((sede) => {
            const marker = L.marker([sede.lat, sede.lng], { icon }).addTo(map);
            bounds.push([sede.lat, sede.lng]);

            // Create popup content
            marker.bindPopup(
                `<div style="font-family: 'Outfit', system-ui, sans-serif; padding: 4px 0; min-width: 160px;">
                    <strong style="font-size: 14px; color: #262626;">${sede.name}</strong>
                    <p style="font-size: 12px; color: #525252; margin: 4px 0 8px 0; line-height: 1.4;">${sede.address}</p>
                    <a href="${sede.mapsUrl}" 
                       target="_blank" rel="noopener noreferrer"
                       style="display: inline-flex; align-items: center; gap: 4px; background: #e11d48; color: white; 
                              padding: 6px 12px; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: 600;">
                        📍 Cómo llegar
                    </a>
                </div>`,
                { closeButton: true, className: 'sede-popup' }
            );
        });

        // Fit map to show all markers with padding
        if (bounds.length > 1) {
            map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [50, 50] });
        }

        mapInstanceRef.current = map;

        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    return (
        <>
            <style jsx global>{`
                .sede-marker {
                    background: transparent !important;
                    border: none !important;
                }
                .sede-popup .leaflet-popup-content-wrapper {
                    border-radius: 16px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                    padding: 4px;
                }
                .sede-popup .leaflet-popup-tip {
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                }
                .leaflet-control-zoom a {
                    border-radius: 8px !important;
                    width: 32px !important;
                    height: 32px !important;
                    line-height: 32px !important;
                    font-size: 16px !important;
                }
                .leaflet-control-zoom {
                    border: none !important;
                    border-radius: 10px !important;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
                }
            `}</style>
            <div
                ref={mapRef}
                className="w-full h-full rounded-3xl"
                style={{ minHeight: '400px', zIndex: 1 }}
            />
        </>
    );
}
