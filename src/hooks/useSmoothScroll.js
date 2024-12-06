import useDeviceType from './useDeviceType';
import useMobileScroll from './useMobileScroll';
import useDesktopScroll from './useDesktopScroll';
import { useEffect } from 'react';

export default function useSmoothScroll(setCurrentSection) {
    const isMobile = useDeviceType();

    //console.log('Current device is:', isMobile ? 'Mobile' : 'Desktop');
    useEffect(() => {
        console.log('SmoothScroll initialized with:', isMobile ? 'Mobile' : 'Desktop');
    }, [isMobile]);
    
    if (isMobile) {
        useMobileScroll(setCurrentSection);
    } else {
        useDesktopScroll(setCurrentSection);
    }
}