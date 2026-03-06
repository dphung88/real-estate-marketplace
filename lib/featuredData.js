/**
 * Static data for Featured Listings (homepage + detail pages).
 * Each item has images[] for the detail-page gallery (1 main + 3 thumbs).
 */
export const FEATURED_ITEMS = [
  {
    id: '1',
    title: 'Modern Family Home',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=75',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=75',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=75',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=75',
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
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=75',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=75',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=75',
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
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75',
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
