'use client';

import { useState } from 'react';
import Image from 'next/image';
import { COMPANY_HOTLINE, COMPANY_HOTLINE_TEL } from '../../../lib/constants';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=75';

// Cache-busting comment: v1.0.1 - Ensuring latest build is live
/**
 * Renders detail layout with 2x2 grid so button aligns with thumbs row.
 */
export default function RealEstateDetailContent({ listing, images }) {
  const initialList = images?.length >= 4 ? images.slice(0, 4) : images?.length > 0 ? Array(4).fill(images[0]) : [];
  const [list, setList] = useState(initialList);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!listing) return null;

  const handleImageError = (index) => {
    const newList = [...list];
    newList[index] = FALLBACK_IMAGE;
    setList(newList);
  };

  const mainSrc = list[selectedIndex] || list[0] || FALLBACK_IMAGE;
  const thumbs = list.slice(0, 4);

  return (
    <div className="detail-layout detail-layout--aligned">
      <div className="detail-gallery-main">
        {mainSrc && (
          <Image
            key={`${selectedIndex}-${mainSrc}`}
            src={mainSrc}
            alt={listing.title}
            width={800}
            height={500}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => handleImageError(selectedIndex)}
          />
        )}
      </div>
      <div className="detail-content-wrap">
        <div className="detail-info-content">
          <h2 style={{ marginBottom: '8px', fontSize: '1.75rem' }}>{listing.title}</h2>
          <p className="listing-location" style={{ marginBottom: '12px' }}><i className="fa-solid fa-location-dot"></i> {listing.location}</p>
          <p className="listing-price" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
            {listing.property_type === 'rent'
              ? `$${listing.price?.toLocaleString('en-US')}/month`
              : `$${listing.price?.toLocaleString('en-US')}`}
          </p>
          {(listing.area || listing.bedrooms || listing.bathrooms) && (
            <p className="listing-details" style={{ marginBottom: '12px' }}>
              {listing.area && <>{listing.area?.toLocaleString('en-US')} sqft</>}
              {listing.bedrooms && <> &bull; {listing.bedrooms} beds</>}
              {listing.bathrooms && <> &bull; {listing.bathrooms} baths</>}
            </p>
          )}
          {listing.description && (
            <p className="listing-desc" style={{ marginBottom: '0', lineHeight: 1.6 }}>{listing.description}</p>
          )}
        </div>
        <div className="detail-actions">
          <a href={COMPANY_HOTLINE_TEL} className="btn btn-call"><i className="fa-solid fa-phone"></i> {COMPANY_HOTLINE}</a>
        </div>
      </div>
      <div className="detail-gallery-thumbs">
        <div className="image-gallery-thumbs">
          {thumbs.map((src, i) => (
            <button
              key={i}
              type="button"
              className={`image-gallery-thumb ${selectedIndex === i ? 'active' : ''}`}
              onClick={() => setSelectedIndex(i)}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src || FALLBACK_IMAGE}
                alt={`${listing.title} ${i + 1}`}
                width={120}
                height={90}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                sizes="120px"
                onError={() => handleImageError(i)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
