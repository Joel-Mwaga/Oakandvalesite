import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, CreditCard as Edit, Trash2, Eye, Home, Users, TrendingUp, DollarSign, MapPin, Bed, Bath, Square, Calendar, Phone, Mail, User } from 'lucide-react';
import { getCurrentUser } from '../lib/supabase';
import toast from 'react-hot-toast';
import TransparentCard from '../components/UI/TransparentCard';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size_sqft: number;
  property_type: string;
  status: string;
  nearby_schools: string[];
  security_features: string[];
  distance_to_main_road: string;
  transportation: string[];
  amenities: string[];
  images: string[];
  created_at: string;
}

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  propertyTitle: string;
  propertyId: string;
  viewingDate: string;
  viewingTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  message?: string;
  bookingDate: string;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    size_sqft: '',
    property_type: 'house',
    nearby_schools: '',
    security_features: '',
    distance_to_main_road: '',
    transportation: '',
    amenities: '',
    images: ''
  });

  // Mock properties data
  const mockProperties: Property[] = [
    {
      id: '1',
      title: 'Executive Villa in Kinoo Heights',
      location: 'Kinoo',
      price: 12500000,
      bedrooms: 5,
      bathrooms: 4,
      size_sqft: 3200,
      property_type: 'house',
      status: 'available',
      nearby_schools: ['Kinoo Primary School', 'Waiyaki Way Academy'],
      security_features: ['24/7 Security', 'CCTV', 'Electric Fence'],
      distance_to_main_road: '500m to Waiyaki Way',
      transportation: ['Matatu Route', 'Uber/Bolt Available'],
      amenities: ['Swimming Pool', 'Garden', 'Parking', 'Gym'],
      images: [
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      created_at: '2024-01-10'
    },
    {
      id: '2',
      title: 'Modern Apartment in Regen',
      location: 'Regen',
      price: 8200000,
      bedrooms: 3,
      bathrooms: 2,
      size_sqft: 1800,
      property_type: 'apartment',
      status: 'available',
      nearby_schools: ['Regen Academy', 'St. Mary\'s School'],
      security_features: ['Gated Community', 'Security Guards'],
      distance_to_main_road: '200m to Waiyaki Way',
      transportation: ['Direct Matatu Access', 'Private Parking'],
      amenities: ['Balcony', 'Elevator', 'Backup Generator'],
      images: [
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      created_at: '2024-01-12'
    },
    {
      id: '3',
      title: 'Luxury Home in Limuru Gardens',
      location: 'Limuru',
      price: 15000000,
      bedrooms: 6,
      bathrooms: 5,
      size_sqft: 4000,
      property_type: 'house',
      status: 'available',
      nearby_schools: ['Limuru International School', 'Brookhouse School'],
      security_features: ['Gated Estate', '24/7 Security', 'CCTV'],
      distance_to_main_road: '1km to Waiyaki Way',
      transportation: ['Private Road Access', 'Shuttle Service'],
      amenities: ['Golf Course Access', 'Club House', 'Swimming Pool', 'Tennis Court'],
      images: [
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      created_at: '2024-01-08'
    }
  ];

  // Mock bookings data
  const mockBookings: Booking[] = [
    {
      id: '1',
      clientName: 'John Doe',
      clientEmail: 'john@example.com',
      clientPhone: '+254 700 123 456',
      propertyTitle: 'Executive Villa in Kinoo Heights',
      propertyId: '1',
      viewingDate: '2024-01-25',
      viewingTime: '10:00 AM',
      status: 'confirmed',
      message: 'Looking forward to viewing this beautiful property.',
      bookingDate: '2024-01-20'
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      clientEmail: 'jane@example.com',
      clientPhone: '+254 700 789 012',
      propertyTitle: 'Modern Apartment in Regen',
      propertyId: '2',
      viewingDate: '2024-01-28',
      viewingTime: '2:00 PM',
      status: 'pending',
      message: 'Interested in the apartment amenities.',
      bookingDate: '2024-01-22'
    },
    {
      id: '3',
      clientName: 'Michael Johnson',
      clientEmail: 'michael@example.com',
      clientPhone: '+254 700 345 678',
      propertyTitle: 'Luxury Home in Limuru Gardens',
      propertyId: '3',
      viewingDate: '2024-01-30',
      viewingTime: '11:00 AM',
      status: 'confirmed',
      message: 'Very interested in the golf course access.',
      bookingDate: '2024-01-18'
    },
    {
      id: '4',
      clientName: 'Sarah Wilson',
      clientEmail: 'sarah@example.com',
      clientPhone: '+254 700 456 789',
      propertyTitle: 'Executive Villa in Kinoo Heights',
      propertyId: '1',
      viewingDate: '2024-02-02',
      viewingTime: '3:00 PM',
      status: 'pending',
      message: 'Family of 4 looking for a spacious home.',
      bookingDate: '2024-01-24'
    }
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      console.log('Current user:', currentUser); // Debug log
      
      if (!currentUser) {
        console.log('No user found, redirecting to login');
        navigate('/login?message=Admin access required. Please sign in.');
        return;
      }
      
      if (currentUser.user_metadata?.role !== 'admin') {
        console.log('User is not admin:', currentUser.user_metadata?.role);
        navigate('/login?message=Admin access required. Please contact support.');
        return;
      }
      
      console.log('Admin user verified, loading data');
      setUser(currentUser);
      loadData();
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/login?message=Authentication error. Please try again.');
    }
  };

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setProperties(mockProperties);
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const imageUrls = formData.images.split(',').map(url => url.trim()).filter(url => url);
    
    const newProperty: Property = {
      id: editingProperty ? editingProperty.id : Date.now().toString(),
      title: formData.title,
      location: formData.location,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      size_sqft: Number(formData.size_sqft),
      property_type: formData.property_type,
      status: 'available',
      nearby_schools: formData.nearby_schools.split(',').map(s => s.trim()).filter(s => s),
      security_features: formData.security_features.split(',').map(s => s.trim()).filter(s => s),
      distance_to_main_road: formData.distance_to_main_road,
      transportation: formData.transportation.split(',').map(s => s.trim()).filter(s => s),
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(s => s),
      images: imageUrls.length > 0 ? imageUrls : ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'],
      created_at: editingProperty ? editingProperty.created_at : new Date().toISOString()
    };

    setTimeout(() => {
      if (editingProperty) {
        setProperties(properties.map(p => p.id === editingProperty.id ? newProperty : p));
        toast.success('Property updated successfully!');
      } else {
        setProperties([...properties, newProperty]);
        toast.success('Property added successfully!');
      }
      
      resetForm();
      setLoading(false);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      size_sqft: '',
      property_type: 'house',
      nearby_schools: '',
      security_features: '',
      distance_to_main_road: '',
      transportation: '',
      amenities: '',
      images: ''
    });
    setShowAddForm(false);
    setEditingProperty(null);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      size_sqft: property.size_sqft.toString(),
      property_type: property.property_type,
      nearby_schools: property.nearby_schools.join(', '),
      security_features: property.security_features.join(', '),
      distance_to_main_road: property.distance_to_main_road,
      transportation: property.transportation.join(', '),
      amenities: property.amenities.join(', '),
      images: property.images.join(', ')
    });
    setShowAddForm(true);
  };

  const handleDelete = (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== propertyId));
      toast.success('Property deleted successfully!');
    }
  };

  const handleBookingStatusChange = (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
    toast.success(`Booking ${newStatus} successfully!`);
  };

  const formatPrice = (price: number) => {
    return `KSh ${(price / 1000000).toFixed(1)}M`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { icon: Home, label: 'Total Properties', value: properties.length, color: 'text-blue-600' },
    { icon: Users, label: 'Active Bookings', value: bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length, color: 'text-green-600' },
    { icon: TrendingUp, label: 'Properties Sold', value: '12', color: 'text-purple-600' },
    { icon: DollarSign, label: 'Total Revenue', value: 'KSh 150M', color: 'text-amber-600' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.user_metadata?.full_name || user.email}</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'properties', label: 'Properties' },
              { id: 'bookings', label: 'Client Bookings' },
              { id: 'valuation', label: 'Property Valuation' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <TransparentCard className="p-6 bg-white">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </TransparentCard>
                </motion.div>
              ))}
            </div>

            {/* Recent Properties */}
            <TransparentCard className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Properties</h3>
              <div className="space-y-4">
                {properties.slice(0, 3).map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{property.title}</h4>
                        <p className="text-sm text-gray-600">{property.location} • {formatPrice(property.price)}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {property.status}
                    </span>
                  </div>
                ))}
              </div>
            </TransparentCard>

            {/* Recent Bookings */}
            <TransparentCard className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{booking.clientName}</h4>
                      <p className="text-sm text-gray-600">{booking.propertyTitle}</p>
                      <p className="text-xs text-gray-500">{formatDate(booking.viewingDate)} at {booking.viewingTime}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </TransparentCard>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            {/* Add Property Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Properties Management</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Property
              </button>
            </div>

            {/* Add/Edit Property Form */}
            {showAddForm && (
              <TransparentCard className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Executive Villa in Kinoo Heights"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <select
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select Location</option>
                        <option value="Kinoo">Kinoo</option>
                        <option value="Regen">Regen</option>
                        <option value="Limuru">Limuru</option>
                        <option value="Ngecha">Ngecha</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (KSh) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="12500000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type
                      </label>
                      <select
                        value={formData.property_type}
                        onChange={(e) => setFormData({...formData, property_type: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      >
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="commercial">Commercial</option>
                        <option value="land">Land</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="4"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size (sq ft)
                      </label>
                      <input
                        type="number"
                        value={formData.size_sqft}
                        onChange={(e) => setFormData({...formData, size_sqft: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="3200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Distance to Main Road
                      </label>
                      <input
                        type="text"
                        value={formData.distance_to_main_road}
                        onChange={(e) => setFormData({...formData, distance_to_main_road: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="500m to Waiyaki Way"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nearby Schools (comma separated)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.nearby_schools}
                        onChange={(e) => setFormData({...formData, nearby_schools: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder="Kinoo Primary School, Waiyaki Way Academy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Security Features (comma separated)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.security_features}
                        onChange={(e) => setFormData({...formData, security_features: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder="24/7 Security, CCTV, Electric Fence"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transportation (comma separated)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.transportation}
                        onChange={(e) => setFormData({...formData, transportation: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder="Matatu Route, Uber/Bolt Available"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amenities (comma separated)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.amenities}
                        onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder="Swimming Pool, Garden, Parking, Gym"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Images (comma separated URLs)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.images}
                      onChange={(e) => setFormData({...formData, images: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Add multiple image URLs separated by commas. If left empty, a default image will be used.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : (editingProperty ? 'Update Property' : 'Add Property')}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </TransparentCard>
            )}

            {/* Properties List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <TransparentCard key={property.id} className="p-6 bg-white">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{property.title}</h3>
                    <p className="text-gray-600 flex items-center mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </p>
                    <div className="text-xl font-bold text-green-600 mb-4">
                      {formatPrice(property.price)}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.size_sqft}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {property.status}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/properties/${property.id}`)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(property)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </TransparentCard>
              ))}
            </div>
          </div>
        )}

        {/* Client Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Client Bookings</h2>
              <div className="text-sm text-gray-600">
                Total Bookings: {bookings.length}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <TransparentCard className="p-6 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <User className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{booking.clientName}</h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2" />
                              {booking.clientEmail}
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2" />
                              {booking.clientPhone}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Property</p>
                        <p className="text-gray-900">{booking.propertyTitle}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Viewing Date & Time</p>
                        <div className="flex items-center text-gray-900">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(booking.viewingDate)} at {booking.viewingTime}
                        </div>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">Client Message</p>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{booking.message}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Booked on: {formatDate(booking.bookingDate)}</span>
                      <div className="flex space-x-2">
                        {booking.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleBookingStatusChange(booking.id, 'confirmed')}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                              Confirm
                            </button>
                            <button 
                              onClick={() => handleBookingStatusChange(booking.id, 'cancelled')}
                              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        <a
                          href={`mailto:${booking.clientEmail}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Email Client
                        </a>
                        <button
                          onClick={() => navigate(`/properties/${booking.propertyId}`)}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                        >
                          View Property
                        </button>
                      </div>
                    </div>
                  </TransparentCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Property Valuation Tab */}
        {activeTab === 'valuation' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Property Valuation Tool</h2>
            <TransparentCard className="p-8 bg-white">
              <div className="text-center py-16">
                <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Property Valuation System</h3>
                <p className="text-gray-600 mb-6">
                  Advanced AI-powered property valuation tool for accurate market assessments
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-green-800 font-medium">
                    This feature provides comprehensive property valuations based on:
                  </p>
                  <ul className="text-green-700 text-sm mt-2 space-y-1">
                    <li>• Location and neighborhood analysis</li>
                    <li>• Property specifications and amenities</li>
                    <li>• Market trends and comparable sales</li>
                    <li>• Infrastructure and accessibility factors</li>
                  </ul>
                </div>
              </div>
            </TransparentCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;