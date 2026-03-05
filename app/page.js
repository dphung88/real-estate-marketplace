import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Next Home or Great Deal</h1>
          <p>Browse properties for rent &amp; sale, plus quality used items: cars, lawn mowers, mobile homes &amp; more.</p>
          <div className="hero-buttons">
            <Link href="/real-estate" className="btn btn-primary">View Properties</Link>
            <Link href="/used-items" className="btn btn-secondary">View Used Items</Link>
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
              <i className="fa-solid fa-caravan"></i>
              Mobile Homes
            </Link>
            <Link href="/used-items" className="cat-card">
              <i className="fa-solid fa-tags"></i>
              Other Used Items
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="featured section">
        <div className="container">
          <h2 className="section-title">Featured Listings</h2>
          <div className="listings-grid">

            <article className="listing-card">
              <span className="badge badge-sale">For Sale</span>
              <span className="badge badge-type">House</span>
              <h3>Modern Family Home</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Ho Chi Minh City, Vietnam</p>
              <p className="listing-price">$350,000</p>
              <p className="listing-desc">4 bedrooms, 3 bathrooms, 250m², modern design, near school &amp; market.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

            <article className="listing-card">
              <span className="badge badge-rent">For Rent</span>
              <span className="badge badge-type">Apartment</span>
              <h3>City Center Apartment</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> District 1, Ho Chi Minh City</p>
              <p className="listing-price">$800 / month</p>
              <p className="listing-desc">2 bedrooms, fully furnished, high-rise view, pool &amp; gym access.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

            <article className="listing-card">
              <span className="badge badge-used">Used Item</span>
              <span className="badge badge-type">Car</span>
              <h3>Toyota Camry 2020</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Ho Chi Minh City, Vietnam</p>
              <p className="listing-price">$22,500</p>
              <p className="listing-desc">45,000 km, excellent condition, 1 owner, full service history.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us section">
        <div className="container">
          <h2 className="section-title">Why Choose Prime Listings?</h2>
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
              <p>We are here to help you anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
