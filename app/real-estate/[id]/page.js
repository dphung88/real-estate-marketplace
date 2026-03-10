import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RealEstateDetailContent from './RealEstateDetailContent';
import { supabase } from '../../../lib/supabase';

const DEFAULT_IMAGES = {
  sale: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
  rent: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  default: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
};

function getCategoryLabel(listing) {
  const cat = (listing?.category || listing?.listing_type || '').toLowerCase();
  const title = (listing?.title || '').toLowerCase();
  if (cat === 'apartment' || cat === 'apt' || title.includes('apartment')) return { label: 'Apartment', icon: 'fa-solid fa-building' };
  if (cat === 'land' || title.includes('vacant') || title.includes('land')) return { label: 'Land', icon: 'fa-solid fa-mountain-sun' };
  return { label: 'House', icon: 'fa-solid fa-house' };
}

async function getListingById(id) {
  // Mock data for development if Supabase is not configured
  const mockListings = [
    {
      id: 'm1',
      title: 'Luxury Villa with Sea View',
      description: 'A beautiful luxury villa located on the coast with stunning sea views, private pool and garden. This spacious property features 5 bedrooms, 4 bathrooms, and a state-of-the-art kitchen. Perfect for families looking for a peaceful retreat or an investment opportunity in a prime location.',
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
      type: 'sale',
      category: 'house'
    },
    {
      id: 'm2',
      title: 'Modern Downtown Apartment',
      description: 'Newly renovated apartment in the heart of the city, close to all amenities and public transport. Features floor-to-ceiling windows with panoramic city views, modern finishes, and access to building amenities including a gym and rooftop terrace.',
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
      type: 'rent',
      property_type: 'rent',
      category: 'apartment'
    },
    {
      id: 'm3',
      title: 'Cozy Mountain Cabin',
      description: 'Escape to the mountains in this cozy wooden cabin, perfect for winter getaways. Features a fireplace, rustic decor, and breathtaking views of the surrounding forest. Ideal for hiking enthusiasts and nature lovers.',
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
      type: 'sale',
      category: 'cabin'
    },
    {
      id: 'm4',
      title: 'Beachfront Paradise',
      description: 'Beautiful beachfront property with private access to the white sand beach and crystal clear water. This luxury home features an open floor plan, floor-to-ceiling windows, and a large terrace overlooking the ocean.',
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
      type: 'sale',
      category: 'house'
    },
    {
      id: 'm5',
      title: 'Urban Loft Studio',
      description: 'Chic urban loft in a converted warehouse with high ceilings and industrial features. Located in a vibrant neighborhood, this studio offers modern living with an artistic touch, featuring exposed brick walls and hardwood floors.',
      price: 2800,
      location: 'Brooklyn, New York',
      image_url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=75',
      images: [
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=75',
        'https://images.unsplash.com/photo-1536376074402-f2731042509a?w=800&q=75',
        'https://images.unsplash.com/photo-1502672023488-70e25813efdf?w=800&q=75',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=75'
      ],
      status: 'active',
      type: 'rent',
      property_type: 'rent',
      category: 'apartment'
    },
    {
      id: 'm6',
      title: 'Rustic Forest Retreat',
      description: 'A quiet forest retreat surrounded by nature, perfect for peace and relaxation. This secluded property features a large deck, modern amenities in a rustic setting, and easy access to hiking trails and natural springs.',
      price: 320000,
      location: 'Portland, Oregon',
      image_url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=75',
      images: [
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=75',
        'https://images.unsplash.com/photo-1490682143124-b15223b3f041?w=800&q=75',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=75',
        'https://images.unsplash.com/photo-1449156001437-37c446bfdf30?w=800&q=75'
      ],
      status: 'active',
      type: 'sale',
      category: 'house'
    }
  ];

  if (!supabase || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('xxxxx')) {
    return mockListings.find(item => item.id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .eq('status', 'active')
      .single();
    if (error) {
      return mockListings.find(item => item.id === id) || null;
    }
    return data;
  } catch {
    return mockListings.find(item => item.id === id) || null;
  }
}

export const dynamic = 'force-dynamic';

export default async function RealEstateDetailPage({ params }) {
  const id = params?.id;
  const listing = id ? await getListingById(id) : null;

  if (!listing) {
    return (
      <>
        <Navbar />
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h1>Listing not found</h1>
            <Link href="/real-estate" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Real Estate</Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const imgSrc = listing.image_url ||
    (listing.property_type === 'rent' ? DEFAULT_IMAGES.rent : DEFAULT_IMAGES.sale);
  const images = listing.images && listing.images.length > 0
    ? listing.images
    : [imgSrc, imgSrc, imgSrc, imgSrc];
  const cat = getCategoryLabel(listing);

  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container">
          <Link href="/real-estate" style={{ color: 'var(--color-accent)', marginBottom: '8px', display: 'inline-block' }}>
            <i className="fa-solid fa-arrow-left"></i> Back to Real Estate
          </Link>
          <h1><i className="fa-solid fa-building"></i> {listing.title}</h1>
          <p>{cat.label} • {listing.location}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <RealEstateDetailContent listing={listing} images={images} />
        </div>
      </section>
      <Footer />
    </>
  );
}
