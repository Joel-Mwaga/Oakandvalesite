import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { Property, FilterOptions } from '../types';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const Properties: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: { min: 0, max: 50000000 },
    areas: [],
    propertyTypes: [],
    bedrooms: [],
    bathrooms: []
  });

  useEffect(() => {
    fetchProperties();
    
    // Apply URL parameters to filters
    const area = searchParams.get('area');
    if (area) {
      setFilters(prev => ({
        ...prev,
        areas: [area]
      }));
    }
  }, [searchParams]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      // Check if Supabase is properly configured
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'https://your-project-ref.supabase.co') {
        console.warn('Supabase not configured. Using mock data.');
        // Set mock properties data for demo purposes
        setProperties([
          {
            id: '1',
            title: 'Modern 4BR Villa in Kinoo',
            address: 'Kinoo Estate, Waiyaki Way',
            location: { lat: -1.2345, lng: 36.7890 },
            price: 8500000,
            images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop'],
            bedrooms: 4,
            bathrooms: 3,
            property_type: 'house' as const,
            amenities: ['Garden', 'Parking', 'Security'],
            description: 'Beautiful modern villa with garden',
            area: 'Kinoo' as const,
            size_sqft: 2500,
            status: 'available' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Luxury 3BR Apartment in Regen',
            address: 'Regen Estate, Waiyaki Way',
            location: { lat: -1.2456, lng: 36.7901 },
            price: 6200000,
            images: ['https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop'],
            bedrooms: 3,
            bathrooms: 2,
            property_type: 'apartment' as const,
            amenities: ['Gym', 'Pool', 'Security'],
            description: 'Luxury apartment with modern amenities',
            area: 'Regen' as const,
            size_sqft: 1800,
            status: 'available' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Executive 5BR Home in Limuru',
            address: 'Limuru Gardens, Waiyaki Way',
            location: { lat: -1.2567, lng: 36.8012 },
            price: 12000000,
            images: ['https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop'],
            bedrooms: 5,
            bathrooms: 4,
            property_type: 'house' as const,
            amenities: ['Garden', 'Study', 'Garage', 'Security'],
            description: 'Executive home with panoramic views',
            area: 'Limuru' as const,
            size_sqft: 3200,
            status: 'available' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]);
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties. Please check your connection.');
      // Set empty array to prevent further errors
      setProperties([]);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    // Search term filter
    if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !property.address.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Price range filter
    if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) {
      return false;
    }

    // Area filter
    if (filters.areas.length > 0 && !filters.areas.includes(property.area)) {
      return false;
    }

    // Property type filter
    if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.property_type)) {
      return false;
    }

    // Bedrooms filter
    if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(property.bedrooms)) {
      return false;
    }

    // Bathrooms filter
    if (filters.bathrooms.length > 0 && !filters.bathrooms.includes(property.bathrooms)) {
      return false;
    }

    return true;
  });

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `KSh ${(price / 1000000).toFixed(1)}M`;
    }
    return `KSh ${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Properties for Sale & Rent
          </h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <Link
              to="/map"
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
            >
              <MapPin className="w-5 h-5" />
              <span>Map View</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={`${filters.priceRange.min}-${filters.priceRange.max}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number);
                    setFilters(prev => ({
                      ...prev,
                      priceRange: { min, max }
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="0-50000000">All Prices</option>
                  <option value="0-2000000">Under 2M</option>
                  <option value="2000000-5000000">2M - 5M</option>
                  <option value="5000000-10000000">5M - 10M</option>
                  <option value="10000000-50000000">Above 10M</option>
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area
                </label>
                <select
                  value={filters.areas[0] || ''}
                  onChange={(e) => {
                    setFilters(prev => ({
                      ...prev,
                      areas: e.target.value ? [e.target.value] : []
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Areas</option>
                  <option value="Kinoo">Kinoo</option>
                  <option value="Regen">Regen</option>
                  <option value="Limuru">Limuru</option>
                  <option value="Ngecha">Ngecha</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  value={filters.propertyTypes[0] || ''}
                  onChange={(e) => {
                    setFilters(prev => ({
                      ...prev,
                      propertyTypes: e.target.value ? [e.target.value] : []
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="house">Houses</option>
                  <option value="apartment">Apartments</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select
                  value={filters.bedrooms[0] || ''}
                  onChange={(e) => {
                    setFilters(prev => ({
                      ...prev,
                      bedrooms: e.target.value ? [Number(e.target.value)] : []
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <select
                  value={filters.bathrooms[0] || ''}
                  onChange={(e) => {
                    setFilters(prev => ({
                      ...prev,
                      bathrooms: e.target.value ? [Number(e.target.value)] : []
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Any Bathrooms</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3+ Bathrooms</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredProperties.length} properties found
          </p>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={property.images[0] || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop'}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                      {property.area}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h3>
                    <p className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.address}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4 text-gray-600">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    {property.size_sqft && (
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>{property.size_sqft} sq ft</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(property.price)}
                    </div>
                    <Link
                      to={`/properties/${property.id}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;