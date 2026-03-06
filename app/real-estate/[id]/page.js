import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RealEstateDetailContent from './RealEstateDetailContent';
import { supabase } from '../../../lib/supabase';

const DEFAULT_IMAGES = {
  sale: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
  rent: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  default: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
};

function getCategoryLabel(listing) {
  const cat = (listing?.category || listing?.listing_type || '').toLowerCase();
  const title = (listing?.title || '').toLowerCase();
  if (cat === 'apartment' || cat === 'apt' || title.includes('apartment')) return { label: 'Apartment', icon: 'fa-solid fa-building' };
  if (cat === 'land' || title.includes('vacant') || title.includes('land')) return { label: 'Land', icon: 'fa-solid fa-mountain-sun' };
  return { label: 'House', icon: 'fa-solid fa-house' };
}

async function getListingById(id) {
  if (!supabase || !id) return null;
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .eq('status', 'active')
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
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
  const images = listing.images && listing.images.length >= 3
    ? listing.images.slice(0, 4)
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
      <section className="section">
        <div className="container">
          <RealEstateDetailContent listing={listing} images={images} />
        </div>
      </section>
      <Footer />
    </>
  );
}
