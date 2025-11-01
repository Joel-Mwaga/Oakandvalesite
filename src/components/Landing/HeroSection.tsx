import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Play, Star } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import TransparentCard from '../UI/TransparentCard';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    propertyType: ''
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchFilters.location) params.set('area', searchFilters.location);
    if (searchFilters.priceMin) params.set('priceMin', searchFilters.priceMin);
    if (searchFilters.priceMax) params.set('priceMax', searchFilters.priceMax);
    if (searchFilters.bedrooms) params.set('bedrooms', searchFilters.bedrooms);
    if (searchFilters.propertyType) params.set('type', searchFilters.propertyType);
    
    navigate(`/properties?${params.toString()}`);
  };

  const handleViewProperties = () => {
    navigate('/properties');
  };

  const handleLocationClick = (location: string) => {
    navigate(`/properties?area=${location}`);
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/20251011_151919.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Animated Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-40 w-48 h-48 bg-yellow-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 20, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -25, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Main Heading */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              Find Your Dream Home
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
              in Nature's Embrace
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Discover elegant homes nestled in lush greenery from Kinoo to Ngecha. 
            Where modern architecture meets natural beauty along Nairobi's most prestigious corridor.
          </motion.p>
        </div>

        {/* Advanced Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-12"
        >
          <TransparentCard className="p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                  <select
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                  >
                    <option value="" className="bg-gray-800 text-white">Select Location</option>
                    <option value="Kinoo" className="bg-gray-800 text-white">Kinoo</option>
                    <option value="Regen" className="bg-gray-800 text-white">Regen</option>
                    <option value="Limuru" className="bg-gray-800 text-white">Limuru</option>
                    <option value="Ngecha" className="bg-gray-800 text-white">Ngecha</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Min Price</label>
                <input
                  type="text"
                  placeholder="KSh 2M"
                  value={searchFilters.priceMin}
                  onChange={(e) => setSearchFilters({...searchFilters, priceMin: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Max Price</label>
                <input
                  type="text"
                  placeholder="KSh 20M"
                  value={searchFilters.priceMax}
                  onChange={(e) => setSearchFilters({...searchFilters, priceMax: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Bedrooms</label>
                <select
                  value={searchFilters.bedrooms}
                  onChange={(e) => setSearchFilters({...searchFilters, bedrooms: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                >
                  <option value="" className="bg-gray-800 text-white">Any</option>
                  <option value="1" className="bg-gray-800 text-white">1+</option>
                  <option value="2" className="bg-gray-800 text-white">2+</option>
                  <option value="3" className="bg-gray-800 text-white">3+</option>
                  <option value="4" className="bg-gray-800 text-white">4+</option>
                  <option value="5" className="bg-gray-800 text-white">5+</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="flex items-center justify-center px-8 py-4 bg-green-600/30 hover:bg-green-600/40 backdrop-blur-sm border border-green-400/50 hover:border-green-300 text-white font-bold text-lg transition-all shadow-lg rounded-full"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Properties
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewProperties}
                className="flex items-center justify-center px-8 py-4 bg-green-600/30 hover:bg-green-600/40 backdrop-blur-sm border border-green-400/50 hover:border-green-300 text-white font-bold text-lg transition-all shadow-lg rounded-full"
              >
                <Filter className="w-5 h-5 mr-2" />
                View All Properties
              </motion.button>
            </div>
          </TransparentCard>
        </motion.div>

        {/* Location Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16"
        >
          {['Kinoo', 'Regen', 'Limuru', 'Ngecha'].map((area, index) => (
            <motion.button
              key={area}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLocationClick(area)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              className="group relative bg-green-600/20 backdrop-blur-sm border border-green-400/30 px-4 py-2 hover:bg-green-600/30 hover:border-green-300/50 transition-all duration-300 text-center"
            >
              <MapPin className="w-4 h-4 text-green-400 mx-auto mb-1 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium text-sm text-white relative z-10">{area}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator - Mouse Shape */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-10 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center bg-white/10 backdrop-blur-sm">
          <motion.div
            className="w-1.5 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <p className="text-xs text-white/90 mt-3 font-medium">Explore More</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;