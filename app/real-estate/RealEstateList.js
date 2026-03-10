'use client';

import { useState } from 'react';
import RealEstateCard from './RealEstateCard';

const LISTINGS_PER_PAGE = 6;

export default function RealEstateList({ listings = [] }) {
  const [visibleCount, setVisibleCount] = useState(LISTINGS_PER_PAGE);
  const listingsToShow = listings.slice(0, visibleCount);
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
