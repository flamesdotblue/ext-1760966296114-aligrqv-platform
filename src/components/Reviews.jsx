import React from 'react';
import { Star } from 'lucide-react';

const ACCENT = '#E44D26';

const reviews = [
  {
    id: 1,
    name: 'Alex Johnson',
    rating: 5,
    text: 'These are the most comfortable sneakers I own. Perfect for long walks and they look great with everything.',
    date: '2 weeks ago',
  },
  {
    id: 2,
    name: 'Priya Gupta',
    rating: 4,
    text: 'Great build quality and fit. I sized up and it was perfect. Cushioning is bouncy and responsive.',
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Liam Chen',
    rating: 5,
    text: 'Minimal design, maximal comfort. The graphite color is super clean.',
    date: '3 months ago',
  },
];

function Stars({ n }) {
  return (
    <div className="flex" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < n ? '' : 'opacity-30'}`} style={{ color: ACCENT, fill: i < n ? ACCENT : 'transparent' }} />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section aria-labelledby="reviews-heading" className="mb-24">
      <div className="mb-6 flex items-center justify-between">
        <h3 id="reviews-heading" className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
        <a href="#" className="text-sm font-medium" style={{ color: ACCENT }}>Write a review</a>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm" aria-label={`Review by ${r.name}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{r.name}</h4>
                <p className="text-xs text-gray-500">{r.date}</p>
              </div>
              <Stars n={r.rating} />
            </div>
            <p className="mt-3 text-sm text-gray-700">{r.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
