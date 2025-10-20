import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

const ACCENT = '#E44D26';

function Rating({ value = 4.5, count = 128 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-2" aria-label={`Rating ${value} out of 5`}>
      <div className="flex items-center" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full || (i === full && half);
          return (
            <Star
              key={i}
              className={`h-4 w-4 ${filled ? '' : 'opacity-30'}`}
              style={{ color: ACCENT, fill: filled ? ACCENT : 'transparent' }}
            />
          );
        })}
      </div>
      <span className="text-sm text-gray-600">{value.toFixed(1)} • {count} reviews</span>
    </div>
  );
}

function OptionSelector({ label, options, value, onChange, name }) {
  return (
    <div className="mt-4">
      <span id={`${name}-label`} className="block text-sm font-medium text-gray-900">{label}</span>
      <div role="radiogroup" aria-labelledby={`${name}-label`} className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            role="radio"
            aria-checked={value === opt.value}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(opt.value); } }}
            className={`rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              value === opt.value ? 'border-transparent text-white' : 'border-gray-300 bg-white text-gray-900'
            }`}
            style={{ backgroundColor: value === opt.value ? ACCENT : undefined, boxShadow: value === opt.value ? '0 0 0 1px transparent' : undefined }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductGallery({ src, alt }) {
  const containerRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });

  const onMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const maxTranslate = 20; // px
    setTransform({ x: (0.5 - x) * maxTranslate, y: (0.5 - y) * maxTranslate, scale: 1.6 });
  };

  const onMouseLeave = () => setTransform({ x: 0, y: 0, scale: 1 });

  const onTouchStart = () => {
    setIsZoomed((z) => !z);
  };

  const onTouchMove = (e) => {
    if (!isZoomed) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) / rect.width;
    const y = (touch.clientY - rect.top) / rect.height;
    const maxTranslate = 30;
    setTransform({ x: (0.5 - x) * maxTranslate, y: (0.5 - y) * maxTranslate, scale: 1.8 });
  };

  return (
    <div
      ref={containerRef}
      className="group relative aspect-square w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      aria-label="Product image with zoom"
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 ease-out"
        style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` }}
      />
      <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-white/70 px-2 py-1 text-xs text-gray-800 shadow-sm">
        {isZoomed ? 'Drag to pan • Tap to exit' : 'Hover to zoom • Tap to zoom'}
      </div>
    </div>
  );
}

export default function ProductSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -20]);
  const shadow = useTransform(scrollYProgress, [0, 0.3], [0, 0.15]);

  const [size, setSize] = useState('m');
  const [color, setColor] = useState('graphite');
  const price = 249.0;

  const handleAddToCart = () => {
    alert(`Added to cart: Size ${size.toUpperCase()}, Color ${color}`);
  };
  const handleBuyNow = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <motion.section
      aria-labelledby="product-title"
      className="-mt-10 mb-16 rounded-2xl bg-white/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur md:p-8"
      style={{ y, boxShadow: shadow.to((v) => `0 20px 50px rgba(0,0,0,${v})`) }}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductGallery src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" alt="Sleek minimalist sneaker in graphite color" />

        <div className="flex flex-col">
          <div>
            <h2 id="product-title" className="font-manrope text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Apex Runner Pro
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Engineered for all-day comfort and performance. Breathable mesh, responsive cushioning, and a silhouette that fits every wardrobe.
            </p>
            <div className="mt-3"><Rating value={4.6} count={312} /></div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-3xl font-semibold text-gray-900">${price.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Free shipping • 30-day returns</div>
          </div>

          <div className="mt-6">
            <OptionSelector
              name="size"
              label="Size"
              value={size}
              onChange={setSize}
              options={[
                { label: 'S', value: 's' },
                { label: 'M', value: 'm' },
                { label: 'L', value: 'l' },
                { label: 'XL', value: 'xl' },
              ]}
            />
            <OptionSelector
              name="color"
              label="Color"
              value={color}
              onChange={setColor}
              options={[
                { label: 'Graphite', value: 'graphite' },
                { label: 'Ice', value: 'ice' },
                { label: 'Crimson', value: 'crimson' },
              ]}
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 sm:w-auto"
              aria-label="Add to cart"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="inline-flex w-full items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-white shadow-sm transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
              style={{ backgroundColor: ACCENT }}
              onMouseDown={(e) => e.currentTarget.classList.add('scale-[0.98]')}
              onMouseUp={(e) => e.currentTarget.classList.remove('scale-[0.98]')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('scale-[0.98]')}
              aria-label="Buy now"
            >
              Buy Now
            </button>
          </div>

          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>Lightweight knit upper with targeted support zones</li>
            <li>Responsive foam midsole for superior energy return</li>
            <li>Recycled materials and eco-conscious packaging</li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
