import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

/* export default function useSmoothScroll() {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
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
        const navbarHeight = 70;
        const totalSections = document.querySelectorAll('.section').length;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        lenis.on('scroll', ({ scroll, velocity, direction }) => {
            if (Math.abs(velocity) < 0.1) return; // Ignore tiny movements

            const nextSection = direction > 0 ? 
                Math.min(currentSection + 1, totalSections - 1) : 
                Math.max(currentSection - 1, 0);

            if (nextSection !== currentSection) {
                lenis.scrollTo(nextSection * window.innerHeight + navbarHeight, { 
                    duration: 0.8,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
                currentSection = nextSection;
            }
        });

        const handleKeydown = (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                const nextSection = Math.min(currentSection + 1, totalSections - 1);
                if (nextSection !== currentSection) {
                    lenis.scrollTo(nextSection * window.innerHeight + navbarHeight, {
                        duration: 0.8,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                    currentSection = nextSection;
                }
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                const nextSection = Math.max(currentSection - 1, 0);
                if (nextSection !== currentSection) {
                    lenis.scrollTo(nextSection * window.innerHeight + navbarHeight, {
                        duration: 0.8,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                    currentSection = nextSection;
                }
            }
        };

        window.addEventListener('keydown', handleKeydown);

        return () => {
            lenis.destroy();
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);
} */

/* export default function useSmoothScroll() {
useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
        lenis.destroy();
    };
}, []);
} */

