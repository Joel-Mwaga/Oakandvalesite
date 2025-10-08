import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Menu, X } from 'lucide-react';
import { getCurrentUser, signOut } from '../../lib/supabase';
import OakValeLogo from '../UI/OakValeLogo';

const TransparentHeader: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [navbarStyle, setNavbarStyle] = useState({
    background: 'transparent',
    backdropFilter: 'none',
    borderColor: 'transparent'
  });
  const location = useLocation();

  useEffect(() => {
    checkUser();
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      
      // Detect current section and adapt navbar style
      detectCurrentSection(scrollY);
    };

    const detectCurrentSection = (scrollY: number) => {
      // Define section boundaries and their corresponding styles
      const sections = [
        {
          name: 'hero',
          start: 0,
          end: 800,
          style: {
            background: scrollY > 50 ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            backdropFilter: scrollY > 50 ? 'blur(20px) saturate(180%)' : 'none',
            borderColor: scrollY > 50 ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
          }
        },
        {
          name: 'properties',
          start: 800,
          end: 1600,
          style: {
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(25px) saturate(200%)',
            borderColor: 'rgba(255, 255, 255, 0.2)'
          }
        },
        {
          name: 'map',
          start: 1600,
          end: 2400,
          style: {
            background: 'rgba(5, 150, 105, 0.1)',
            backdropFilter: 'blur(30px) saturate(150%)',
            borderColor: 'rgba(5, 150, 105, 0.2)'
          }
        },
        {
          name: 'neighborhoods',
          start: 2400,
          end: 3200,
          style: {
            background: 'rgba(17, 24, 39, 0.1)',
            backdropFilter: 'blur(25px) saturate(180%)',
            borderColor: 'rgba(255, 255, 255, 0.15)'
          }
        },
        {
          name: 'footer',
          start: 3200,
          end: Infinity,
          style: {
            background: 'rgba(17, 24, 39, 0.2)',
            backdropFilter: 'blur(20px) saturate(160%)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }
        }
      ];

      // Check for white background pages
      const whiteBackgroundPages = ['/login', '/signup', '/properties', '/admin', '/contact', '/about'];
      const isWhitePage = whiteBackgroundPages.includes(location.pathname);
      
      if (isWhitePage) {
        setNavbarStyle({
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderColor: 'rgba(0, 0, 0, 0.1)'
        });
        setCurrentSection('white-page');
        return;
      }

      // Find current section based on scroll position
      const currentSectionData = sections.find(section => 
        scrollY >= section.start && scrollY < section.end
      ) || sections[0];

      setCurrentSection(currentSectionData.name);
      setNavbarStyle(currentSectionData.style);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const checkUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  // Dynamic text colors based on current section
  const getTextColor = (isActive: boolean) => {
    const isWhitePage = currentSection === 'white-page';
    
    if (isActive) {
      return isWhitePage ? 'text-green-600' : 'text-green-300';
    }
    
    if (isWhitePage) {
      return 'text-gray-900 hover:text-green-600';
    }
    
    // Dynamic colors based on section
    switch (currentSection) {
      case 'hero':
        return 'text-white/90 hover:text-white';
      case 'properties':
        return 'text-gray-800 hover:text-green-600';
      case 'map':
        return 'text-white/90 hover:text-green-300';
      case 'neighborhoods':
        return 'text-white/90 hover:text-white';
      case 'footer':
        return 'text-white/90 hover:text-white';
      default:
        return 'text-white/90 hover:text-white';
    }
  };

  const getLogoColor = () => {
    const isWhitePage = currentSection === 'white-page';
    return isWhitePage ? 'text-green-600' : 'text-white';
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
      style={{
        background: navbarStyle.background,
        backdropFilter: navbarStyle.backdropFilter,
        borderBottom: `1px solid ${navbarStyle.borderColor}`,
        boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <OakValeLogo size={48} animate={true} />
            <div>
              <h1 className={`text-lg font-bold ${getLogoColor()} transition-colors duration-300`}>
                Oak & Vale
              </h1>
              <p className="text-xs -mt-1 text-amber-500 transition-colors duration-300">
                Premium Homes
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Compact Left Side */}
          <div className="hidden lg:flex items-center space-x-4 ml-8">
            <Link 
              to="/properties" 
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-md ${getTextColor(isActive('/properties'))}`}
            >
              Properties
            </Link>
            <Link 
              to="/neighborhoods" 
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-md ${getTextColor(isActive('/neighborhoods'))}`}
            >
              Areas
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-md ${getTextColor(isActive('/about'))}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-md ${getTextColor(isActive('/contact'))}`}
            >
              Contact
            </Link>
            {user && (
              <Link 
                to="/bookings" 
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-md ${getTextColor(isActive('/bookings'))}`}
              >
                Bookings
              </Link>
            )}
          </div>

          {/* User Menu - Right Side */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-2 ${getLogoColor()} transition-colors duration-300`}>
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium truncate max-w-32">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                {user.user_metadata?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-all hover:scale-105 shadow-lg"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className={`text-sm font-medium transition-all hover:scale-105 px-2 py-1 rounded-md ${
                    currentSection === 'white-page' 
                      ? 'text-gray-700 hover:text-red-600' 
                      : 'text-white/90 hover:text-red-400'
                  }`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`text-sm font-medium transition-all hover:scale-105 px-2 py-1 rounded-md ${getTextColor(false)}`}
                >
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors duration-300 ${getLogoColor()} hover:text-green-300`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div 
            className="px-2 pt-2 pb-6 space-y-1 rounded-b-xl border-t mt-2"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <Link
              to="/properties"
              className="block px-3 py-3 text-white hover:text-green-300 font-medium rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              to="/neighborhoods"
              className="block px-3 py-3 text-white hover:text-green-300 font-medium rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Areas
            </Link>
            <Link
              to="/about"
              className="block px-3 py-3 text-white hover:text-green-300 font-medium rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-3 text-white hover:text-green-300 font-medium rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {user && (
              <Link
                to="/bookings"
                className="block px-3 py-3 text-white hover:text-green-300 font-medium rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Bookings
              </Link>
            )}
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              {user ? (
                <div>
                  <div className="px-3 py-2 text-white font-medium">
                    {user.user_metadata?.full_name || user.email}
                  </div>
                  {user.user_metadata?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-3 py-3 text-amber-300 font-medium rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-3 text-red-400 font-medium rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-3 text-white hover:text-green-300 font-medium rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium text-center hover:from-green-700 hover:to-green-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default TransparentHeader;