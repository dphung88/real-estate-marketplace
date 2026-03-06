'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

const BANNER_IMAGES = [
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=75',
  'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=75',
  'https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=1200&q=75',
];

const ALL_ITEMS = [
  // CARS (6 items)
  { id: 1, title: 'Toyota Camry 2020', category: 'cars', location: 'Chicago, IL', price: 22500, condition: 'excellent', description: '45,000 miles, excellent condition, 1 owner, full service history.', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=75' },
  { id: 2, title: 'Honda Accord 2019', category: 'cars', location: 'Chicago, IL', price: 19800, condition: 'excellent', description: '52,000 miles, clean title, leather seats, sunroof.', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=75' },
  { id: 3, title: 'Ford F-150 2018', category: 'cars', location: 'Naperville, IL', price: 28500, condition: 'good', description: '68,000 miles, crew cab, 4WD, tow package included.', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=75' },
  { id: 4, title: 'Chevrolet Malibu 2021', category: 'cars', location: 'Chicago, IL', price: 19500, condition: 'excellent', description: '32,000 miles, one owner, Apple CarPlay, backup camera.', image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=75' },
  { id: 5, title: 'Nissan Altima 2020', category: 'cars', location: 'Evanston, IL', price: 17200, condition: 'good', description: '48,000 miles, fuel efficient, keyless entry, well maintained.', image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=75' },
  { id: 6, title: 'Hyundai Sonata 2022', category: 'cars', location: 'Chicago, IL', price: 21500, condition: 'excellent', description: '22,000 miles, pristine condition, remaining warranty transferable.', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=75' },
  // LAWN MOWERS (6 items) - verified lawn/garden equipment images
  { id: 7, title: 'John Deere Riding Mower', category: 'lawnmowers', location: 'Chicago, IL', price: 1800, condition: 'good', description: '2019 model, 200 hours of use, good condition, clean and serviced.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { id: 8, title: 'Husqvarna Zero Turn Mower', category: 'lawnmowers', location: 'Oak Park, IL', price: 3200, condition: 'excellent', description: '2021 model, 42" deck, hydrostatic drive, low hours.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { id: 9, title: 'Toro Push Mower 22"', category: 'lawnmowers', location: 'Chicago, IL', price: 220, condition: 'good', description: 'Self-propelled, electric start, mulching capability.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { id: 10, title: 'Cub Cadet XT1', category: 'lawnmowers', location: 'Wheaton, IL', price: 1450, condition: 'excellent', description: '2018 model, 42" cut, bagger included, garage kept.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { id: 11, title: 'Snapper Riding Mower', category: 'lawnmowers', location: 'Chicago, IL', price: 950, condition: 'good', description: '30" deck, 12.5 HP, reliable for small yards.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { id: 12, title: 'Greenworks 40V Cordless Mower', category: 'lawnmowers', location: 'Evanston, IL', price: 380, condition: 'excellent', description: 'Battery-powered, quiet, includes 2 batteries and charger.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  // MOBILE HOMES (6 items)
  { id: 13, title: '2018 Clayton Mobile Home', category: 'mobile-homes', location: 'Chicago, IL', price: 45000, condition: 'excellent', description: '3 bedrooms, 2 baths, 1,200 sqft, well-maintained, move-in ready.', image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=75' },
  { id: 14, title: 'Fleetwood Single Wide 2020', category: 'mobile-homes', location: 'Joliet, IL', price: 52000, condition: 'excellent', description: '2 beds, 2 baths, 1,000 sqft, new HVAC, skirting included.', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=75' },
  { id: 15, title: 'Champion Double Wide 2016', category: 'mobile-homes', location: 'Rockford, IL', price: 38000, condition: 'good', description: '4 beds, 2 baths, 1,500 sqft, large lot, porch included.', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=75' },
  { id: 16, title: 'Cavco Park Model 2019', category: 'mobile-homes', location: 'Peoria, IL', price: 68000, condition: 'excellent', description: '3 beds, 2 baths, 1,800 sqft, luxury finishes, lake view.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=75' },
  { id: 17, title: 'Palm Harbor Double Wide', category: 'mobile-homes', location: 'Chicago, IL', price: 55000, condition: 'good', description: '3 beds, 2 baths, 1,350 sqft, vinyl siding, deck.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75' },
  { id: 18, title: 'Skyline Single Wide 2015', category: 'mobile-homes', location: 'Springfield, IL', price: 29000, condition: 'fair', description: '2 beds, 1 bath, 720 sqft, needs minor updates, solid structure.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=75' },
  // OTHER ITEMS (6 items)
  { id: 19, title: 'Weber Genesis Gas Grill', category: 'other', location: 'Chicago, IL', price: 450, condition: 'excellent', description: '3 burners, side burner, cover included, used 2 seasons.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=75' },
  { id: 20, title: 'Samsung 65" Smart TV', category: 'other', location: 'Oak Park, IL', price: 580, condition: 'excellent', description: '4K UHD, HDR, like new with remote and stand.', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=75' },
  { id: 21, title: 'Queen Bedroom Set', category: 'other', location: 'Chicago, IL', price: 650, condition: 'good', description: 'Bed frame, mattress, headboard, 2 nightstands. Solid wood.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=75' },
  { id: 22, title: 'Canon EOS R5 Camera', category: 'other', location: 'Evanston, IL', price: 3200, condition: 'excellent', description: '45MP, 8K video, 2 lenses included, low shutter count.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=75' },
  { id: 23, title: 'DeWalt Power Tool Set', category: 'other', location: 'Chicago, IL', price: 420, condition: 'good', description: 'Drill, impact driver, circular saw, 2 batteries, charger.', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=75' },
  { id: 24, title: 'Peloton Bike', category: 'other', location: 'Naperville, IL', price: 1450, condition: 'excellent', description: 'Gen 2, subscription transferable, shoes and weights included.', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=75' },
];

export default function UsedItemsPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-rotate banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filterItems = () => {
    return ALL_ITEMS.filter((item) => {
      if (selectedCategory && item.category !== selectedCategory) return false;
      if (selectedPriceRange === 'low' && item.price >= 5000) return false;
      if (selectedPriceRange === 'mid' && (item.price < 5000 || item.price > 20000)) return false;
      if (selectedPriceRange === 'high' && item.price <= 20000) return false;
      if (selectedCondition && item.condition !== selectedCondition) return false;
      return true;
    });
  };

  const filteredItems = filterItems();
  const [checkingOut, setCheckingOut] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [cancelMsg, setCancelMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    if (params.get('success') === 'true') {
      setSuccessMsg(params.get('item') ? `Thank you! Payment received for ${decodeURIComponent(params.get('item'))}.` : 'Payment successful!');
      window.history.replaceState({}, '', '/used-items');
    }
    if (params.get('canceled') === 'true') {
      setCancelMsg('Checkout was canceled.');
      window.history.replaceState({}, '', '/used-items');
    }
  }, []);

  const handleCheckout = async (item) => {
    if (checkingOut) return;
    setCheckingOut(item.id);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Could not start checkout.');
        setCheckingOut(null);
      }
    } catch (e) {
      alert('Error: ' + (e.message || 'Checkout failed'));
      setCheckingOut(null);
    }
  };

  const getCategoryLabel = (cat) => {
    if (cat === 'cars') return 'Car';
    if (cat === 'lawnmowers') return 'Lawn Mower';
    if (cat === 'mobile-homes') return 'Mobile Home';
    return 'Other';
  };

  return (
    <>
      <Navbar />

      {/* HERO BANNER CAROUSEL */}
      <section className="page-hero" style={{position: 'relative', overflow: 'hidden'}}>
        {BANNER_IMAGES.map((img, index) => (
          <div
            key={index}
            className="page-hero-bg"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentBanner === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: currentBanner === index ? 1 : 0,
            }}
          >
            <Image
              src={img}
              alt="Banner"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={index === 0}
              sizes="100vw"
            />
            <div className="page-hero-overlay"></div>
          </div>
        ))}
        <div className="page-hero-content" style={{position: 'relative', zIndex: 2}}>
          <h1><i className="fa-solid fa-tags"></i> Used Items for Sale</h1>
          <p>Find quality second-hand cars, lawn mowers, mobile homes, and more.</p>
        </div>
      </section>

      {/* FILTER + LISTINGS */}
      <section className="section">
        <div className="container">
          {successMsg && (
            <div className="alert alert-success" style={{ marginBottom: '16px', padding: '12px 16px', background: '#d4edda', color: '#155724', borderRadius: '8px' }}>
              <i className="fa-solid fa-circle-check"></i> {successMsg}
            </div>
          )}
          {cancelMsg && (
            <div className="alert alert-info" style={{ marginBottom: '16px', padding: '12px 16px', background: '#d1ecf1', color: '#0c5460', borderRadius: '8px' }}>
              <i className="fa-solid fa-info-circle"></i> {cancelMsg}
            </div>
          )}
          <div className="filter-bar">
            <div className="filter-group">
              <select 
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="cars">Cars</option>
                <option value="lawnmowers">Lawn Mowers</option>
                <option value="mobile-homes">Mobile Homes</option>
                <option value="other">Other Items</option>
              </select>
              <select 
                className="filter-select"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="">Price Range</option>
                <option value="low">Under $5,000</option>
                <option value="mid">$5,000 - $20,000</option>
                <option value="high">Above $20,000</option>
              </select>
              <select 
                className="filter-select"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                <option value="">Condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
              <button 
                className="btn btn-sm"
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedPriceRange('');
                  setSelectedCondition('');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <p className="empty-filter-message">
              No items found matching your filters. Try adjusting your search criteria.
            </p>
          ) : (
            <div className="listings-grid listings-grid-used">
              {filteredItems.map((item) => (
                <div className="listing-card" key={item.id}>
                  <div className="listing-image">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={400}
                      style={{ objectFit: 'cover', width: '100%', height: '220px' }}
                      loading="lazy"
                    />
                    <span className="listing-category-badge">{getCategoryLabel(item.category)}</span>
                  </div>
                  <div className="listing-info">
                    <h3>{item.title}</h3>
                    <p className="listing-loc">{item.location}</p>
                    <p className="listing-price">${item.price.toLocaleString('en-US')}</p>
                    <p className="listing-desc">{item.description}</p>
                    <div className="listing-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleCheckout(item)}
                        disabled={checkingOut === item.id}
                      >
                        {checkingOut === item.id ? (
                          <><i className="fa-solid fa-spinner fa-spin"></i> Loading...</>
                        ) : (
                          <><i className="fa-solid fa-credit-card"></i> Checkout ${item.price.toLocaleString('en-US')}</>
                        )}
                      </button>
                      <a href="tel:+13129997988" className="btn btn-call"><i className="fa-solid fa-phone"></i> +1 (312) 999 7988</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
