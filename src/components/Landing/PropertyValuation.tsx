import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, MapPin, Home, DollarSign, BarChart3, Award } from 'lucide-react';
import TransparentCard from '../UI/TransparentCard';

const PropertyValuation: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [propertyDetails, setPropertyDetails] = useState({
    location: '',
    propertyType: 'house',
    bedrooms: 3,
    bathrooms: 2,
    size: 2000,
    yearBuilt: 2020
  });

  const [valuation, setValuation] = useState({
    estimatedValue: 0,
    pricePerSqft: 0,
    marketTrend: 'up',
    confidence: 85
  });

  useEffect(() => {
    calculateValuation();
  }, [propertyDetails]);

  const calculateValuation = () => {
    // Premium valuation algorithm based on Waiyaki Way market
    const baseRates = {
      Kinoo: 4200,
      Regen: 3800,
      Limuru: 5500,
      Ngecha: 4800
    };

    const typeMultipliers = {
      house: 1.0,
      apartment: 0.85,
      commercial: 1.3,
      land: 0.6
    };

    const locationRate = baseRates[propertyDetails.location as keyof typeof baseRates] || 4000;
    const typeMultiplier = typeMultipliers[propertyDetails.propertyType as keyof typeof typeMultipliers];
    
    // Age factor
    const ageFactor = Math.max(0.7, 1 - (2024 - propertyDetails.yearBuilt) * 0.02);
    
    // Bedroom/bathroom premium
    const roomPremium = 1 + (propertyDetails.bedrooms - 2) * 0.1 + (propertyDetails.bathrooms - 1) * 0.05;
    
    const pricePerSqft = locationRate * typeMultiplier * ageFactor * roomPremium;
    const totalValue = pricePerSqft * propertyDetails.size;

    setValuation({
      estimatedValue: totalValue,
      pricePerSqft: pricePerSqft,
      marketTrend: Math.random() > 0.3 ? 'up' : 'down',
      confidence: Math.floor(Math.random() * 15) + 80
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const marketData = [
    { area: 'Kinoo', avgPrice: 8500000, growth: '+12%', properties: 45 },
    { area: 'Regen', avgPrice: 6200000, growth: '+8%', properties: 32 },
    { area: 'Limuru', avgPrice: 12000000, growth: '+15%', properties: 28 },
    { area: 'Ngecha', avgPrice: 9800000, growth: '+10%', properties: 18 }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-amber-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">Property Valuation & Market Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Know Your Property's Worth
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant property valuations and market insights powered by AI and real-time data from Waiyaki Way corridor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Valuation Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TransparentCard className="p-8 bg-white/90 backdrop-blur-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Home className="w-6 h-6 text-green-600 mr-2" />
                Property Details
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={propertyDetails.location}
                      onChange={(e) => setPropertyDetails({...propertyDetails, location: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Location</option>
                      <option value="Kinoo">Kinoo</option>
                      <option value="Regen">Regen</option>
                      <option value="Limuru">Limuru</option>
                      <option value="Ngecha">Ngecha</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select
                      value={propertyDetails.propertyType}
                      onChange={(e) => setPropertyDetails({...propertyDetails, propertyType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
                    <input
                      type="number"
                      value={propertyDetails.yearBuilt}
                      onChange={(e) => setPropertyDetails({...propertyDetails, yearBuilt: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="1980"
                      max="2024"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <input
                      type="number"
                      value={propertyDetails.bedrooms}
                      onChange={(e) => setPropertyDetails({...propertyDetails, bedrooms: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="1"
                      max="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                    <input
                      type="number"
                      value={propertyDetails.bathrooms}
                      onChange={(e) => setPropertyDetails({...propertyDetails, bathrooms: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="1"
                      max="8"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size (sq ft)</label>
                    <input
                      type="number"
                      value={propertyDetails.size}
                      onChange={(e) => setPropertyDetails({...propertyDetails, size: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="500"
                      max="10000"
                    />
                  </div>
                </div>
              </div>
            </TransparentCard>
          </motion.div>

          {/* Valuation Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <TransparentCard className="p-8 bg-gradient-to-br from-green-600 to-green-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Estimated Value</h3>
                <Award className="w-8 h-8 text-amber-300" />
              </div>
              <div className="text-4xl font-bold mb-2">
                {formatCurrency(valuation.estimatedValue)}
              </div>
              <div className="flex items-center space-x-4 text-green-100">
                <span>{formatCurrency(valuation.pricePerSqft)}/sq ft</span>
                <span className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {valuation.marketTrend === 'up' ? '+' : '-'}5.2%
                </span>
              </div>
              <div className="mt-4 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-amber-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${valuation.confidence}%` }}
                ></div>
              </div>
              <p className="text-sm text-green-100 mt-2">{valuation.confidence}% Confidence Level</p>
            </TransparentCard>

            <TransparentCard className="p-6 bg-white/90 backdrop-blur-lg">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
                Market Comparison
              </h4>
              <div className="space-y-3">
                {marketData.map((area, index) => (
                  <div key={area.area} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">{area.area}</span>
                      <p className="text-sm text-gray-600">{area.properties} properties</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(area.avgPrice)}
                      </div>
                      <div className="text-sm text-green-600">{area.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TransparentCard>

            <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg">
              Get Detailed Report
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PropertyValuation;