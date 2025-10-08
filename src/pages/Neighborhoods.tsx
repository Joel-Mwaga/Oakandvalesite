import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, School, ShoppingBag, Car, Wifi, Shield, TreePine, Building, TrendingUp, Users, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransparentCard from '../components/UI/TransparentCard';

const Neighborhoods: React.FC = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const neighborhoods = [
    {
      name: 'Kinoo',
      description: 'Vibrant community with excellent connectivity and modern amenities. Perfect for families seeking convenience and luxury.',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      properties: 45,
      avgPrice: 8500000,
      priceRange: '5M - 15M',
      growth: '+12%',
      population: '2,500+',
      amenities: [
        { icon: School, name: 'Top Schools', count: 8, description: 'Including international schools' },
        { icon: ShoppingBag, name: 'Shopping Centers', count: 5, description: 'Modern malls and markets' },
        { icon: Car, name: 'Transport Links', count: 12, description: 'Matatu routes and highways' },
        { icon: Shield, name: 'Security Level', rating: 4.8, description: 'Gated communities available' }
      ],
      highlights: ['Nairobi CBD - 25 mins', 'Westlands - 15 mins', 'JKIA - 45 mins'],
      keyFeatures: ['High-speed internet', 'Water supply 24/7', 'Electricity backup', 'Modern infrastructure']
    },
    {
      name: 'Regen',
      description: 'Peaceful residential area with lush greenery and family-friendly environment. Known for its serene atmosphere.',
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      properties: 32,
      avgPrice: 6200000,
      priceRange: '4M - 10M',
      growth: '+8%',
      population: '1,800+',
      amenities: [
        { icon: TreePine, name: 'Green Spaces', count: 6, description: 'Parks and nature trails' },
        { icon: School, name: 'Schools', count: 5, description: 'Quality education facilities' },
        { icon: Wifi, name: 'Internet Coverage', rating: 4.9, description: 'Fiber optic available' },
        { icon: Shield, name: 'Safety Rating', rating: 4.7, description: 'Community policing' }
      ],
      highlights: ['Nature Trails', 'Community Center', 'Farmers Market'],
      keyFeatures: ['Eco-friendly living', 'Community gardens', 'Walking paths', 'Family recreation']
    },
    {
      name: 'Limuru',
      description: 'Premium location with panoramic views and executive properties. The epitome of luxury living in Nairobi.',
      image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      properties: 28,
      avgPrice: 12000000,
      priceRange: '8M - 25M',
      growth: '+15%',
      population: '1,200+',
      amenities: [
        { icon: Building, name: 'Luxury Amenities', count: 10, description: 'Clubhouses and spas' },
        { icon: Car, name: 'Private Roads', count: 8, description: 'Well-maintained access' },
        { icon: TreePine, name: 'Golf Courses', count: 2, description: '18-hole championship courses' },
        { icon: Shield, name: 'Gated Communities', count: 6, description: 'Premium security' }
      ],
      highlights: ['Golf Club Access', 'Mountain Views', 'Cool Climate'],
      keyFeatures: ['Exclusive estates', 'Premium amenities', 'Scenic views', 'Executive lifestyle']
    },
    {
      name: 'Ngecha',
      description: 'Serene environment with spacious plots and countryside feel. Perfect for those seeking tranquility and space.',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      properties: 18,
      avgPrice: 9800000,
      priceRange: '6M - 18M',
      growth: '+10%',
      population: '900+',
      amenities: [
        { icon: TreePine, name: 'Large Plots', count: 15, description: 'Spacious compounds available' },
        { icon: Car, name: 'Easy Access', rating: 4.5, description: 'Good road connectivity' },
        { icon: Shield, name: 'Privacy Level', rating: 4.9, description: 'Secluded living' },
        { icon: Wifi, name: 'Connectivity', rating: 4.3, description: 'Growing infrastructure' }
      ],
      highlights: ['Spacious Compounds', 'Quiet Environment', 'Investment Potential'],
      keyFeatures: ['Rural tranquility', 'Large land sizes', 'Agricultural potential', 'Investment growth']
    }
  ];

  const formatPrice = (price: number) => {
    return `KSh ${(price / 1000000).toFixed(1)}M`;
  };

  const handleViewProperties = (area: string) => {
    navigate(`/properties?area=${area}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <MapPin className="w-4 h-4 text-green-300 mr-2" />
              <span className="text-green-200 font-medium">Neighborhood Explorer</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Your Perfect
              <span className="block text-amber-300">Neighborhood</span>
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Explore the unique character, amenities, and lifestyle of each premium location along the Waiyaki Way corridor
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Home, number: '123+', label: 'Properties Available' },
                { icon: Users, number: '6,400+', label: 'Residents' },
                { icon: TrendingUp, number: '11%', label: 'Average Growth' },
                { icon: MapPin, number: '4', label: 'Prime Locations' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-amber-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-green-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {neighborhoods.map((neighborhood, index) => (
              <motion.div
                key={neighborhood.name}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <TransparentCard className="overflow-hidden h-full bg-white/95 backdrop-blur-lg border-gray-200">
                  {/* Image Header */}
                  <div className="relative h-64">
                    <img
                      src={neighborhood.image}
                      alt={neighborhood.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-1">{neighborhood.name}</h3>
                          <p className="text-gray-200 text-sm">{neighborhood.population} residents</p>
                        </div>
                        <div className="text-right">
                          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-1">
                            {neighborhood.properties} Properties
                          </div>
                          <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {neighborhood.growth} Growth
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {neighborhood.description}
                    </p>

                    {/* Price Info */}
                    <div className="flex justify-between items-center mb-6 p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-gray-600 text-sm">Average Price</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatPrice(neighborhood.avgPrice)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 text-sm">Price Range</p>
                        <p className="text-lg font-semibold text-gray-900">
                          KSh {neighborhood.priceRange}
                        </p>
                      </div>
                    </div>

                    {/* Amenities Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {neighborhood.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <amenity.icon className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900 text-sm font-medium">{amenity.name}</p>
                            <p className="text-gray-600 text-xs">
                              {'count' in amenity ? `${amenity.count} available` : `${amenity.rating}/5.0`}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">{amenity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                      <p className="text-gray-700 font-medium mb-3">Key Features</p>
                      <div className="grid grid-cols-2 gap-2">
                        {neighborhood.keyFeatures.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <p className="text-gray-700 font-medium mb-3">Location Highlights</p>
                      <div className="flex flex-wrap gap-2">
                        {neighborhood.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleViewProperties(neighborhood.name)}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
                    >
                      View Properties in {neighborhood.name}
                    </button>
                  </div>
                </TransparentCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Explore all available properties across these premium neighborhoods
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/properties')}
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                Browse All Properties
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-700 transition-all shadow-lg"
              >
                Contact Our Experts
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Neighborhoods;