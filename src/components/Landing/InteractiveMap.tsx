import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Home, DollarSign, Bed, Bath } from 'lucide-react';
import TransparentCard from '../UI/TransparentCard';

const InteractiveMap: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState({ lat: -1.2308, lng: 36.7616 });

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDyYbyBXjQo6pK0CgbR0_2RdNqsjGi2_CE'
  });

  // Mock properties with accurate coordinates along Waiyaki Way corridor
  const properties = [
    {
      id: 1,
      title: 'Executive Villa in Kinoo Heights',
      location: { lat: -1.2280, lng: 36.7538 },
      price: 12500000,
      bedrooms: 5,
      bathrooms: 4,
      area: 'Kinoo',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Modern Apartment in Regen',
      location: { lat: -1.2295, lng: 36.7620 },
      price: 8200000,
      bedrooms: 3,
      bathrooms: 2,
      area: 'Regen',
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Luxury Home in Limuru Gardens',
      location: { lat: -1.2342, lng: 36.7842 },
      price: 15000000,
      bedrooms: 6,
      bathrooms: 5,
      area: 'Limuru',
      image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Serene Estate in Ngecha',
      location: { lat: -1.2415, lng: 36.8065 },
      price: 9800000,
      bedrooms: 4,
      bathrooms: 3,
      area: 'Ngecha',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const mapStyles = [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [{ weight: "2.00" }]
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [{ color: "#9c9c9c" }]
    },
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [{ visibility: "on" }]
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#f2f2f2" }]
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ saturation: -100 }, { lightness: 45 }]
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#eeeeee" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#7b7b7b" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [{ visibility: "simplified" }]
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#46bcec" }, { visibility: "on" }]
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#c8d7d4" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#070707" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ffffff" }]
    }
  ];

  const formatPrice = (price: number) => {
    return `KSh ${(price / 1000000).toFixed(1)}M`;
  };

  const onMarkerClick = useCallback((property: any) => {
    setSelectedProperty(property);
  }, []);

  const onMapClick = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  if (loadError) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Interactive Property Map
            </h2>
            <p className="text-xl text-red-600">
              Error loading Google Maps. Please check your API key configuration.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!isLoaded) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Interactive Property Map
            </h2>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
            </div>
            <p className="text-xl text-gray-600 mt-4">Loading interactive map...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-100 via-green-50 to-emerald-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
            <MapPin className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">Interactive Property Map</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Properties on the Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your perfect home with our interactive map showing all available properties along the Waiyaki Way corridor
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TransparentCard className="overflow-hidden bg-white/95 backdrop-blur-lg">
            <div className="h-96 md:h-[500px] relative">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={12}
                onClick={onMapClick}
                options={{
                  styles: mapStyles,
                  disableDefaultUI: false,
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true,
                }}
              >
                {properties.map((property) => (
                  <Marker
                    key={property.id}
                    position={property.location}
                    onClick={() => onMarkerClick(property)}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="20" cy="20" r="18" fill="#059669" stroke="white" stroke-width="4"/>
                          <path d="M20 12L24 16H22V24H18V16H16L20 12Z" fill="white"/>
                        </svg>
                      `),
                      scaledSize: isLoaded && window.google ? new window.google.maps.Size(40, 40) : undefined,
                      anchor: isLoaded && window.google ? new window.google.maps.Point(20, 20) : undefined,
                    }}
                  />
                ))}

                {selectedProperty && (
                  <InfoWindow
                    position={selectedProperty.location}
                    onCloseClick={() => setSelectedProperty(null)}
                  >
                    <div className="p-4 max-w-xs">
                      <img
                        src={selectedProperty.image}
                        alt={selectedProperty.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-bold text-gray-900 mb-2">{selectedProperty.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-green-600">
                          {formatPrice(selectedProperty.price)}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          {selectedProperty.area}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-600 text-sm mb-3">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          <span>{selectedProperty.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          <span>{selectedProperty.bathrooms}</span>
                        </div>
                      </div>
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </TransparentCard>
        </motion.div>

        {/* Location Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {['Kinoo', 'Regen', 'Limuru', 'Ngecha'].map((area, index) => (
            <button
              key={area}
              onClick={() => {
                const areaProperty = properties.find(p => p.area === area);
                if (areaProperty) {
                  setMapCenter(areaProperty.location);
                  setSelectedProperty(areaProperty);
                }
              }}
              className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg p-4 hover:bg-green-50 hover:border-green-300 transition-all text-center"
            >
              <MapPin className="w-5 h-5 text-green-600 mx-auto mb-2" />
              <span className="font-medium text-gray-900">{area}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveMap;