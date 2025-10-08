import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Heart, Share2, Calendar, Phone, Mail, Car, Shield, School, Building, Clock } from 'lucide-react';
import { Property } from '../types';
import { getCurrentUser } from '../lib/supabase';
import toast from 'react-hot-toast';
import TransparentCard from '../components/UI/TransparentCard';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [user, setUser] = useState<any>(null);

  // Mock property data for demo
  const mockProperties: Property[] = [
    {
      id: '1',
      title: 'Executive Villa in Kinoo Heights',
      address: 'Kinoo Estate, Waiyaki Way',
      location: { lat: -1.2345, lng: 36.7890 },
      price: 12500000,
      images: [
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      bedrooms: 5,
      bathrooms: 4,
      property_type: 'house',
      amenities: ['Garden', 'Parking', 'Security', 'Swimming Pool', 'Gym'],
      description: 'Beautiful executive villa with modern amenities and stunning views. This property features spacious rooms, a beautiful garden, and is located in a secure, gated community.',
      area: 'Kinoo',
      size_sqft: 3200,
      status: 'available',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Modern Apartment in Regen',
      address: 'Regen Estate, Waiyaki Way',
      location: { lat: -1.2456, lng: 36.7901 },
      price: 8200000,
      images: [
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      bedrooms: 3,
      bathrooms: 2,
      property_type: 'apartment',
      amenities: ['Balcony', 'Parking', 'Security', 'Elevator', 'Backup Generator'],
      description: 'Modern apartment with contemporary design and excellent amenities. Perfect for young professionals and small families.',
      area: 'Regen',
      size_sqft: 1800,
      status: 'available',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Luxury Home in Limuru Gardens',
      address: 'Limuru Gardens, Waiyaki Way',
      location: { lat: -1.2567, lng: 36.8012 },
      price: 15000000,
      images: [
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      bedrooms: 6,
      bathrooms: 5,
      property_type: 'house',
      amenities: ['Garden', 'Study Room', 'Garage', 'Security', 'Servant Quarter', 'Fireplace'],
      description: 'Luxury home with panoramic views and executive amenities. Features include a study room, fireplace, and beautiful landscaped gardens.',
      area: 'Limuru',
      size_sqft: 4000,
      status: 'available',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    checkUser();
    loadProperty();
  }, [id]);

  const checkUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const loadProperty = () => {
    setLoading(true);
    // Find property by ID
    const foundProperty = mockProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    }
    setLoading(false);
  };

  const handleBookTour = async () => {
    if (!user) {
      localStorage.setItem('intended_action', `book_tour_${id}`);
      toast.error('Please sign in to book a tour');
      return;
    }
    toast.success('Tour booking request sent! We will contact you shortly.');
  };

  const handleSaveProperty = () => {
    if (!user) {
      toast.error('Please sign in to save properties');
      return;
    }
    toast.success('Property saved to your favorites!');
  };

  const formatPrice = (price: number) => {
    return `KSh ${(price / 1000000).toFixed(1)}M`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Link to="/properties" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-green-600">Properties</Link>
            <span>/</span>
            <span className="text-gray-900">{property.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <TransparentCard className="mb-8 overflow-hidden bg-white">
              <div className="relative">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TransparentCard>

            {/* Property Details */}
            <TransparentCard className="mb-8 p-8 bg-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    {property.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProperty}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Bed className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Square className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">{property.size_sqft}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="text-center">
                  <Building className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">{property.property_type}</div>
                  <div className="text-sm text-gray-600">Type</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TransparentCard>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <TransparentCard className="p-6 mb-6 bg-white sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">+254 701 889 930</div>
                    <div className="text-sm text-gray-600">Primary</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">oakandvalehomes@gmail.com</div>
                    <div className="text-sm text-gray-600">Email</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBookTour}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Tour
                </button>
                <button className="w-full border border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Request Info
                </button>
              </div>
            </TransparentCard>

            {/* Neighborhood Info */}
            <TransparentCard className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Neighborhood</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <School className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Schools</span>
                  </div>
                  <span className="text-gray-900 font-medium">Excellent</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Transport</span>
                  </div>
                  <span className="text-gray-900 font-medium">Very Good</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Safety</span>
                  </div>
                  <span className="text-gray-900 font-medium">High</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">CBD Distance</span>
                  </div>
                  <span className="text-gray-900 font-medium">25 mins</span>
                </div>
              </div>
            </TransparentCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;