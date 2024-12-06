import { useState, useEffect } from 'react';


export default function Breadcrumbs({ totalSections, currentSection, horizontalSlides, onDotClick }) {
  const [activeIndex, setActiveIndex] = useState(currentSection);

  useEffect(() => {
    setActiveIndex(currentSection);
  }, [currentSection]);

  const handleDotClick = (sectionIndex, slideIndex = 0) => {
    // Call the parent's scroll function
    onDotClick(sectionIndex, slideIndex);
  };

  return (
    <div className="breadcrumb-container">
      {totalSections.map((section, index) => (
  <div key={index}>
    {/* Only render the main dot if this section doesn't have horizontal slides */}
    {horizontalSlides[index] === 0 && (
      <div
        className={`dot ${currentSection.section === index ? 'active' : ''}`}
        onClick={() => onDotClick(index)}
      />
    )}
    
    {/* Render slide dots if this is a horizontal section */}
    {horizontalSlides[index] > 0 && (
      <div className="horizontal-dots">
        {[...Array(horizontalSlides[index])].map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`small-dot ${
              currentSection.section === index && 
              currentSection.slide === slideIndex ? 'active' : ''
            }`}
            onClick={() => onDotClick(index, slideIndex)}
          />
        ))}
      </div>
    )}
  </div>
))}
    </div>
  );
}