import React from 'react';
import { Phone, Mail } from 'lucide-react';
import OakValeLogo from '../UI/OakValeLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-600/10 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <OakValeLogo size={56} animate={false} />
              <div>
                <h3 className="text-xl font-bold">Oak & Vale Homes</h3>
                <p className="text-sm text-amber-400">Premium Properties</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Discover premium properties along Waiyaki Way - from Kinoo to Ngecha. 
              We connect you with your dream home in Nairobi's most sought-after corridor.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-500" />
                <span className="text-gray-300">+254 701 889 930 / +254 731 609 264</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span className="text-gray-300">oakandvalehomes@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="text-gray-300">Waiyaki Way, Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/properties" className="text-gray-300 hover:text-white transition-colors">
                  All Properties
                </a>
              </li>
              <li>
                <a href="/map" className="text-gray-300 hover:text-white transition-colors">
                  Map View
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Areas</h4>
            <ul className="space-y-2">
              <li>
                <a href="/properties?area=Kinoo" className="text-gray-300 hover:text-white transition-colors">
                  Kinoo
                </a>
              </li>
              <li>
                <a href="/properties?area=Regen" className="text-gray-300 hover:text-white transition-colors">
                  Regen
                </a>
              </li>
              <li>
                <a href="/properties?area=Limuru" className="text-gray-300 hover:text-white transition-colors">
                  Limuru
                </a>
              </li>
              <li>
                <a href="/properties?area=Ngecha" className="text-gray-300 hover:text-white transition-colors">
                  Ngecha
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Oak & Vale Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;