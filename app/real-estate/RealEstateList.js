'use client';

import { useState, useEffect } from 'react';
import RealEstateCard from './RealEstateCard';

const LISTINGS_PER_PAGE = 6;

export default function RealEstateList({ listings = [] }) {
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const type = params.get('type');
    if (type) {
      setSelectedType(type);
    }
  }, []);

  const filteredListings = listings.filter(item => {
    if (selectedType === 'all') return true;
    return item.type === selectedType;
  });

  const [visibleCount, setVisibleCount] = useState(LISTINGS_PER_PAGE);
  const listingsToShow = filteredListings.slice(0, visibleCount);
  const hasMore = visibleCount < listings.length;
  const showLoadMore = listings.length > LISTINGS_PER_PAGE && hasMore;

  if (listings.length === 0) {
    return (
      <p style={{ textAlign: 'center', padding: '40px' }}>No listings found. Check back soon!</p>
    );
  }

  return (
    <>
      <div className="listings-grid">
        {listingsToShow.map((listing) => (
          <RealEstateCard key={listing.id} listing={listing} />
        ))}
      </div>
      {showLoadMore && (
        <div className="load-more-wrap" style={{ textAlign: 'center', marginTop: '28px' }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setVisibleCount((c) => c + LISTINGS_PER_PAGE)}
          >
            <i className="fa-solid fa-chevron-down" style={{ marginRight: '8px' }}></i>
            Load more ({listings.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </>
  );
}
