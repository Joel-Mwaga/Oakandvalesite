import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, School, ShoppingBag, Car, Wifi, Shield, TreePine, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransparentCard from '../UI/TransparentCard';

const NeighborhoodGuide: React.FC = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const neighborhoods = [
    {
      name: 'Kinoo',
      description: 'Vibrant community with excellent connectivity and modern amenities',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      properties: 45,
      avgPrice: 8500000,
      amenities: [
        { icon: School, name: 'Top Schools', count: 8 },
        { icon: ShoppingBag, name: 'Shopping Centers', count: 5 },
        { icon: Car, name: 'Transport Links', count: 12 },
        { icon: Shield, name: 'Security Level', rating: 4.8 }
      ],
      highlights: ['Nairobi CBD - 25 mins', 'Westlands - 15 mins', 'JKIA - 45 mins']
    },
    {
      name: 'Regen',
      description: 'Peaceful residential area with lush greenery and family-friendly environment',
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      properties: 32,
      avgPrice: 6200000,
      amenities: [
        { icon: TreePine, name: 'Green Spaces', count: 6 },
        { icon: School, name: 'Schools', count: 5 },
        { icon: Wifi, name: 'Internet Coverage', rating: 4.9 },
        { icon: Shield, name: 'Safety Rating', rating: 4.7 }
      ],
      highlights: ['Nature Trails', 'Community Center', 'Farmers Market']
    },
    {
      name: 'Limuru',
      description: 'Premium location with panoramic views and executive properties',
      image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      properties: 28,
      avgPrice: 12000000,
      amenities: [
        { icon: Building, name: 'Luxury Amenities', count: 10 },
        { icon: Car, name: 'Private Roads', count: 8 },
        { icon: TreePine, name: 'Golf Courses', count: 2 },
        { icon: Shield, name: 'Gated Communities', count: 6 }
      ],
      highlights: ['Golf Club Access', 'Mountain Views', 'Cool Climate']
    },
    {
      name: 'Ngecha',
      description: 'Serene environment with spacious plots and countryside feel',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      properties: 18,
      avgPrice: 9800000,
      amenities: [
        { icon: TreePine, name: 'Large Plots', count: 15 },
        { icon: Car, name: 'Easy Access', rating: 4.5 },
        { icon: Shield, name: 'Privacy Level', rating: 4.9 },
        { icon: Wifi, name: 'Connectivity', rating: 4.3 }
      ],
      highlights: ['Spacious Compounds', 'Quiet Environment', 'Investment Potential']
    }
  ];

  const formatPrice = (price: number) => {
    return `KSh ${(price / 1000000).toFixed(1)}M`;
  };

  const handleViewProperties = (area: string) => {
    navigate(`/properties?area=${area}`);
  };

  const handleExploreAll = () => {
    navigate('/neighborhoods');
  };
  return (
    <section className="py-20 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-600/10 to-green-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <MapPin className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-300 font-medium">Neighborhood Guide</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Perfect Location
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the unique character and amenities of each area along the prestigious Waiyaki Way corridor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {neighborhoods.map((neighborhood, index) => (
            <motion.div
              key={neighborhood.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <TransparentCard className="overflow-hidden h-full bg-white/5 backdrop-blur-lg border-white/10">
                <div className="relative">
                  <img
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{neighborhood.name}</h3>
                    <p className="text-gray-200 text-sm">{neighborhood.description}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {neighborhood.properties} Properties
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-gray-400 text-sm">Average Price</p>
                      <p className="text-2xl font-bold text-green-400">
                        {formatPrice(neighborhood.avgPrice)}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleViewProperties(neighborhood.name)}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      View Properties
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {neighborhood.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <amenity.icon className="w-4 h-4 text-green-400" />
                        <div>
                          <p className="text-white text-sm font-medium">{amenity.name}</p>
                          <p className="text-gray-400 text-xs">
                            {'count' in amenity ? `${amenity.count} available` : `${amenity.rating}/5.0`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Key Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {neighborhood.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-white/10 text-white px-3 py-1 rounded-full text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TransparentCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button 
            onClick={handleExploreAll}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
          >
            Explore All Neighborhoods
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default NeighborhoodGuide;