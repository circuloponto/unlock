import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function useDesktopScroll(setCurrentSection) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        let currentSection = 0;
        let horizontalSlide = 0;
        const sections = document.querySelectorAll('.section');
        let isScrolling = false;

        function handleWheel(e) {
            e.preventDefault();
            if (isScrolling) return;

            const direction = Math.sign(e.deltaY);
            const currentSectionElement = sections[currentSection];

            if (currentSectionElement.classList.contains('horizontal-section')) {
                const slides = currentSectionElement.querySelectorAll('.horizontal-slide');
                const nextHorizontalSlide = horizontalSlide + direction;

                if (nextHorizontalSlide >= 0 && nextHorizontalSlide < slides.length) {
                    isScrolling = true;
                    horizontalSlide = nextHorizontalSlide;

                    lenis.scrollTo(currentSection * window.innerHeight, {
                        duration: 0.4,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        lock: true
                    });

                    slides.forEach((slide, index) => {
                        if (index === horizontalSlide) {
                            slide.style.transform = 'translateX(0)';
                            // Fire custom event when slide becomes active
                            const event = new CustomEvent('slideChange', {
                                detail: { section: currentSection, slide: index }
                            });
                            window.dispatchEvent(event);
                        } else if (index < horizontalSlide) {
                            slide.style.transform = 'translateX(-100%)';
                        } else {
                            slide.style.transform = 'translateX(100%)';
                        }
                    });
                    
                    setTimeout(() => {
                        isScrolling = false;
                    }, 400);
                    return;
                }

                const nextSection = currentSection + direction;
                if (nextSection >= 0 && nextSection < sections.length) {
                    horizontalSlide = direction < 0 ? slides.length - 1 : 0;
                    scrollToSection(nextSection);
                }
            } else {
                const nextSection = currentSection + direction;
                if (nextSection >= 0 && nextSection < sections.length) {
                    const nextSectionElement = sections[nextSection];
                    
                    if (nextSectionElement.classList.contains('horizontal-section')) {
                        const slides = nextSectionElement.querySelectorAll('.horizontal-slide');
                        horizontalSlide = direction < 0 ? slides.length - 1 : 0;
                        
                        slides.forEach((slide, index) => {
                            slide.style.transition = 'none';
                            if (index === horizontalSlide) {
                                slide.style.transform = 'translateX(0)';
                                // Fire custom event when entering horizontal section
                                const event = new CustomEvent('slideChange', {
                                    detail: { section: nextSection, slide: index }
                                });
                                window.dispatchEvent(event);
                            } else if (index < horizontalSlide) {
                                slide.style.transform = 'translateX(-100%)';
                            } else {
                                slide.style.transform = 'translateX(100%)';
                            }
                        });
                        setTimeout(() => {
                            slides.forEach(slide => {
                                slide.style.transition = 'transform 0.4s ease';
                            });
                        }, 50);
                    }
                    
                    scrollToSection(nextSection);
                }
            }
        }

        function scrollToSection(index) {
            if (isScrolling) return;
            isScrolling = true;
            
            lenis.scrollTo(index * window.innerHeight, {
                duration: 0.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                lock: true,
                onComplete: () => {
                    currentSection = index;
                    isScrolling = false;
                }
            });
        }

        // Listen for the custom event
        window.addEventListener('slideChange', (e) => {
            console.log('Slide changed:', e.detail);
            setCurrentSection(e.detail);
        });

        window.addEventListener('wheel', handleWheel, { passive: false });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('slideChange', (e) => {
                console.log('Slide changed:', e.detail);
            });
            lenis.destroy();
        };
    }, [setCurrentSection]);
}