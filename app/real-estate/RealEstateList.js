'use client';

import { useState } from 'react';
import RealEstateCard from './RealEstateCard';

const LISTINGS_PER_PAGE = 6;

export default function RealEstateList({ listings = [] }) {
  const [visibleCount, setVisibleCount] = useState(LISTINGS_PER_PAGE);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Properties', icon: 'fa-house' },
    { id: 'sale', label: 'For Sale', icon: 'fa-tag' },
    { id: 'rent', label: 'For Rent', icon: 'fa-key' },
    { id: 'house', label: 'Houses', icon: 'fa-home' },
    { id: 'apartment', label: 'Apartments', icon: 'fa-building' },
  ];

  const filteredListings = listings.filter((listing) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'sale') return listing.type === 'sale';
    if (activeCategory === 'rent') return listing.type === 'rent';
    return listing.category === activeCategory;
  });

  const listingsToShow = filteredListings.slice(0, visibleCount);
  const hasMore = visibleCount < filteredListings.length;
  const showLoadMore = filteredListings.length > LISTINGS_PER_PAGE && hasMore;

  if (listings.length === 0) {
    return (
      <p style={{ textAlign: 'center', padding: '40px' }}>No listings found. Check back soon!</p>
    );
  }

  return (
    <>
      <div className="category-filters" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '12px', 
        marginBottom: '40px', 
        flexWrap: 'wrap' 
      }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setVisibleCount(LISTINGS_PER_PAGE);
            }}
            className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '50px'
            }}
          >
            <i className={`fa-solid ${cat.icon}`}></i>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="listings-grid">
        {listingsToShow.map((listing) => (
          <RealEstateCard key={listing.id} listing={listing} />
        ))}
      </div>

      {listingsToShow.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px', marginTop: '20px' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '3rem', color: '#ddd', marginBottom: '20px' }}></i>
          <h3 style={{ color: '#1a1a2e' }}>No properties found</h3>
          <p style={{ color: '#666' }}>We couldn't find any properties matching the "{categories.find(c => c.id === activeCategory)?.label}" category.</p>
          <button 
            className="btn btn-sm" 
            style={{ marginTop: '20px' }}
            onClick={() => setActiveCategory('all')}
          >
            Show All Properties
          </button>
        </div>
      )}

      {showLoadMore && (
        <div className="load-more-wrap" style={{ textAlign: 'center', marginTop: '28px' }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setVisibleCount((c) => c + LISTINGS_PER_PAGE)}
          >
            <i className="fa-solid fa-chevron-down" style={{ marginRight: '8px' }}></i>
            Load more ({filteredListings.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </>
  );
}
