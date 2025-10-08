import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Mail, Eye, CreditCard as Edit, Trash2, Plus } from 'lucide-react';
import { getCurrentUser } from '../lib/supabase';
import toast from 'react-hot-toast';
import TransparentCard from '../components/UI/TransparentCard';

interface Booking {
  id: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyImage: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const Bookings: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock bookings data
  const mockBookings: Booking[] = [
    {
      id: '1',
      propertyTitle: 'Executive Villa in Kinoo Heights',
      propertyAddress: 'Kinoo Estate, Waiyaki Way',
      propertyImage: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      propertyTitle: 'Modern Apartment in Regen',
      propertyAddress: 'Regen Estate, Waiyaki Way',
      propertyImage: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      date: '2024-01-20',
      time: '2:00 PM',
      status: 'pending',
      createdAt: '2024-01-12'
    }
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      navigate('/login?message=Please sign in to view your bookings');
      return;
    }
    setUser(currentUser);
    loadBookings();
  };

  const loadBookings = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
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

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ));
    toast.success('Booking cancelled successfully');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
              <p className="text-gray-600">Manage your property tour bookings</p>
            </div>
            <button
              onClick={() => navigate('/properties')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Book New Tour
            </button>
          </div>
        </motion.div>

        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Start exploring properties and book your first tour</p>
            <button
              onClick={() => navigate('/properties')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse Properties
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <TransparentCard className="p-6 bg-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      <img
                        src={booking.propertyImage}
                        alt={booking.propertyTitle}
                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {booking.propertyTitle}
                        </h3>
                        <p className="text-gray-600 flex items-center mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          {booking.propertyAddress}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(booking.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {booking.time}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                      <button
                        onClick={() => navigate(`/properties/${booking.id}`)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="View Property"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => navigate(`/book-tour/${booking.id}`)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Booking"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Booking"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </TransparentCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <TransparentCard className="p-6 bg-gradient-to-r from-green-50 to-amber-50">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Contact our support team for assistance with your bookings
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">+254 701 889 930</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">oakandvalehomes@gmail.com</span>
                </div>
              </div>
            </div>
          </TransparentCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Bookings;