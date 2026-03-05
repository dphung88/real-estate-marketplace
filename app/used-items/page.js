import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

export const metadata = {
  title: 'Used Items - Axiom Realty',
};

const USED_ITEMS = [
  {
    id: 1,
    title: 'Toyota Camry 2020',
    category: 'Car',
    location: 'Chicago, IL',
    price: 22500,
    description: '45,000 miles, excellent condition, 1 owner, full service history.',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80',
  },
  {
    id: 2,
    title: 'John Deere Riding Mower',
    category: 'Lawn Mower',
    location: 'Chicago, IL',
    price: 1800,
    description: '2019 model, 200 hours of use, good condition, clean and serviced.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: 3,
    title: '2018 Clayton Mobile Home',
    category: 'Mobile Home',
    location: 'Chicago, IL',
    price: 45000,
    description: '3 bedrooms, 2 baths, 1,200 sqft, well-maintained, move-in ready.',
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=80',
  },
];

export default function UsedItemsPage() {
  return (
    <>
      <Navbar />

      {/* HERO BANNER */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <Image
            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1600&q=80"
            alt="Used Items Banner"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            unoptimized
          />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="page-hero-content">
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
              <button className="btn btn-sm">Search</button>
            </div>
          </div>

          <div className="listings-grid">
            {USED_ITEMS.map((item) => (
              <div className="listing-card" key={item.id}>
                <div className="listing-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    style={{ objectFit: 'cover', width: '100%', height: '220px' }}
                    unoptimized
                  />
                  <span className="listing-badge badge-used">Used Item</span>
                </div>
                <div className="listing-info">
                  <span className="listing-type badge-type">
                    <i className="fa-solid fa-tag"></i> {item.category}
                  </span>
                  <h3>{item.title}</h3>
                  <p className="listing-loc">{item.location}</p>
                  <p className="listing-price">${item.price.toLocaleString('en-US')}</p>
                  <p className="listing-desc">{item.description}</p>
                  <a href="tel:+13129997988" className="btn btn-primary">+1 (312) 999 7988</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
