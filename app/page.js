import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Image from 'next/image';
import { COMPANY_HOTLINE, COMPANY_HOTLINE_TEL } from '../lib/constants';

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
          <h2 className="section-title">Browse by Category</h2>
          <div className="cat-grid">
            <Link href="/real-estate" className="cat-card">
              <i className="fa-solid fa-building"></i>
              Real Estate for Sale
            </Link>
            <Link href="/real-estate" className="cat-card">
              <i className="fa-solid fa-key"></i>
              Real Estate for Rent
            </Link>
            <Link href="/used-items" className="cat-card">
              <i className="fa-solid fa-car"></i>
              Cars
            </Link>
            <Link href="/used-items" className="cat-card">
              <i className="fa-solid fa-tractor"></i>
              Lawn Mowers
            </Link>
            <Link href="/used-items" className="cat-card">
              <i className="fa-solid fa-house-chimney"></i>
              Mobile Homes
            </Link>
            <Link href="/used-items" className="cat-card">
              <i className="fa-solid fa-tag"></i>
              Other Used Items
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured section">
        <div className="container">
          <h2 className="section-title">Featured Listings</h2>
          <div className="listings-grid">

            <div className="listing-card">
              <div className="listing-img">
                <Image src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=75" alt="Modern Family Home" fill style={{objectFit:'cover'}} sizes="(max-width: 768px) 100vw, 400px" loading="lazy" />
              </div>
              <div className="listing-content">
                <span className="badge badge-type">House</span>
                <h3>Modern Family Home</h3>
                <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Chicago, Illinois</p>
                <p className="listing-price">$350,000</p>
                <p className="listing-desc">4 bedrooms, 3 bathrooms, 2,500 sqft, modern design, near school &amp; market.</p>
                <a href={COMPANY_HOTLINE_TEL} className="btn btn-call"><i className="fa-solid fa-phone"></i> {COMPANY_HOTLINE}</a>
              </div>
            </div>

            <div className="listing-card">
              <div className="listing-img">
                <Image src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=75" alt="City Center Apartment" fill style={{objectFit:'cover'}} sizes="(max-width: 768px) 100vw, 400px" loading="lazy" />
              </div>
              <div className="listing-content">
                <span className="badge badge-type">Apartment</span>
                <h3>City Center Apartment</h3>
                <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Downtown Chicago, IL</p>
                <p className="listing-price">$2,400 / month</p>
                <p className="listing-desc">2 bedrooms, fully furnished, high-rise view, pool &amp; gym access.</p>
                <a href={COMPANY_HOTLINE_TEL} className="btn btn-call"><i className="fa-solid fa-phone"></i> {COMPANY_HOTLINE}</a>
              </div>
            </div>

            <div className="listing-card">
              <div className="listing-img">
                <Image src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75" alt="Toyota Camry 2020" fill style={{objectFit:'cover'}} sizes="(max-width: 768px) 100vw, 400px" loading="lazy" />
              </div>
              <div className="listing-content">
                <span className="badge badge-type">Car</span>
                <h3>Toyota Camry 2020</h3>
                <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Chicago, Illinois</p>
                <p className="listing-price">$22,500</p>
                <p className="listing-desc">45,000 miles, excellent condition, 1 owner, full service history.</p>
                <a href={COMPANY_HOTLINE_TEL} className="btn btn-call"><i className="fa-solid fa-phone"></i> {COMPANY_HOTLINE}</a>
              </div>
            </div>

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
