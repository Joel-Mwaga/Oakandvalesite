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
      {/* Green & Gold Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-transparent to-yellow-500/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(245,158,11,0.15),transparent_50%)]"></div>

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
          className="absolute top-40 right-32 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-lg transition-all shadow-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Properties
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewProperties}
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-lg transition-all shadow-lg"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
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
              className="group relative bg-gradient-to-br from-amber-500/90 to-yellow-600/90 backdrop-blur-md border-2 border-amber-400/50 p-6 hover:from-amber-400 hover:to-yellow-500 hover:border-amber-300 hover:shadow-xl transition-all duration-300 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <MapPin className="w-6 h-6 text-emerald-900 mx-auto mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold text-lg text-emerald-900 relative z-10">{area}</span>
              <div className="absolute -bottom-1 -right-1 w-16 h-16 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-400/30 transition-all duration-300"></div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <TransparentCard className="p-3">
          <div className="w-6 h-10 border-2 border-white/60 flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-gradient-to-b from-green-400 to-amber-400 rounded-full mt-2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <p className="text-xs text-white/80 mt-2 font-medium text-center">Explore More</p>
        </TransparentCard>
      </motion.div>
    </section>
  );
};

export default HeroSection;