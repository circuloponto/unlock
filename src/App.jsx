import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Navbar_notWorkingFade from './components/Navbar_notWorkingFade'
import Hero from './components/Hero'
import FirstHero from './components/FirstHero'
import React, { useEffect, useRef } from 'react';
import useSmoothScroll from './hooks/useSmoothScroll';
import Breadcrumbs from './components/Breadcrumbs';

function App() {
  const sectionsArray = [
    'section1',
    'section2',
    'section3', // horizontal section with 3 slides
    'section4',
    'section5',
    'section6',
    'section7', // horizontal section with 3 slides
    'section8'
  ];
    const horizontalSlides = [0, 0, 3, 0, 0, 0, 3, 0]; // Your horizontal slides configuration
  
  const [currentSection, setCurrentSection] = useState({ section: 0, slide: 0 });

  // Pass setCurrentSection to the hook
  useSmoothScroll(setCurrentSection);
 // Array representing each section
 
  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
  
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
  
        if (scrollPosition >= sectionTop - windowHeight/2 && 
            scrollPosition < sectionBottom - windowHeight/2) {
          
          // If it's a horizontal section, check which slide is visible
          if (section.classList.contains('horizontal-section')) {
            const slides = section.querySelectorAll('.horizontal-slide');
            
            slides.forEach((slide, slideIndex) => {
              const rect = slide.getBoundingClientRect();
              // If this slide is at the left edge of the viewport
              if (Math.abs(rect.left) < 10) { // Small threshold for snap points
                console.log('Active slide detected:', {
                  sectionIndex: index,
                  slideIndex: slideIndex,
                  className: slide.className
                });
                
                setCurrentSection({
                  section: index,
                  slide: slideIndex
                });
              }
            });
          } else {
            // Regular section
            setCurrentSection({
              section: index,
              slide: 0
            });
          }
        }
      });
    };
  
    // Listen for both vertical and horizontal scroll
    window.addEventListener('scroll', handleScroll);
    document.querySelectorAll('.horizontal-section').forEach(section => {
      section.addEventListener('scroll', handleScroll);
    });
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('.horizontal-section').forEach(section => {
        section.removeEventListener('scroll', handleScroll);
      });
    };
  }, []);

  // Handle dot clicks
  const handleDotClick = (sectionIndex, slideIndex = 0) => {
    const sections = document.querySelectorAll('.section');
    const targetSection = sections[sectionIndex];

    if (targetSection) {
      // If using Lenis
      if (window.lenis) {
        window.lenis.scrollTo(targetSection.offsetTop, {
          duration: 1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        // Fallback to native scroll
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }

      setCurrentSection({
        section: sectionIndex,
        slide: slideIndex
      });
    }
  };

  return (
    <div className='App'>

    <Navbar_notWorkingFade/>
    <Breadcrumbs 
         totalSections={sectionsArray} 
         currentSection={currentSection}
         horizontalSlides={horizontalSlides} // No need for separate horizontal slides array
         onDotClick={handleDotClick}
      />
   {/*  <Navbar/> */}
    <main data-scroll-container>
        <section data-scroll-section className="section section1" > <div 
                          data-scroll
                          data-scroll-speed="2"
                      >
                          Section 1 Content
                      </div></section>
        <section data-scroll-section className="section section2" > <div 
                          data-scroll
                          data-scroll-speed="2"
                      >
                          Section 2 Content
                      </div></section>
        <section data-scroll-section className="section section3 horizontal-section" > 
        
            <section className="horizontal-slide threePointOne">Slide 3.1</section>
            <section className="horizontal-slide threePointTwo">Slide 3.2</section>
            <section className="horizontal-slide threePointThree">Slide 3.3</section>
          
                      
        </section>

        <section data-scroll-section className="section section4" > <div 
                          data-scroll
                          data-scroll-speed="2"
                      >
                          Section 4 Content
                      </div></section>
        <section data-scroll-section className="section section5" > 
          <div 
            data-scroll
            data-scroll-speed="2"
          >Section 5 Content
          </div>
        </section>
        <section data-scroll-section className="section section6" > 
          <div 
            data-scroll
            data-scroll-speed="2"
          >Section 6 Content
          </div>
        </section>
        <section data-scroll-section className="section section7 horizontal-section" > 
          <div data-scroll data-scroll-speed="2">
          <section className="horizontal-slide threePointOne">Slide 7.1</section>
            <section className="horizontal-slide threePointTwo">Slide 7.2</section>
            <section className="horizontal-slide threePointThree">Slide 7.3</section>
          </div>
        </section>
        <section data-scroll-section className="section section8" > 
          <div 
            data-scroll
            data-scroll-speed="2"
          >Section 8 Content
          </div>
        </section>
    </main>
   
    </div>
   
  );
}

export default App;
