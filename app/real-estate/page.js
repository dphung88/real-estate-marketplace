import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Real Estate Listings - Prime Listings',
};

export default function RealEstatePage() {
  return (
    <>
      <Navbar />

      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-building"></i> Real Estate Listings</h1>
          <p>Browse properties available for sale and rent across Vietnam.</p>
        </div>
      </section>

      {/* FILTER + LISTINGS */}
      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-group">
              <select className="filter-select">
                <option value="">All Types</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <select className="filter-select">
                <option value="">All Locations</option>
                <option value="hcm">Ho Chi Minh City</option>
                <option value="hanoi">Hanoi</option>
                <option value="danang">Da Nang</option>
              </select>
              <select className="filter-select">
                <option value="">Price Range</option>
                <option value="low">Under $100,000</option>
                <option value="mid">$100,000 - $300,000</option>
                <option value="high">Above $300,000</option>
              </select>
              <button className="btn btn-primary">Search</button>
            </div>
          </div>

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
              <span className="badge badge-sale">For Sale</span>
              <span className="badge badge-type">Villa</span>
              <h3>Luxury Villa with Pool</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Thu Duc City, Ho Chi Minh City</p>
              <p className="listing-price">$750,000</p>
              <p className="listing-desc">5 bedrooms, private pool, smart home system, large garden.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

            <article className="listing-card">
              <span className="badge badge-rent">For Rent</span>
              <span className="badge badge-type">Studio</span>
              <h3>Studio Apartment - City View</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Binh Thanh, Ho Chi Minh City</p>
              <p className="listing-price">$400 / month</p>
              <p className="listing-desc">Cozy studio, fully equipped kitchen, 24/7 security, rooftop access.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

            <article className="listing-card">
              <span className="badge badge-sale">For Sale</span>
              <span className="badge badge-type">Townhouse</span>
              <h3>Townhouse - Hanoi Old Quarter</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Hoan Kiem, Hanoi</p>
              <p className="listing-price">$220,000</p>
              <p className="listing-desc">3 floors, 3 bedrooms, renovated, walking distance to Hoan Kiem Lake.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

            <article className="listing-card">
              <span className="badge badge-rent">For Rent</span>
              <span className="badge badge-type">Office</span>
              <h3>Commercial Office Space</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Da Nang City Center</p>
              <p className="listing-price">$1,200 / month</p>
              <p className="listing-desc">120m² open plan office, high-speed internet, conference room included.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