/* export default function useSmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 4,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        let isScrolling = false;
        let currentSection = 0;
        const sections = document.querySelectorAll('.section');
        const totalSections = sections.length;

        function scrollToSection(index) {
            if (isScrolling) return;
            isScrolling = true;
            
            lenis.scrollTo(sections[index].offsetTop, {
                duration: 0.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                lock: true,
                onComplete: () => {
                    isScrolling = false;
                    currentSection = index;
                }
            });
        }

        function handleWheel(e) {
            if (isScrolling) return;
            
            const direction = e.deltaY > 0 ? 1 : -1;
            const nextSection = Math.max(0, Math.min(currentSection + direction, totalSections - 1));
            
            if (nextSection !== currentSection) {
                e.preventDefault();
                scrollToSection(nextSection);
            }
        }

        window.addEventListener('wheel', handleWheel, { passive: false });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            lenis.destroy();
        };
    }, []);
} */


    /* this one is working, its free scrolling with smooth and fast wheel gesture, free snapping */
   /*  export default function useSmoothScroll() {
        useEffect(() => {
            const lenis = new Lenis({
                duration: 0.8,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 4,  // Increased for faster scrolling
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });
    
            let currentSection = 0;
            const sections = document.querySelectorAll('.section');
            const totalSections = sections.length;
    
            function scrollToSection(index) {
                lenis.scrollTo(sections[index].offsetTop, {
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
                currentSection = index;
            }
    
            function handleWheel(e) {
                const direction = e.deltaY > 0 ? 1 : -1;
                const nextSection = Math.max(0, Math.min(currentSection + direction, totalSections - 1));
                
                if (nextSection !== currentSection) {
                    scrollToSection(nextSection);
                }
            }
    
            window.addEventListener('wheel', handleWheel, { passive: true });
    
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
    
            requestAnimationFrame(raf);
    
            return () => {
                window.removeEventListener('wheel', handleWheel);
                lenis.destroy();
            };
        }, []);
    } */

        // this one works except using the scrollbar directly to scroll
        // export default function useSmoothScroll() {
        //     useEffect(() => {
        //         const lenis = new Lenis({
        //             duration: 0.8,
        //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //             orientation: 'vertical',
        //             gestureOrientation: 'vertical',
        //             smoothWheel: true,
        //             wheelMultiplier: 1,
        //             smoothTouch: false,
        //             touchMultiplier: 2,
        //             infinite: false,
        //         });
        
        //         let currentSection = 0;
        //         const totalSections = document.querySelectorAll('.section').length;
        //         let isScrolling = false;
        
        //         function handleWheel(e) {
        //             e.preventDefault();
                    
        //             if (isScrolling) return;
        //             isScrolling = true;
        
        //             const direction = e.deltaY > 0 ? 1 : -1;
        //             const nextSection = currentSection + direction;
        
        //             if (nextSection >= 0 && nextSection < totalSections) {
        //                 lenis.scrollTo(nextSection * window.innerHeight, {
        //                     duration: 0.4,
        //                     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //                     lock: true,
        //                     onComplete: () => {
        //                         currentSection = nextSection;
        //                         isScrolling = false;
        //                     }
        //                 });
        //             } else {
        //                 isScrolling = false;
        //             }
        //         }
        
        //         window.addEventListener('wheel', handleWheel, { passive: false });
        
        //         function raf(time) {
        //             lenis.raf(time);
        //             requestAnimationFrame(raf);
        //         }
        
        //         requestAnimationFrame(raf);
        
        //         return () => {
        //             window.removeEventListener('wheel', handleWheel);
        //             lenis.destroy();
        //         };
        //     }, []);
        // }


        // this one works on desktop but not on mobile
        // export default function useSmoothScroll() {
        //     useEffect(() => {
        //         const lenis = new Lenis({
        //             duration: 0.8,
        //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //             orientation: 'vertical',
        //             gestureOrientation: 'vertical',
        //             smoothWheel: true,
        //             wheelMultiplier: 1,
        //             smoothTouch: false,
        //             touchMultiplier: 2,
        //             infinite: false,
        //         });
        
        //         let currentSection = 0;
        //         const totalSections = document.querySelectorAll('.section').length;
        //         let isScrolling = false;
        
        //         function handleWheel(e) {
        //             e.preventDefault();
                    
        //             if (isScrolling) return;
        //             isScrolling = true;
        
        //             const direction = e.deltaY > 0 ? 1 : -1;
        //             const nextSection = currentSection + direction;
        
        //             if (nextSection >= 0 && nextSection < totalSections) {
        //                 lenis.scrollTo(nextSection * window.innerHeight, {
        //                     duration: 0.4,
        //                     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //                     lock: true,
        //                     onComplete: () => {
        //                         currentSection = nextSection;
        //                         isScrolling = false;
        //                     }
        //                 });
        //             } else {
        //                 isScrolling = false;
        //             }
        //         }
        
        //         function handleScroll() {
        //             if (isScrolling) return;
                    
        //             const currentScroll = window.scrollY;
        //             const nearestSection = Math.round(currentScroll / window.innerHeight);
                    
        //             if (nearestSection !== currentSection) {
        //                 isScrolling = true;
        //                 lenis.scrollTo(nearestSection * window.innerHeight, {
        //                     duration: 0.4,
        //                     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //                     lock: true,
        //                     onComplete: () => {
        //                         currentSection = nearestSection;
        //                         isScrolling = false;
        //                     }
        //                 });
        //             }
        //         }
        
        //         window.addEventListener('wheel', handleWheel, { passive: false });
        //         window.addEventListener('scroll', handleScroll);
        
        //         function raf(time) {
        //             lenis.raf(time);
        //             requestAnimationFrame(raf);
        //         }
        
        //         requestAnimationFrame(raf);
        
        //         return () => {
        //             window.removeEventListener('wheel', handleWheel);
        //             window.removeEventListener('scroll', handleScroll);
        //             lenis.destroy();
        //         };
        //     }, []);
        // }

        // this one works fine
        // export default function useSmoothScroll() {
        //     useEffect(() => {
        //         const lenis = new Lenis({
        //             duration: 0.8,
        //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //             orientation: 'vertical',
        //             gestureOrientation: 'vertical',
        //             smoothWheel: true,
        //             wheelMultiplier: 1,
        //             smoothTouch: false,
        //             touchMultiplier: 2,
        //             infinite: false,
        //         });
        
        //         let currentSection = 0;
        //         const totalSections = document.querySelectorAll('.section').length;
        //         let isScrolling = false;
        //         let touchStartY = 0;
        
        //         function scrollToSection(direction) {
        //             if (isScrolling) return;
        //             isScrolling = true;
        
        //             const nextSection = currentSection + direction;
        
        //             if (nextSection >= 0 && nextSection < totalSections) {
        //                 lenis.scrollTo(nextSection * window.innerHeight, {
        //                     duration: 0.4,
        //                     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //                     lock: true,
        //                     onComplete: () => {
        //                         currentSection = nextSection;
        //                         isScrolling = false;
        //                     }
        //                 });
        //             } else {
        //                 isScrolling = false;
        //             }
        //         }
        
        //         function handleWheel(e) {
        //             e.preventDefault();
        //             const direction = e.deltaY > 0 ? 1 : -1;
        //             scrollToSection(direction);
        //         }
        
        //         function handleTouchStart(e) {
        //             touchStartY = e.touches[0].clientY;
        //         }
        
        //         function handleTouchEnd(e) {
        //             const touchEndY = e.changedTouches[0].clientY;
        //             const deltaY = touchStartY - touchEndY;
                    
        //             // Minimum swipe distance threshold
        //             if (Math.abs(deltaY) > 50) {
        //                 const direction = deltaY > 0 ? 1 : -1;
        //                 scrollToSection(direction);
        //             }
        //         }
        
        //         window.addEventListener('wheel', handleWheel, { passive: false });
        //         window.addEventListener('touchstart', handleTouchStart, { passive: false });
        //         window.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        //         function raf(time) {
        //             lenis.raf(time);
        //             requestAnimationFrame(raf);
        //         }
        
        //         requestAnimationFrame(raf);
        
        //         return () => {
        //             window.removeEventListener('wheel', handleWheel);
        //             window.removeEventListener('touchstart', handleTouchStart);
        //             window.removeEventListener('touchend', handleTouchEnd);
        //             lenis.destroy();
        //         };
        //     }, []);
        // }
        // works on the way down, but not on the way up
        // export default function useSmoothScroll() {
        //     useEffect(() => {
        //         const lenis = new Lenis({
        //             duration: 0.8,
        //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //             orientation: 'vertical',
        //             gestureOrientation: 'vertical',
        //             smoothWheel: true,
        //             wheelMultiplier: 1,
        //             smoothTouch: false,
        //             touchMultiplier: 2,
        //             infinite: false,
        //         });
        
        //         let currentSection = 0;
        //         let horizontalSlide = 0;
        //         const sections = document.querySelectorAll('.section');
        //         let isScrolling = false;
        
        //         function handleWheel(e) {
        //             e.preventDefault();
        //             if (isScrolling) return;
        
        //             const direction = e.deltaY > 0 ? 1 : -1;
        //             const currentSectionElement = sections[currentSection];
        
        //             if (currentSectionElement.classList.contains('horizontal-section')) {
        //                 const slides = currentSectionElement.querySelectorAll('.horizontal-slide');
        //                 const nextHorizontalSlide = horizontalSlide + direction;
        
        //                 if (nextHorizontalSlide >= 0 && nextHorizontalSlide < slides.length) {
        //                     isScrolling = true;
        //                     horizontalSlide = nextHorizontalSlide;
                            
        //                     slides.forEach((slide, index) => {
        //                         if (index === horizontalSlide) {
        //                             slide.style.transform = 'translateX(0)';  // Current slide
        //                         } else if (index < horizontalSlide) {
        //                             slide.style.transform = 'translateX(-100%)';  // Previous slides
        //                         } else {
        //                             slide.style.transform = 'translateX(100%)';  // Next slides
        //                         }
        //                     });
                            
        //                     setTimeout(() => {
        //                         isScrolling = false;
        //                     }, 400);
        //                     return;
        //                 }
                        
        //                 if ((direction > 0 && horizontalSlide === slides.length - 1) || 
        //                     (direction < 0 && horizontalSlide === 0)) {
        //                     const nextSection = currentSection + direction;
        //                     if (nextSection >= 0 && nextSection < sections.length) {
        //                         horizontalSlide = 0;
        //                         scrollToSection(nextSection);
        //                     }
        //                 }
        //             } else {
        //                 const nextSection = currentSection + direction;
        //                 if (nextSection >= 0 && nextSection < sections.length) {
        //                     scrollToSection(nextSection);
        //                 }
        //             }
        //         }
        
        //         function scrollToSection(index) {
        //             if (isScrolling) return;
        //             isScrolling = true;
                    
        //             lenis.scrollTo(index * window.innerHeight, {
        //                 duration: 0.4,
        //                 easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //                 lock: true,
        //                 onComplete: () => {
        //                     currentSection = index;
        //                     isScrolling = false;
        //                 }
        //             });
        //         }
        
        //         window.addEventListener('wheel', handleWheel, { passive: false });
        
        //         function raf(time) {
        //             lenis.raf(time);
        //             requestAnimationFrame(raf);
        //         }
        
        //         requestAnimationFrame(raf);
        
        //         return () => {
        //             window.removeEventListener('wheel', handleWheel);
        //             lenis.destroy();
        //         };
        //     }, []);
        // }

