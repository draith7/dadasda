import { useEffect } from 'react';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import ProductsSection from '../components/ProductsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CallToAction from '../components/CallToAction';

const HomePage = () => {
  useEffect(() => {
    // Update page title
    document.title = 'Valkyra | Premium Valorant Tools';
  }, []);

  return (
    <>
      <Hero />
      <FeaturesSection />
      <ProductsSection />
      <TestimonialsSection />
      <CallToAction />
    </>
  );
};

export default HomePage;