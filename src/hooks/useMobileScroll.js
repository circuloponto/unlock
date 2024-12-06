import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function useMobileScroll(setCurrentSection) {
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
        let touchStartY = 0;
      

        function handleWheel(e) {
            e.preventDefault();
            if (isScrolling) return;

            const direction = Math.sign(e.deltaY);
            handleScroll(direction);
        }

        function handleTouchStart(e) {
            touchStartY = e.touches[0].clientY;
            
            console.log('Touch StartY:',touchStartY );
        }
        function handleTouchMove(e) {
            e.preventDefault();
            const touchCurrentY = e.touches[0].clientY;
           
            const deltaY = touchStartY - touchCurrentY;
          
            
            console.log('Touch Move:', { 
                deltaY,
                direction: deltaY > 0 ? 'down' : 'up',
                currentSection
            });
        }

        function handleTouchEnd(e) {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;

            // Only process significant vertical swipes
            if (Math.abs(deltaY) > 30) {
                const direction = deltaY > 0 ? 1 : -1;
                handleScroll(direction);
            }

            console.log('Touch End:', {
                totalDeltaY: deltaY,
                direction: deltaY > 0 ? 'down' : 'up',
                currentSection
            });
        }

        function handleHorizontalScroll(direction) {
            if (isScrolling) return;

            const currentSectionElement = sections[currentSection];
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
                    } else if (index < horizontalSlide) {
                        slide.style.transform = 'translateX(-100%)';
                    } else {
                        slide.style.transform = 'translateX(100%)';
                    }
                });
                
                setTimeout(() => {
                    isScrolling = false;
                }, 400);
            }
        }

        function handleScroll(direction) {
            if (isScrolling) return;

            const currentSectionElement = sections[currentSection];

            if (currentSectionElement.classList.contains('horizontal-section')) {
                const slides = currentSectionElement.querySelectorAll('.horizontal-slide');
                const nextHorizontalSlide = horizontalSlide + direction;

                if (nextHorizontalSlide >= 0 && nextHorizontalSlide < slides.length) {
                    handleHorizontalScroll(direction);
                    return;
                }

                if ((direction > 0 && horizontalSlide === slides.length - 1) || 
                    (direction < 0 && horizontalSlide === 0)) {
                    const nextSection = currentSection + direction;
                    if (nextSection >= 0 && nextSection < sections.length) {
                        horizontalSlide = direction < 0 ? slides.length - 1 : 0;
                        scrollToSection(nextSection);
                    }
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

        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });
       

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            
            lenis.destroy();
        };
    }, []); // Keeping the empty dependency array from your working version
}