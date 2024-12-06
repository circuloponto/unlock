import hamburgerIcon from '../assets/hamburger.svg';
import { useState,useEffect } from 'react';




const Navbar = () => {


    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 900);
      };
  
      // Set initial value
      handleResize();
  
      // Add event listener
      window.addEventListener('resize', handleResize);
  
      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };


    return (

        <div className="navContainer">
            <div className='nav-background'></div>
 
            <div className="logo"></div>

                {isMobile ? (
                    <>
                    <img  onClick={toggleMenu} src={hamburgerIcon} alt="Menu" className="hamburger-icon" />
                    <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                        <div className="menuItemsContainerMobile">
                            <div className="menuItem1">{/* about */}</div>
                                <div className="menuItem2">{/* objectives */}</div>
                                <div className="menuItem3">{/* stakeholders */}</div>
                                <div className="menuItem4">{/* field reports */}</div>
                            </div>
                    </div> 
                    </>
    ) : (

        <div className="menuItemsContainer">
            <div className="menuItem1">{/* about */}</div>
            <div className="menuItem2">{/* objectives */}</div>
            <div className="menuItem3">{/* stakeholders */}</div>
            <div className="menuItem4">{/* field reports */}</div>
        </div>


      )
      }
            
        </div>
      );
}
 
export default Navbar;