// works on the way down, but not on the way up
        // export default function useSmoothScroll() {
        //     useEffect(() => {
               
        //         const lenis = new Lenis({
        //             duration: 0.8,
        //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //             orientation: 'vertical',
        //             gestureOrientation: 'vertical',
        //             smoothWheel: true,
        //             wheelMultiplier: 1,
        //             smoothTouch: false,
        //             touchMultiplier: 2,
        //             infinite: false,
        //         });
        
        //         let currentSection = 0;
        //         let horizontalSlide = 0;
        //         const sections = document.querySelectorAll('.section');
        //         let isScrolling = false;
        
        //         function handleWheel(e) {
        //             e.preventDefault();
        //             if (isScrolling) return;
        
        //             const direction = e.deltaY > 0 ? 1 : -1;
        //             const currentSectionElement = sections[currentSection];
        //             console.log('currentSectionElement:', currentSectionElement);
        //             if (currentSectionElement.classList.contains('horizontal-section')) {
        //                 const slides = currentSectionElement.querySelectorAll('.horizontal-slide');
        //                 const nextHorizontalSlide = horizontalSlide + direction;
        
        //                 if (nextHorizontalSlide >= 0 && nextHorizontalSlide < slides.length) {
        //                     isScrolling = true;
        //                     horizontalSlide = nextHorizontalSlide;
                            
        //                     slides.forEach((slide, index) => {
        //                         if (index === horizontalSlide) {
        //                             slide.style.transform = 'translateX(0)';  // Current slide
        //                         } else if (index < horizontalSlide) {
        //                             slide.style.transform = 'translateX(-100%)';  // Previous slides
        //                         } else {
        //                             slide.style.transform = 'translateX(100%)';  // Next slides
        //                         }
        //                     });
                            
        //                     setTimeout(() => {
        //                         isScrolling = false;
        //                     }, 400);
        //                     return;
        //                 }
                        
        //                 if ((direction > 0 && horizontalSlide === slides.length - 1) || 
        //                     (direction < 0 && horizontalSlide === 0)) {
        //                     const nextSection = currentSection + direction;
        //                     if (nextSection >= 0 && nextSection < sections.length) {
        //                         horizontalSlide = 0;
        //                         scrollToSection(nextSection);
        //                     }
        //                 }
        //             } else {
        //                 const nextSection = currentSection + direction;
        //                 if (nextSection >= 0 && nextSection < sections.length) {
        //                     scrollToSection(nextSection);
        //                 }
        //             }
        //         }
        
        //         function scrollToSection(index) {
        //             if (isScrolling) return;
        //             isScrolling = true;
                    
        //             lenis.scrollTo(index * window.innerHeight, {
        //                 duration: 0.4,
        //                 easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //                 lock: true,
        //                 onComplete: () => {
        //                     currentSection = index;
        //                     isScrolling = false;
        //                 }
        //             });
        //         }
        
        //         window.addEventListener('wheel', handleWheel, { passive: false });
        
        //         function raf(time) {
        //             lenis.raf(time);
        //             requestAnimationFrame(raf);
        //         }
        
        //         requestAnimationFrame(raf);
        
        //         return () => {
        //             window.removeEventListener('wheel', handleWheel);
        //             lenis.destroy();
        //         };
        //     }, []);
        // }
