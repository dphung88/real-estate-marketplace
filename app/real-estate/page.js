import { supabase } from '../../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Real Estate Listings - Prime Listings',
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
              {listings.map((listing) => (
                <div key={listing.id} className="listing-card">
                  <div className="listing-badge">
                    {listing.property_type === 'rent' ? 'For Rent' : 'For Sale'}
                  </div>
                  <div className="listing-content">
                    <h3>{listing.title}</h3>
                    <p className="listing-location">
                      <i className="fa-solid fa-location-dot"></i> {listing.location}
                    </p>
                    {listing.area && (
                      <p>
                        <i className="fa-solid fa-ruler-combined"></i> {listing.area} sqft
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
                    <a href="tel:+13129997988" className="btn btn-primary">
                      <i className="fa-solid fa-phone"></i> +1 (312) 999 7988
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
