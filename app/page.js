import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Image from 'next/image';
import FeaturedCard from './components/FeaturedCard';
import { COMPANY_HOTLINE, COMPANY_HOTLINE_TEL } from '../lib/constants';
import { FEATURED_ITEMS } from '../lib/featuredData';

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=75"
            alt="Axiom Realty Banner"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            sizes="100vw"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Find Your Next Home or Great Deal</h1>
          <p>Browse properties for rent &amp; sale, plus quality used items: cars, lawn mowers, mobile homes &amp; more.</p>
          <div className="hero-buttons">
            <Link href="/real-estate" className="btn btn-primary">View Properties</Link>
            <Link href="/used-items" className="btn btn-secondary">View Used Items</Link>
          </div>
          <div className="hero-hotline">
            <i className="fa-solid fa-phone"></i>
            <span>Call us now: <a href={COMPANY_HOTLINE_TEL}>{COMPANY_HOTLINE}</a></span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories section">
        <div className="container">
          <h2 className="section-title">Browse Categories</h2>
          
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--color-accent)', display: 'inline-block', paddingBottom: '5px' }}>
              Real Estate
            </h3>
            <div className="cat-grid">
              <Link href="/real-estate?category=house" className="cat-card">
                <i className="fa-solid fa-house-circle-check"></i>
                Homes
              </Link>
              <Link href="/real-estate?category=apartment" className="cat-card">
                <i className="fa-solid fa-building"></i>
                Apartments
              </Link>
              <Link href="/real-estate?category=cabin" className="cat-card">
                <i className="fa-solid fa-cabin"></i>
                Cabins
              </Link>
              <Link href="/real-estate?type=rent" className="cat-card">
                <i className="fa-solid fa-house-user"></i>
                All Rentals
              </Link>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--color-accent)', display: 'inline-block', paddingBottom: '5px' }}>
              Used Items & Vehicles
            </h3>
            <div className="cat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
              <Link href="/used-items?category=cars" className="cat-card">
                <i className="fa-solid fa-car-side"></i>
                Cars & Trucks
              </Link>
              <Link href="/used-items?category=mobile-homes" className="cat-card">
                <i className="fa-solid fa-truck-moving"></i>
                Mobile Homes
              </Link>
              <Link href="/used-items?category=lawnmowers" className="cat-card">
                <i className="fa-solid fa-tractor"></i>
                Farm Equipment
              </Link>
              <Link href="/used-items?category=electronics" className="cat-card">
                <i className="fa-solid fa-laptop"></i>
                Electronics
              </Link>
              <Link href="/used-items?category=other" className="cat-card">
                <i className="fa-solid fa-boxes-stacked"></i>
                Browse All Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured section">
        <div className="container">
          <h2 className="section-title">Featured Listings</h2>
          <div className="listings-grid">

            {FEATURED_ITEMS.map((item) => (
              <FeaturedCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.images[0]}
                location={item.location}
                price={item.price}
                description={item.description}
                badge={item.badge}
              />
            ))}

          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us section">
        <div className="container">
          <h2 className="section-title">Why Choose Axiom Realty?</h2>
          <div className="why-grid">
            <div className="why-card">
              <i className="fa-solid fa-shield-halved"></i>
              <h4>Trusted &amp; Verified</h4>
              <p>All listings are verified by our team.</p>
            </div>
            <div className="why-card">
              <i className="fa-solid fa-bolt"></i>
              <h4>Fast &amp; Easy</h4>
              <p>Find and contact sellers in minutes.</p>
            </div>
            <div className="why-card">
              <i className="fa-solid fa-headset"></i>
              <h4>24/7 Support</h4>
              <p>Call us anytime: <a href={COMPANY_HOTLINE_TEL} className="why-us-link">{COMPANY_HOTLINE}</a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