//this one works except the horizontal slider starts out of view and slides into view unecessarily
        // export default function useSmoothScroll() {
        //     useEffect(() => {
        //         const lenis = new Lenis({
        //             duration: 0.8,
        //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //             orientation: 'vertical',
        //             gestureOrientation: 'vertical',
        //             smoothWheel: true,
        //             wheelMultiplier: 1,
        //             smoothTouch: false,
        //             touchMultiplier: 2,
        //             infinite: false,
        //         });
        
        //         let currentSection = 0;
        //         let horizontalSlide = 0;
        //         const sections = document.querySelectorAll('.section');
        //         let isScrolling = false;
        
        //         function handleWheel(e) {
        //             e.preventDefault();
        //             if (isScrolling) return;
        
        //              // Normalize the scroll direction regardless of delta amount
        //     const direction = Math.sign(e.deltaY); // This will always return 1 or -1
        //             const currentSectionElement = sections[currentSection];
        
        //             if (currentSectionElement.classList.contains('horizontal-section')) {
        //                 const slides = currentSectionElement.querySelectorAll('.horizontal-slide');
        //                 const nextHorizontalSlide = horizontalSlide + direction;
        
        //                 // Handle horizontal movement within section
        //                 if (nextHorizontalSlide >= 0 && nextHorizontalSlide < slides.length) {
        //                     isScrolling = true;
        //                     horizontalSlide = nextHorizontalSlide;
                            
        //                             // Lock vertical position
        //                     // lenis.stop();
        //                     // window.scrollTo({
        //                     //     top: currentSection * window.innerHeight,
        //                     //     behavior: 'instant'
        //                     // });


        //                 // Maintain vertical position smoothly
        //                     lenis.scrollTo(currentSection * window.innerHeight, {
        //                         duration: 0.4,
        //                         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //                         lock: true
        //                     });


        //                     // Update all slides positions
        //                     slides.forEach((slide, index) => {
        //                         if (index === horizontalSlide) {
        //                             slide.style.transform = 'translateX(0)';
        //                         } else if (index < horizontalSlide) {
        //                             slide.style.transform = 'translateX(-100%)';
        //                         } else {
        //                             slide.style.transform = 'translateX(100%)';
        //                         }
        //                     });
                            
        //                     setTimeout(() => {
        //                         isScrolling = false;
        //                         //lenis.start();
        //                     }, 400);
        //                     return;
        //                 }
        
        //                 // Move to next/previous vertical section
        //                 const nextSection = currentSection + direction;
        //                 if (nextSection >= 0 && nextSection < sections.length) {
        //                     // Reset horizontal position when moving to new section
        //                     horizontalSlide = direction < 0 ? slides.length - 1 : 0;
        //                     scrollToSection(nextSection);
        //                 }
        //             } else {
        //                 const nextSection = currentSection + direction;
        //                 if (nextSection >= 0 && nextSection < sections.length) {
        //                     const nextSectionElement = sections[nextSection];
                            
        //                     // If moving to a horizontal section
        //                     if (nextSectionElement.classList.contains('horizontal-section')) {
        //                         const slides = nextSectionElement.querySelectorAll('.horizontal-slide');
        //                         horizontalSlide = direction < 0 ? slides.length - 1 : 0;
                                
        //                         // Initialize slide positions
        //                         slides.forEach((slide, index) => {
        //                             if (index === horizontalSlide) {
        //                                 slide.style.transform = 'translateX(0)';
        //                             } else if (index < horizontalSlide) {
        //                                 slide.style.transform = 'translateX(-100%)';
        //                             } else {
        //                                 slide.style.transform = 'translateX(100%)';
        //                             }
        //                         });
        //                     }
                            
        //                     scrollToSection(nextSection);
        //                 }
        //             }
        //         }
        
        //         function scrollToSection(index) {
        //             if (isScrolling) return;
        //             isScrolling = true;
                    
        //             lenis.scrollTo(index * window.innerHeight, {
        //                 duration: 0.4,
        //                 easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //                 lock: true,
        //                 onComplete: () => {
        //                     currentSection = index;
        //                     isScrolling = false;
        //                 }
        //             });
        //         }
        
        //         window.addEventListener('wheel', handleWheel, { passive: false });
        
        //         function raf(time) {
        //             lenis.raf(time);
        //             requestAnimationFrame(raf);
        //         }
        
        //         requestAnimationFrame(raf);
        
        //         return () => {
        //             window.removeEventListener('wheel', handleWheel);
        //             lenis.destroy();
        //         };
        //     }, []);
        // }

        
    // works great on desktop, but not on mobile
        // export default function useSmoothScroll() {
        //     useEffect(() => {
        //         const lenis = new Lenis({
        //             duration: 0.8,
        //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //             orientation: 'vertical',
        //             gestureOrientation: 'vertical',
        //             smoothWheel: true,
        //             wheelMultiplier: 1,
        //             smoothTouch: false,
        //             touchMultiplier: 2,
        //             infinite: false,
        //         });
        
        //         let currentSection = 0;
        //         let horizontalSlide = 0;
        //         const sections = document.querySelectorAll('.section');
        //         let isScrolling = false;
        
        //         function handleWheel(e) {
        //             e.preventDefault();
        //             if (isScrolling) return;
        
        //              // Normalize the scroll direction regardless of delta amount
        //     const direction = Math.sign(e.deltaY); // This will always return 1 or -1
        //             const currentSectionElement = sections[currentSection];
        
        //             if (currentSectionElement.classList.contains('horizontal-section')) {
        //                 const slides = currentSectionElement.querySelectorAll('.horizontal-slide');
        //                 const nextHorizontalSlide = horizontalSlide + direction;
        
        //                 // Handle horizontal movement within section
        //                 if (nextHorizontalSlide >= 0 && nextHorizontalSlide < slides.length) {
        //                     isScrolling = true;
        //                     horizontalSlide = nextHorizontalSlide;
                            
        //                             // Lock vertical position
        //                     // lenis.stop();
        //                     // window.scrollTo({
        //                     //     top: currentSection * window.innerHeight,
        //                     //     behavior: 'instant'
        //                     // });


        //                 // Maintain vertical position smoothly
        //                     lenis.scrollTo(currentSection * window.innerHeight, {
        //                         duration: 0.4,
        //                         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //                         lock: true
        //                     });


        //                     // Update all slides positions
        //                     slides.forEach((slide, index) => {
        //                         if (index === horizontalSlide) {
        //                             slide.style.transform = 'translateX(0)';
        //                         } else if (index < horizontalSlide) {
        //                             slide.style.transform = 'translateX(-100%)';
        //                         } else {
        //                             slide.style.transform = 'translateX(100%)';
        //                         }
        //                     });
                            
        //                     setTimeout(() => {
        //                         isScrolling = false;
        //                         //lenis.start();
        //                     }, 400);
        //                     return;
        //                 }
        
        //                 // Move to next/previous vertical section
        //                 const nextSection = currentSection + direction;
        //                 if (nextSection >= 0 && nextSection < sections.length) {
        //                     // Reset horizontal position when moving to new section
        //                     horizontalSlide = direction < 0 ? slides.length - 1 : 0;
        //                     scrollToSection(nextSection);
        //                 }
        //             } else {
        //                 const nextSection = currentSection + direction;
        //                 if (nextSection >= 0 && nextSection < sections.length) {
        //                     const nextSectionElement = sections[nextSection];
                            
        //                     // If moving to a horizontal section
        //                     if (nextSectionElement.classList.contains('horizontal-section')) {
        //                         const slides = nextSectionElement.querySelectorAll('.horizontal-slide');
        //                         horizontalSlide = direction < 0 ? slides.length - 1 : 0;
                                
        //                         // Initialize slide positions
        //                         slides.forEach((slide, index) => {
        //                             slide.style.transition = 'none';  // Temporarily disable transition
        //                             if (index === horizontalSlide) {
        //                                 slide.style.transform = 'translateX(0)';
        //                             } else if (index < horizontalSlide) {
        //                                 slide.style.transform = 'translateX(-100%)';
        //                             } else {
        //                                 slide.style.transform = 'translateX(100%)';
        //                             }
        //                         });
        //                            // Re-enable transitions after a brief delay
        //                     setTimeout(() => {
        //                     slides.forEach(slide => {
        //                         slide.style.transition = 'transform 0.4s ease';
        //                         });
        //                     }, 50);
        //                     }
                            
        //                     scrollToSection(nextSection);
        //                 }
        //             }
        //         }
        
        //         function scrollToSection(index) {
        //             if (isScrolling) return;
        //             isScrolling = true;
                    
        //             lenis.scrollTo(index * window.innerHeight, {
        //                 duration: 0.4,
        //                 easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //                 lock: true,
        //                 onComplete: () => {
        //                     currentSection = index;
        //                     isScrolling = false;
        //                 }
        //             });
        //         }
        
        //         window.addEventListener('wheel', handleWheel, { passive: false });
        
        //         function raf(time) {
        //             lenis.raf(time);
        //             requestAnimationFrame(raf);
        //         }
        
        //         requestAnimationFrame(raf);
        
        //         return () => {
        //             window.removeEventListener('wheel', handleWheel);
        //             lenis.destroy();
        //         };
        //     }, []);
        // }


        
   // works on mobile but not on desktop
export default function useSmoothScroll() {
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

        // Add touch event listeners
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
    }, []);
}