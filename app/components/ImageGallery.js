'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * images: array of image URLs (will use first 4; if fewer, repeat the first)
 * alt: alt text for main image
 */
export default function ImageGallery({ images = [], alt = 'Item' }) {
  const list = images.length >= 4
    ? images.slice(0, 4)
    : images.length > 0
      ? Array(4).fill(images[0])
      : [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (list.length === 0) return null;

  return (
    <div className="image-gallery">
      <div className="image-gallery-main">
        <Image
          src={list[selectedIndex]}
          alt={alt}
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '12px' }}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="image-gallery-thumbs">
        {list.slice(0, 3).map((src, i) => (
          <button
            key={i}
            type="button"
            className={`image-gallery-thumb ${selectedIndex === i ? 'active' : ''}`}
            onClick={() => setSelectedIndex(i)}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              width={120}
              height={90}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              sizes="120px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
