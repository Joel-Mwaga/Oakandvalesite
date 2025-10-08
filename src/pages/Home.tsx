import React from 'react';
import HeroSection from '../components/Landing/HeroSection';
import FeaturedProperties from '../components/Landing/FeaturedProperties';
import InteractiveMap from '../components/Landing/InteractiveMap';
import NeighborhoodGuide from '../components/Landing/NeighborhoodGuide';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      <InteractiveMap />
      <NeighborhoodGuide />
    </div>
  );
};

export default Home;