export interface Property {
  id: string;
  title: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  price: number;
  images: string[];
  video_url?: string;
  bedrooms: number;
  bathrooms: number;
  property_type: 'house' | 'apartment' | 'commercial' | 'land';
  amenities: string[];
  description: string;
  area: 'Kinoo' | 'Regen' | 'Limuru' | 'Ngecha';
  size_sqft?: number;
  status: 'available' | 'sold' | 'rented';
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'client' | 'admin';
  created_at: string;
}

export interface Booking {
  id: string;
  property_id: string;
  user_id: string;
  viewing_date: string;
  viewing_time: string;
  status: 'pending' | 'paid' | 'confirmed' | 'completed' | 'cancelled';
  payment_id?: string;
  payment_status: 'pending' | 'completed' | 'failed';
  fee_amount: number;
  created_at: string;
  updated_at: string;
  property?: Property;
  user?: User;
}

export interface Payment {
  id: string;
  booking_id: string;
  user_id: string;
  amount: number;
  mpesa_transaction_id?: string;
  mpesa_receipt_number?: string;
  phone_number: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  areas: string[];
  propertyTypes: string[];
  bedrooms: number[];
  bathrooms: number[];
}