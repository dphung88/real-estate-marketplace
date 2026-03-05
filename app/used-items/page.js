import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Used Items - Prime Listings',
};

export default function UsedItemsPage() {
  return (
    <>
      <Navbar />

      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-tags"></i> Used Items for Sale</h1>
          <p>Find quality second-hand cars, lawn mowers, mobile homes, and more.</p>
        </div>
      </section>

      {/* FILTER + LISTINGS */}
      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-group">
              <select className="filter-select">
                <option value="">All Categories</option>
                <option value="cars">Cars</option>
                <option value="lawnmowers">Lawn Mowers</option>
                <option value="mobile-homes">Mobile Homes</option>
                <option value="other">Other Items</option>
              </select>
              <select className="filter-select">
                <option value="">Price Range</option>
                <option value="low">Under $5,000</option>
                <option value="mid">$5,000 - $20,000</option>
                <option value="high">Above $20,000</option>
              </select>
              <select className="filter-select">
                <option value="">Condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
              <button className="btn btn-primary">Search</button>
            </div>
          </div>

          <div className="listings-grid">

            <article className="listing-card">
              <span className="badge badge-type">Car</span>
              <span className="badge badge-used">Toyota Camry</span>
              <h3>Toyota Camry 2020</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Ho Chi Minh City</p>
              <p className="listing-price">$22,500</p>
              <p className="listing-desc">45,000 km, excellent condition, 1 owner, full service history.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

            <article className="listing-card">
              <span className="badge badge-type">Car</span>
              <span className="badge badge-used">Honda CR-V</span>
              <h3>Honda CR-V 2019</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Hanoi</p>
              <p className="listing-price">$18,000</p>
              <p className="listing-desc">60,000 km, good condition, sunroof, leather seats, automatic.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

            <article className="listing-card">
              <span className="badge badge-type">Lawn Mower</span>
              <span className="badge badge-used">Riding Mower</span>
              <h3>John Deere Riding Mower</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Da Nang</p>
              <p className="listing-price">$2,800</p>
              <p className="listing-desc">2021 model, 42&quot; deck, low hours, well maintained, ready to use.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

            <article className="listing-card">
              <span className="badge badge-type">Mobile Home</span>
              <span className="badge badge-used">Mobile Home</span>
              <h3>Cozy Mobile Home 2018</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Vung Tau</p>
              <p className="listing-price">$35,000</p>
              <p className="listing-desc">2 bedrooms, fully furnished, solar panels, great for coastal living.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

            <article className="listing-card">
              <span className="badge badge-type">Lawn Mower</span>
              <span className="badge badge-used">Push Mower</span>
              <h3>Honda Push Mower HRX217</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Ho Chi Minh City</p>
              <p className="listing-price">$450</p>
              <p className="listing-desc">Self-propelled, mulch/bag/discharge, runs perfectly, barely used.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

            <article className="listing-card">
              <span className="badge badge-type">Other</span>
              <span className="badge badge-used">Tools</span>
              <h3>Power Tools Set - DeWalt</h3>
              <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> Binh Duong</p>
              <p className="listing-price">$380</p>
              <p className="listing-desc">Complete set: drill, circular saw, jigsaw, sander. Excellent condition.</p>
              <Link href="/contact" className="btn-sm">Inquire Now</Link>
            </article>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
