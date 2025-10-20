import React from 'react';
import HeroCover from './components/HeroCover';
import ProductSection from './components/ProductSection';
import RelatedCarousel from './components/RelatedCarousel';
import Reviews from './components/Reviews';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="relative h-[60vh] md:h-[70vh] w-full">
        <HeroCover />
      </header>

      <main id="main" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductSection />
        <RelatedCarousel />
        <Reviews />
      </main>

      <footer className="mt-16 border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Modern Commerce. All rights reserved.
      </footer>
    </div>
  );
}
