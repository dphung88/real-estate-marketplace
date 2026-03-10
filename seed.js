const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

// Use Service Role Key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const mockListings = [
  {
    title: 'Luxury Villa with Sea View',
    description: 'A beautiful luxury villa located on the coast with stunning sea views, private pool and garden.',
    price: 1200000,
    location: 'Malibu, California',
    image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=75',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=75',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=75',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=75',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=75'
    ],
    status: 'active',
    property_type: 'sale',
    category: 'house'
  },
  {
    title: 'Modern Downtown Apartment',
    description: 'Newly renovated apartment in the heart of the city, close to all amenities and public transport.',
    price: 3500,
    location: 'New York City, NY',
    image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=75',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=75',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=75',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=75',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=75'
    ],
    status: 'active',
    property_type: 'rent',
    category: 'apartment'
  },
  {
    title: 'Cozy Mountain Cabin',
    description: 'Escape to the mountains in this cozy wooden cabin, perfect for winter getaways.',
    price: 450000,
    location: 'Aspen, Colorado',
    image_url: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=75',
    images: [
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=75',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=75',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=75',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=75'
    ],
    status: 'active',
    property_type: 'sale',
    category: 'cabin'
  },
  {
    title: 'Beachfront Paradise',
    description: 'Beautiful beachfront property with private access to the white sand beach and crystal clear water.',
    price: 850000,
    location: 'Miami, Florida',
    image_url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=75',
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=75',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=75',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=75',
      'https://images.unsplash.com/photo-1506929662033-753939091f28?w=800&q=75'
    ],
    status: 'active',
    property_type: 'sale',
    category: 'house'
  },
  {
    title: 'Urban Loft Studio',
    description: 'Chic urban loft in a converted warehouse with high ceilings and industrial features.',
    price: 2800,
    location: 'Brooklyn, New York',
    image_url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=75',
    images: [
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=75',
      'https://images.unsplash.com/photo-1536376074402-f2731042509a?w=800&q=75',
      'https://images.unsplash.com/photo-1502672023488-70e25813efdf?w=800&q=75',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=75',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=75',
      'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800&q=75'
    ],
    status: 'active',
    property_type: 'rent',
    category: 'apartment'
  },
  {
    title: 'Rustic Forest Retreat',
    description: 'A quiet forest retreat surrounded by nature, perfect for peace and relaxation.',
    price: 320000,
    location: 'Portland, Oregon',
    image_url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=75',
    images: [
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=75',
      'https://images.unsplash.com/photo-1490682143124-b15223b3f041?w=800&q=75',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=75',
      'https://images.unsplash.com/photo-1449156001437-37c446bfdf30?w=800&q=75',
      'https://images.unsplash.com/photo-1444333509402-6b9997f39a80?w=800&q=75',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=75'
    ],
    status: 'active',
    property_type: 'sale',
    category: 'house'
  }
];

async function seedDatabase() {
  console.log('Starting to sync local mock data to Supabase...');
  
  const { data, error } = await supabase
    .from('listings')
    .insert(mockListings);

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Successfully added 6 mock listings to Supabase!');
  }
}

seedDatabase();
