import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  {
    id: 1,
    title: 'Apex Runner Lite',
    price: 179,
    img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Apex Trail Pro',
    price: 229,
    img: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Apex City Glide',
    price: 159,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Apex Motion',
    price: 199,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function RelatedCarousel() {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const maxIndex = Math.max(0, items.length - visible);
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <section aria-labelledby="related-heading" className="mb-16">
      <div className="mb-4 flex items-end justify-between">
        <h3 id="related-heading" className="text-xl font-semibold text-gray-900">Related Products</h3>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            aria-label="Previous products"
          >
            Prev
          </button>
          <button
            onClick={next}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            aria-label="Next products"
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${index * (100 / visible)}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{ width: `${(items.length / visible) * 100}%` }}
        >
          {items.map((it) => (
            <motion.article
              key={it.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-1/3 min-w-0 flex-shrink-0"
            >
              <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white">
                <img src={it.img} alt={it.title} className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{it.title}</h4>
                    <p className="text-sm font-semibold text-gray-900">${it.price}</p>
                  </div>
                  <button
                    className="mt-3 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    aria-label={`View ${it.title}`}
                  >
                    View
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          /* On tablet, show 2 items */
          .overflow-hidden > div { width: ${(items.length / 2) * 100}% !important; }
          .overflow-hidden article { width: 50% !important; }
        }
        @media (max-width: 640px) {
          /* On mobile, show 1 item */
          .overflow-hidden > div { width: ${items.length * 100}% !important; }
          .overflow-hidden article { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
