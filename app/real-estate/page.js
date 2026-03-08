import { supabase } from '../../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import RealEstateList from './RealEstateList';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Real Estate Listings - Axiom Realty',
};

async function getListings() {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
  } catch (e) {
    return [];
  }
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
      <section className="section section-tight-top listings-section">
        <div className="container">
          <RealEstateList listings={listings} />
        </div>
      </section>

      <Footer />
    </>
  );
}
