import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Bed, Bath, Square, Heart, Eye, Calendar, LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser } from '../../lib/supabase';
import TransparentCard from '../UI/TransparentCard';

const FeaturedProperties: React.FC = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const featuredProperties = [
    {
      id: 1,
      title: 'Executive Villa in Kinoo Heights',
      location: 'Kinoo Estate, Waiyaki Way',
      price: 12500000,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      bedrooms: 5,
      bathrooms: 4,
      area: 3200,
      featured: true,
      views: 245,
      saved: 18
    },
    {
      id: 2,
      title: 'Modern Apartment in Regen',
      location: 'Regen Estate, Waiyaki Way',
      price: 8200000,
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      featured: true,
      views: 189,
      saved: 24
    },
    {
      id: 3,
      title: 'Luxury Home in Limuru Gardens',
      location: 'Limuru Gardens, Waiyaki Way',
      price: 15000000,
      image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      bedrooms: 6,
      bathrooms: 5,
      area: 4000,
      featured: true,
      views: 312,
      saved: 31
    }
  ];

  const formatPrice = (price: number) => {
    return `KSh ${(price / 1000000).toFixed(1)}M`;
  };

  const handleBookTour = async (propertyId: number) => {
    const user = await getCurrentUser();
    if (!user) {
      // Store the intended action and redirect to login
      localStorage.setItem('intended_action', `book_tour_${propertyId}`);
      navigate('/login?message=Please sign in to book a tour so we can provide you with personalized service.');
    } else {
      // User is signed in, proceed with booking
      navigate(`/book-tour/${propertyId}`);
    }
  };
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-green-300/10 to-yellow-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 mb-4">
            <div className="w-2 h-2 bg-green-500 mr-2"></div>
            <span className="text-green-700 font-medium">Featured Properties</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Homes Await
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked luxury properties offering the perfect blend of comfort, style, and location
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <TransparentCard className="overflow-hidden h-full bg-white/95 backdrop-blur-lg border-white/50">
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay with stats */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-center text-white text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>{property.views}</span>
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            <span>{property.saved}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <span className="bg-green-600 text-white px-3 py-1 text-sm font-medium">
                      Featured
                    </span>
                    <button className="bg-white/20 backdrop-blur-sm p-2 text-white hover:bg-white/30 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-green-500" />
                      {property.location}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1 text-green-500" />
                        <span className="font-medium">{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1 text-green-500" />
                        <span className="font-medium">{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1 text-green-500" />
                        <span className="font-medium">{property.area} sq ft</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(property.price)}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBookTour(property.id)}
                        className="bg-amber-600 text-white px-4 py-2 hover:bg-amber-700 transition-colors flex items-center"
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        Book Tour
                      </button>
                      <Link
                        to={`/properties/${property.id}`}
                        className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition-colors flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Link>
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => navigate('/properties')}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
          >
            View All Properties
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;