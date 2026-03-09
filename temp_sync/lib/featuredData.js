/**
 * Static data for Featured Listings (homepage + detail pages).
 * Mỗi item có images[] — 4 ảnh khác nhau; click thumb đổi ảnh chính.
 */
export const FEATURED_ITEMS = [
  {
    id: '1',
    title: 'Modern Family Home',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=75',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=75',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=75',
    ],
    location: 'Chicago, Illinois',
    price: '$350,000',
    description: '4 bedrooms, 3 bathrooms, 2,500 sqft, modern design, near school & market.',
    badge: 'House',
  },
  {
    id: '2',
    title: 'City Center Apartment',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=75',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=75',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=75',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=75',
    ],
    location: 'Downtown Chicago, IL',
    price: '$2,400 / month',
    description: '2 bedrooms, fully furnished, high-rise view, pool & gym access.',
    badge: 'Apartment',
  },
  {
    id: '3',
    title: 'Toyota Camry 2020',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=75',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=75',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=75',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=75',
    ],
    location: 'Chicago, Illinois',
    price: '$22,500',
    description: '45,000 miles, excellent condition, 1 owner, full service history.',
    badge: 'Car',
  },
];

export function getFeaturedItem(id) {
  return FEATURED_ITEMS.find((item) => String(item.id) === String(id)) ?? null;
}
