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
          <div className="hero-hotline">
            <i className="fa-solid fa-phone"></i>
            <span>Call us now: <a href="tel:+13129997988">+1 (312) 999 7988</a></span>
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
      <section className="section featured">
        <div className="container">
          <h2 className="section-title">Featured Listings</h2>
          <div className="listings-grid">

            <div className="listing-card">
              <div className="listing-badge">For Sale</div>
              <div className="listing-content">
                <span className="tag">House</span>
                <h3>Modern Family Home</h3>
                <p className="listing-location"><i className="fa-solid fa-location-dot"></i> Chicago, Illinois</p>
                <p className="listing-price">$350,000</p>
                <p>4 bedrooms, 3 bathrooms, 2,500 sqft, modern design, near school &amp; market.</p>
                <a href="tel:+13129997988" className="btn btn-primary">
                  <i className="fa-solid fa-phone"></i> +1 (312) 999 7988
                </a>
              </div>
            </div>

            <div className="listing-card">
              <div className="listing-badge">For Rent</div>
              <div className="listing-content">
                <span className="tag">Apartment</span>
                <h3>City Center Apartment</h3>
                <p className="listing-location"><i className="fa-solid fa-location-dot"></i> Downtown Chicago, IL</p>
                <p className="listing-price">$2,400 / month</p>
                <p>2 bedrooms, fully furnished, high-rise view, pool &amp; gym access.</p>
                <a href="tel:+13129997988" className="btn btn-primary">
                  <i className="fa-solid fa-phone"></i> +1 (312) 999 7988
                </a>
              </div>
            </div>

            <div className="listing-card">
              <div className="listing-badge">Used Item</div>
              <div className="listing-content">
                <span className="tag">Car</span>
                <h3>Toyota Camry 2020</h3>
                <p className="listing-location"><i className="fa-solid fa-location-dot"></i> Chicago, Illinois</p>
                <p className="listing-price">$22,500</p>
                <p>45,000 miles, excellent condition, 1 owner, full service history.</p>
                <a href="tel:+13129997988" className="btn btn-primary">
                  <i className="fa-solid fa-phone"></i> +1 (312) 999 7988
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section why-us">
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
              <p>Call us anytime: <a href="tel:+13129997988">+1 (312) 999 7988</a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
