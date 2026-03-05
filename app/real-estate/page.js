import { supabase } from '../../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Real Estate Listings - Axiom Realty',
};

const DEFAULT_IMAGES = {
  sale: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
  rent: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  default: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
};

async function getListings() {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export default async function RealEstatePage() {
  const listings = await getListings();
  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-building"></i> Real Estate Listings</h1>
          <p>Browse properties available for sale and rent across the United States.</p>
        </div>
      </section>
      <section className="listings-section">
        <div className="container">
          {listings.length === 0 ? (
            <p style={{textAlign:'center', padding:'40px'}}>No listings found. Check back soon!</p>
          ) : (
            <div className="listings-grid">
              {listings.map((listing) => {
                const imgSrc = listing.image_url ||
                  (listing.property_type === 'rent' ? DEFAULT_IMAGES.rent : DEFAULT_IMAGES.sale);
                return (
                  <div key={listing.id} className="listing-card">
                    <div className="listing-img">
                      <Image
                        src={imgSrc}
                        alt={listing.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                      <span className={`listing-badge ${listing.property_type === 'rent' ? 'badge-rent' : 'badge-sale'}`}>
                        {listing.property_type === 'rent' ? 'For Rent' : 'For Sale'}
                      </span>
                    </div>
                    <div className="listing-content">
                      <h3>{listing.title}</h3>
                      <p className="listing-loc">
                        <i className="fa-solid fa-location-dot"></i> {listing.location}
                      </p>
                      {listing.area && (
                        <p className="listing-meta">
                          <i className="fa-solid fa-ruler-combined"></i> {listing.area?.toLocaleString('en-US')} sqft
                          {listing.bedrooms && <> &bull; {listing.bedrooms} beds</>}
                          {listing.bathrooms && <> &bull; {listing.bathrooms} baths</>}
                        </p>
                      )}
                      <p className="listing-price">
                        {listing.property_type === 'rent'
                          ? `$${listing.price?.toLocaleString('en-US')}/month`
                          : `$${listing.price?.toLocaleString('en-US')}`
                        }
                      </p>
                      {listing.description && (
                        <p className="listing-desc">{listing.description}</p>
                      )}
                      <a href="tel:+13129997988" className="btn btn-sm">
                        <i className="fa-solid fa-phone"></i> +1 (312) 999 7988
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
