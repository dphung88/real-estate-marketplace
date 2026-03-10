'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { ALL_ITEMS, ITEMS_PER_PAGE } from '../../lib/usedItemsData';

const BANNER_IMAGES = [
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=75',
  'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=75',
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=75',
];

export default function UsedItemsPage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const cat = params.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, []);

  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Auto-rotate banner
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

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory, selectedPriceRange, selectedCondition]);

  const itemsToShow = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;
  const showLoadMore = filteredItems.length > ITEMS_PER_PAGE && hasMore;

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
      <section className="section section-tight-top">
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
            <>
            <div className="listings-grid listings-grid-used">
              {itemsToShow.map((item) => (
                <div className="listing-card" key={item.id}>
                  <Link href={`/used-items/${item.id}`} className="listing-card-link" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                    <span className="listing-image">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={400}
                        style={{ objectFit: 'cover', width: '100%', height: '220px' }}
                        loading="lazy"
                      />
                      <span className="listing-category-badge">{getCategoryLabel(item.category)}</span>
                    </span>
                    <span className="listing-info">
                      <h3>{item.title}</h3>
                      <p className="listing-loc">{item.location}</p>
                      <p className="listing-price">${item.price.toLocaleString('en-US')}</p>
                      <p className="listing-desc">{item.description}</p>
                    </span>
                  </Link>
                  <span className="listing-actions">
                    <button
                      type="button"
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
                  </span>
                </div>
              ))}
            </div>
            {showLoadMore && (
              <div className="load-more-wrap" style={{ textAlign: 'center', marginTop: '28px' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                >
                  <i className="fa-solid fa-chevron-down" style={{ marginRight: '8px' }}></i>
                  Load more ({filteredItems.length - visibleCount} remaining)
                </button>
              </div>
            )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
