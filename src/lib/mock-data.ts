import { Product, CategoryFilter, BusinessHours, DeliveryZone } from '@/types';

export const categories: CategoryFilter[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'brasas', label: '🍗 Brasas' },
    { id: 'combos', label: '🍟 Combos' },
    { id: 'bebidas', label: '🥤 Bebidas' },
];

export const products: Product[] = [
    // Brasas
    {
        id: '1',
        name: '1/4 Pollo a la Brasa',
        description: 'Jugoso cuarto de pollo con papas fritas, ensalada y cremas.',
        price: 18.90,
        image: '/images/cuarto-pollo.webp',
        category: 'brasas',
        isPopular: true,
    },
    {
        id: '2',
        name: '1/2 Pollo a la Brasa',
        description: 'Medio pollo dorado al carbón con papas, ensalada y ají.',
        price: 32.90,
        image: '/images/medio-pollo.webp',
        category: 'brasas',
        isPopular: true,
    },
    {
        id: '3',
        name: 'Pollo Entero a la Brasa',
        description: 'Pollo entero para compartir con papas, ensalada y salsas.',
        price: 59.90,
        image: '/images/pollo-entero.webp',
        category: 'brasas',
        isPopular: true,
    },
    {
        id: '4',
        name: 'Pollo Broaster',
        description: 'Crujiente pollo broaster con papas fritas y ensalada.',
        price: 24.90,
        image: '/images/pollo-broaster.webp',
        category: 'brasas',
    },
    // Combos
    {
        id: '5',
        name: 'Combo Familiar',
        description: 'Pollo entero + 2 porciones de papas + bebida 1.5L + ensalada.',
        price: 79.90,
        image: '/images/combo-familiar.webp',
        category: 'combos',
        isPopular: true,
    },
    {
        id: '6',
        name: 'Combo Pareja',
        description: '1/2 pollo + papas + 2 bebidas personales + salsas.',
        price: 45.90,
        image: '/images/combo-pareja.webp',
        category: 'combos',
    },
    {
        id: '7',
        name: 'Combo Personal',
        description: '1/4 pollo + papas + bebida personal + ensalada.',
        price: 22.90,
        image: '/images/combo-personal.webp',
        category: 'combos',
    },
    {
        id: '8',
        name: 'Combo Mega',
        description: '2 pollos enteros + 3 porciones papas + bebida 3L + ensaladas.',
        price: 139.90,
        image: '/images/combo-mega.webp',
        category: 'combos',
    },
    // Bebidas
    {
        id: '9',
        name: 'Chicha Morada',
        description: 'Refrescante chicha morada casera. Jarra 1L.',
        price: 12.90,
        image: '/images/chicha-morada.webp',
        category: 'bebidas',
    },
    {
        id: '10',
        name: 'Inca Kola 1.5L',
        description: 'La bebida del sabor nacional.',
        price: 9.90,
        image: '/images/inca-kola.webp',
        category: 'bebidas',
    },
    {
        id: '11',
        name: 'Limonada Frozen',
        description: 'Limonada helada con hierbabuena. Vaso grande.',
        price: 8.90,
        image: '/images/limonada.webp',
        category: 'bebidas',
    },
    {
        id: '12',
        name: 'Cerveza Personal',
        description: 'Cerveza helada para acompañar tu pollo.',
        price: 7.90,
        image: '/images/cerveza.webp',
        category: 'bebidas',
    },
];

export const businessHours: BusinessHours[] = [
    { day: 'Lunes', open: '', close: '' },  // Cerrado
    { day: 'Martes', open: '5:00 pm', close: '12:00 am' },
    { day: 'Miércoles', open: '5:00 pm', close: '12:00 am' },
    { day: 'Jueves', open: '5:00 pm', close: '12:00 am' },
    { day: 'Viernes', open: '5:00 pm', close: '12:00 am' },
    { day: 'Sábado', open: '12:00 pm', close: '12:00 am' },
    { day: 'Domingo', open: '12:00 pm', close: '12:00 am' },
];

export const deliveryZones: DeliveryZone[] = [
    { name: 'La Victoria', available: true },
    { name: 'San Luis', available: true },
    { name: 'Lince', available: true },
    { name: 'Centro de Lima', available: true },

];

export const sedes = [
    {
        id: 'sede1',
        name: 'Sede 1',
        phone: '+51918096489',
        address: 'Jr. Italia 1024, La Victoria',
        lat: -12.070077669576502,
        lng: -77.02040640849546,
        mapsUrl: 'https://maps.app.goo.gl/QZJSzopNnt84tG7TA',
        emoji: '📍',
    },
    {
        id: 'sede2',
        name: 'Sede 2',
        phone: '+51901925250',
        address: 'Pje. Ignacio Cossio 231, La Victoria',
        lat: -12.078827686035714,
        lng: -77.01358813732985,
        mapsUrl: 'https://maps.app.goo.gl/1pV7Rmkc4ncivGvn9',
        emoji: '📍',
    },
];

export const businessInfo = {
    name: 'Gattuso Chicken',
    slogan: 'Haaaaarta crema',
    phone: '+51901925250',
    address: 'Pasaje Ignacio Cossio 231, La Victoria, Lima',
    whatsappMessage: '¡Hola! Quiero hacer un pedido.',
};
