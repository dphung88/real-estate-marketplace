import { supabase } from '../../lib/supabase';
import { COMPANY_HOTLINE, COMPANY_HOTLINE_TEL } from '../../lib/constants';
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

      {/* HERO BANNER */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=75"
            alt="Real Estate Banner"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            sizes="100vw"
          />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="page-hero-content">
          <h1><i className="fa-solid fa-building"></i> Real Estate Listings</h1>
          <p>Browse properties available for sale and rent across the United States.</p>
        </div>
      </section>

      {/* LISTINGS */}
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
                  <div className="listing-card" key={listing.id}>
                    <div className="listing-image">
                      <Image
                        src={imgSrc}
                        alt={listing.title}
                        width={600}
                        height={400}
                        style={{ objectFit: 'cover', width: '100%', height: '220px' }}
                        sizes="(max-width: 768px) 100vw, 400px"
                        loading="lazy"
                      />
                    </div>
                    <div className="listing-info">
                      <span className="listing-type">
                        <i className="fa-solid fa-house"></i> House
                      </span>
                      <h3>{listing.title}</h3>
                      <p className="listing-location">{listing.location}</p>
                      {listing.area && (
                        <p className="listing-details">
                          {listing.area?.toLocaleString('en-US')} sqft
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
                      <a href={COMPANY_HOTLINE_TEL} className="btn btn-call"><i className="fa-solid fa-phone"></i> {COMPANY_HOTLINE}</a>
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
