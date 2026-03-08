'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function UsedItemDetail({ item }) {
  const [checkingOut, setCheckingOut] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = item.images && item.images.length >= 1
    ? item.images.slice(0, 4)
    : [item.image, item.image, item.image, item.image];
  const list = images.length >= 4 ? images : images.length > 0 ? [...images, ...Array(4 - images.length).fill(images[0])] : [];
  const mainSrc = list[selectedIndex] || list[0];
  const thumbs = list.slice(0, 4); // 4 thumb: full, body, tire, interior — click đổi ảnh chính

  const handleCheckout = async () => {
    if (checkingOut) return;
    setCheckingOut(true);
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
        setCheckingOut(false);
      }
    } catch (e) {
      alert('Error: ' + (e.message || 'Checkout failed'));
      setCheckingOut(false);
    }
  };

  return (
    <div className="detail-layout detail-layout--used">
      <div className="detail-gallery-main">
        {mainSrc && (
          <Image
            key={selectedIndex}
            src={mainSrc}
            alt={`${item.title} — image ${selectedIndex + 1}`}
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
          <p className="listing-loc" style={{ marginBottom: '12px' }}><i className="fa-solid fa-location-dot"></i> {item.location}</p>
          <p className="listing-price" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>${item.price.toLocaleString('en-US')}</p>
          <p style={{ marginBottom: '8px', color: 'var(--color-dark)', opacity: 0.9 }}><strong>Condition:</strong> {item.condition}</p>
          <p className="listing-desc" style={{ marginBottom: '0', lineHeight: 1.6 }}>{item.description}</p>
        </div>
        <div className="detail-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCheckout}
            disabled={checkingOut}
          >
            {checkingOut ? <><i className="fa-solid fa-spinner fa-spin"></i> Loading...</> : <><i className="fa-solid fa-credit-card"></i> Checkout ${item.price.toLocaleString('en-US')}</>}
          </button>
          <a href="tel:+13129997988" className="btn btn-call"><i className="fa-solid fa-phone"></i> +1 (312) 999 7988</a>
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
