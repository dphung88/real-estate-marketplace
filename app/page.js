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
          
          <div className="cat-grid">
            <Link href="/real-estate?category=house" className="cat-card">
              <div className="cat-icon-wrapper">
                <i className="fa-solid fa-house-circle-check"></i>
              </div>
              <span className="cat-text">Homes</span>
            </Link>
            <Link href="/real-estate?type=rent" className="cat-card">
              <div className="cat-icon-wrapper">
                <i className="fa-solid fa-house-user"></i>
              </div>
              <span className="cat-text">Rentals</span>
            </Link>
            <Link href="/used-items?category=cars" className="cat-card">
              <div className="cat-icon-wrapper">
                <i className="fa-solid fa-car-side"></i>
              </div>
              <span className="cat-text">Cars & Trucks</span>
            </Link>
            <Link href="/used-items?category=mobile-homes" className="cat-card">
              <div className="cat-icon-wrapper">
                <i className="fa-solid fa-truck-moving"></i>
              </div>
              <span className="cat-text">Mobile Homes</span>
            </Link>
            <Link href="/used-items?category=lawnmowers" className="cat-card">
              <div className="cat-icon-wrapper">
                <i className="fa-solid fa-tractor"></i>
              </div>
              <span className="cat-text">Lawn Mowers</span>
            </Link>
            <Link href="/used-items?category=other" className="cat-card">
              <div className="cat-icon-wrapper">
                <i className="fa-solid fa-boxes-stacked"></i>
              </div>
              <span className="cat-text">Other Items</span>
            </Link>
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
