'use client';

import { useState } from 'react';
import Image from 'next/image';
import { COMPANY_HOTLINE, COMPANY_HOTLINE_TEL } from '../../../lib/constants';

/**
 * Giống trang Real Estate detail: ảnh lớn | nội dung + nút canh đáy; 3 ảnh nhỏ dưới ảnh lớn trái.
 */
export default function FeaturedDetailContent({ item, images }) {
  const list = images?.length >= 4 ? images.slice(0, 4) : images?.length > 0 ? Array(4).fill(images[0]) : [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!item) return null;

  const mainSrc = list[selectedIndex] || list[0];
  const thumbs = list.slice(0, 3);

  return (
    <div className="detail-layout detail-layout--aligned">
      <div className="detail-gallery-main">
        {mainSrc && (
          <Image
            src={mainSrc}
            alt={item.title}
            width={800}
            height={500}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
      <div className="detail-content-wrap">
        <div className="detail-info-content">
          <h2 style={{ marginBottom: '8px', fontSize: '1.75rem' }}>{item.title}</h2>
          <p className="listing-location" style={{ marginBottom: '12px' }}><i className="fa-solid fa-location-dot"></i> {item.location}</p>
          <p className="listing-price" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{item.price}</p>
          <p className="listing-desc" style={{ marginBottom: '0', lineHeight: 1.6 }}>{item.description}</p>
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
                src={src}
                alt={`${item.title} ${i + 1}`}
                width={120}
                height={90}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                sizes="120px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
