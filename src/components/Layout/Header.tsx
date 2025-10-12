import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, MapPin, Menu, X } from 'lucide-react';
import { getCurrentUser, signOut } from '../../lib/supabase';

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkUser();
  }, []);

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

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Oak & Vale</h1>
              <p className="text-xs text-amber-600 -mt-1">Homes</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/properties" 
              className={`font-medium transition-colors ${
                isActive('/properties') 
                  ? 'text-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Properties
            </Link>
            <Link 
              to="/map" 
              className={`font-medium transition-colors ${
                isActive('/map') 
                  ? 'text-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Map View
            </Link>
            {user && (
              <Link 
                to="/bookings" 
                className={`font-medium transition-colors ${
                  isActive('/bookings') 
                    ? 'text-green-600' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                My Bookings
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{user.user_metadata?.full_name || user.email}</span>
                </div>
                {user.user_metadata?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-amber-600 text-white px-4 py-2 font-medium hover:bg-amber-700 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 py-2 font-medium hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/properties"
                className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                to="/map"
                className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Map View
              </Link>
              {user && (
                <Link
                  to="/bookings"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
              )}
              {user ? (
                <div className="border-t pt-4 mt-4">
                  <div className="px-3 py-2 text-gray-700">
                    {user.user_metadata?.full_name || user.email}
                  </div>
                  {user.user_metadata?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-amber-600 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-red-600 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t pt-4 mt-4 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-green-600 text-white font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;