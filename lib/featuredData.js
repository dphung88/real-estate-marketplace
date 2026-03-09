/**
 * Static data for Featured Listings (homepage + detail pages).
 * Mỗi item có images[] — 4 ảnh khác nhau; click thumb đổi ảnh chính.
 */
export const FEATURED_ITEMS = [
  {
    id: '1',
    title: 'Modern Family Home - Lincoln Park',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=75',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=75',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=75',
    ],
    location: 'Lincoln Park, Chicago, IL',
    price: '$650,000',
    description: 'Stunning 4-bedroom home in Lincoln Park with open floor plan, gourmet kitchen, and private backyard. Near top-rated schools.',
    badge: 'House',
  },
  {
    id: '2',
    title: 'Downtown Chicago Luxury Apartment',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=75',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=75',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=75',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=75',
    ],
    location: 'Downtown Chicago, IL',
    price: '$3,200/month',
    description: 'Fully furnished 2-bedroom apartment with floor-to-ceiling windows, panoramic city views, pool & gym access.',
    badge: 'Apartment',
  },
  {
    id: '3',
    title: 'Vacant Land - Northwest Suburbs',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=75',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=75',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=75',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=75',
    ],
    location: 'Schaumburg, IL',
    price: '$120,000',
    description: 'Flat residential lot in a growing neighborhood. All utilities at the street. Ideal for building your dream home.',
    badge: 'Land',
  },
];

export function getFeaturedItem(id) {
  return FEATURED_ITEMS.find((item) => String(item.id) === String(id)) ?? null;
}
