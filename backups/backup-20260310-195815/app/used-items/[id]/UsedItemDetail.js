'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function UsedItemDetail({ item }) {
  const [checkingOut, setCheckingOut] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!item) return null;

  const images = item.images && item.images.length >= 1 
    ? item.images.slice(0, 4) 
    : [item.image, item.image, item.image, item.image];

  const list = images.length >= 4 
    ? images 
    : images.length > 0 
      ? [...images, ...Array(4 - images.length).fill(images[0])] 
      : [];

  const mainSrc = list[selectedIndex] || list[0];
  const thumbs = list.slice(0, 4);

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

  const beigeBgStyle = { background: 'var(--color-light)', borderRadius: '16px', border: '1px solid rgba(181, 148, 91, 0.2)' };

  return (
    <div className="detail-layout" style={{ maxWidth: '1200px' }}>
      <div className="detail-main-content">
        <div className="detail-gallery-wrapper" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <div className="detail-gallery-main" style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '16px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', position: 'relative', aspectRatio: '16/10' }}>
            {mainSrc && (
              <Image
                key={selectedIndex}
                src={mainSrc}
                alt={`${item.title} — image ${selectedIndex + 1}`}
                fill
                style={{ objectFit: 'cover', borderRadius: '20px' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
          
          <div className="detail-gallery-thumbs" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {thumbs.map((src, i) => (
              <button
                key={i}
                type="button"
                className={`image-gallery-thumb ${selectedIndex === i ? 'active' : ''}`}
                onClick={() => setSelectedIndex(i)}
                style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  border: selectedIndex === i ? '3px solid var(--color-accent)' : '3px solid transparent', 
                  padding: 0,
                  aspectRatio: '4/3',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'block',
                  width: '100%',
                  transition: 'transform 0.2s',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src={src}
                    alt={`${item.title} ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="200px"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className="detail-sidebar">
        <div style={{ ...beigeBgStyle, padding: '32px', boxShadow: '0 12px 40px rgba(27, 28, 54, 0.1)' }}>
          <h2 style={{ marginBottom: '8px', fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-dark)' }}>{item.title}</h2>
          <p className="listing-loc" style={{ marginBottom: '12px', fontSize: '1rem', color: '#666' }}>
            <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-accent)' }}></i> {item.location}
          </p>
          <p className="listing-price" style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-dark)', marginBottom: '16px' }}>
            ${item.price.toLocaleString('en-US')}
          </p>
          
          <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(181, 148, 91, 0.1)', borderRadius: '12px' }}>
            <p style={{ marginBottom: '4px', color: 'var(--color-dark)' }}>
              <strong style={{ fontWeight: '700' }}>Condition:</strong> <span style={{ textTransform: 'capitalize' }}>{item.condition}</span>
            </p>
          </div>

          <p className="listing-desc" style={{ marginBottom: '28px', lineHeight: 1.7, color: '#444' }}>{item.description}</p>
          
          <div className="detail-actions" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCheckout}
              disabled={checkingOut}
              style={{ width: '100%', padding: '18px', fontSize: '1.05rem', borderRadius: '12px' }}
            >
              {checkingOut ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Loading...</>
              ) : (
                <><i className="fa-solid fa-credit-card"></i> Checkout ${item.price.toLocaleString('en-US')}</>
              )}
            </button>
            <a 
              href="tel:+13129997988" 
              className="btn btn-call"
              style={{ width: '100%', padding: '18px', fontSize: '1.05rem', borderRadius: '12px' }}
            >
              <i className="fa-solid fa-phone"></i> +1 (312) 999 7988
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
