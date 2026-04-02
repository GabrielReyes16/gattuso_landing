'use client';

import { useState, useCallback } from 'react';

export function useWhatsAppSede() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const openSelector = useCallback((whatsappMessage: string) => {
        setMessage(whatsappMessage);
        setIsOpen(true);
    }, []);

    const closeSelector = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        message,
        openSelector,
        closeSelector,
    };
}
