import hamburgerIcon from '../assets/hamburger.svg';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(true);  // New state for menu visibility
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    // Existing mobile detection useEffect
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // New scroll detection useEffect
    /* useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 60;
            setIsScrolled(window.scrollY > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    */

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 60;
            const isNowScrolled = window.scrollY > scrollThreshold;
            
            if (isNowScrolled !== isScrolled) {
                if (!isNowScrolled) {  // When scrolling back to top
                    setShowMenu(false);
                    setTimeout(() => setShowMenu(true), 300); // Delay matching navbar transition
                }
                setIsScrolled(isNowScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);
 const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const iconColor = isPressed ? 'rgb(183, 187, 202)' : isHovered ? 'rgb(167, 144, 144)' : 'rgb(222, 222, 222)';
    return (
        <div className={`navContainer ${isScrolled ? 'scrolled' : ''}`}>
            <div className={`nav-background ${isScrolled ? 'scrolled' : ''}`}></div>
            <div className={`logo ${isScrolled ? 'scrolled' : ''}`}></div>

            {isMobile ? (
                <>
                   <div 
                        onClick={toggleMenu} 
                        className={`hamburger-icon ${isScrolled ? 'scrolled' : ''}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                       /*  onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)} */
                        style={{ cursor: 'pointer' }}
                    >
                        <svg width="150" height="163" viewBox="0 0 150 163" fill={iconColor} xmlns="http://www.w3.org/2000/svg">
                            <rect className="hamburger-icon-rect" y="54" width="150" height="50" rx="10" />
                            <rect width="45" height="40" rx="10" />
                            <rect x="53" width="45" height="40" rx="10" />
                            <rect x="105" width="45" height="40" rx="10" />
                            <rect y="118" width="60" height="45" rx="10" />
                            <rect x="90" y="118" width="60" height="45" rx="10" />
                        </svg>
                    </div>
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
                isScrolled ? (
                   <>
                        <img
                        onClick={toggleMenu}
                        style={{display: 'flex'}}
                        src={hamburgerIcon}
                        alt="Menu"
                        className={`hamburger-icon ${isScrolled ? 'scrolled' : ''}`} />
                        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                            <div className="menuItemsContainerMobile">
                                <div className="menuItem1">{/* about */}</div>
                                <div className="menuItem2">{/* objectives */}</div>
                                <div className="menuItem3">{/* stakeholders */}</div>
                                <div className="menuItem4">{/* field reports */}</div>
                            </div>
                        </div>
                    </>
                
                )
            : (
                showMenu && (  // Only show menu items if showMenu is true
                    <div className="menuItemsContainer">
                        <div className="menuItem1">{/* about */}</div>
                        <div className="menuItem2">{/* objectives */}</div>
                        <div className="menuItem3">{/* stakeholders */}</div>
                        <div className="menuItem4">{/* field reports */}</div>
                    </div>
                )
                )
               
            )}
        </div>
    );
};

export default Navbar;