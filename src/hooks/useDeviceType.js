import { useState, useEffect } from 'react';

export default function useDeviceType () {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            const isMobileDevice = window.innerWidth <= 480; // Adjusted to 480 pixels
            console.log('Device check:', { width: window.innerWidth, isMobile: isMobileDevice });
            setIsMobile(isMobileDevice);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return isMobile;
};