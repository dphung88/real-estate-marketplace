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

            <div className="listing-card">
              <div className="listing-badge">Used Item</div>
              <div className="listing-content">
                <span className="tag">Car</span>
                <h3>Toyota Camry 2020</h3>
                <p className="listing-location"><i className="fa-solid fa-location-dot"></i> Chicago, IL</p>
                <p className="listing-price">$22,500</p>
                <p>45,000 miles, excellent condition, 1 owner, full service history.</p>
                <a href="tel:+13129997988" className="btn btn-primary">
                  <i className="fa-solid fa-phone"></i> +1 (312) 999 7988
                </a>
              </div>
            </div>

            <div className="listing-card">
              <div className="listing-badge">Used Item</div>
              <div className="listing-content">
                <span className="tag">Lawn Mower</span>
                <h3>John Deere Riding Mower</h3>
                <p className="listing-location"><i className="fa-solid fa-location-dot"></i> Chicago, IL</p>
                <p className="listing-price">$1,800</p>
                <p>2019 model, 200 hours of use, good condition, clean and serviced.</p>
                <a href="tel:+13129997988" className="btn btn-primary">
                  <i className="fa-solid fa-phone"></i> +1 (312) 999 7988
                </a>
              </div>
            </div>

            <div className="listing-card">
              <div className="listing-badge">Used Item</div>
              <div className="listing-content">
                <span className="tag">Mobile Home</span>
                <h3>2018 Clayton Mobile Home</h3>
                <p className="listing-location"><i className="fa-solid fa-location-dot"></i> Chicago, IL</p>
                <p className="listing-price">$45,000</p>
                <p>3 bedrooms, 2 baths, 1,200 sqft, well-maintained, move-in ready.</p>
                <a href="tel:+13129997988" className="btn btn-primary">
                  <i className="fa-solid fa-phone"></i> +1 (312) 999 7988
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
