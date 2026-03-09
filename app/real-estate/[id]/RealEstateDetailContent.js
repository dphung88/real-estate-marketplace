'use client';

import { useState } from 'react';
import Image from 'next/image';
import { COMPANY_HOTLINE, COMPANY_HOTLINE_TEL } from '../../../lib/constants';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=75';

export default function RealEstateDetailContent({ listing, images }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [shareStatus, setShareStatus] = useState('Share');

  if (!listing) return null;

  const displayImages = images?.length >= 3 ? images : [images[0], images[0], images[0]];
  const hasMorePhotos = images?.length > 3;

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Navbar + Subnav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShareStatus('Copied!');
      setTimeout(() => setShareStatus('Share'), 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  const encodedLocation = encodeURIComponent(listing.location);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  // Determine features based on property type/name
  const isForest = listing.title.toLowerCase().includes('forest') || listing.title.toLowerCase().includes('mountain') || listing.title.toLowerCase().includes('cabin');
  const isLuxury = listing.title.toLowerCase().includes('luxury') || listing.title.toLowerCase().includes('villa') || listing.price > 1000000;
  const isApartment = listing.category?.toLowerCase() === 'apartment' || listing.title.toLowerCase().includes('apartment') || listing.title.toLowerCase().includes('loft');

  // Unified beige background style
  const beigeBgStyle = { background: 'var(--color-light)', borderRadius: '16px', border: '1px solid rgba(181, 148, 91, 0.2)' };

  return (
    <div className="detail-container">
      {/* Zillow-style Header Actions */}
      <div className="detail-header-actions" style={{ background: 'transparent' }}>
        <div className="detail-subnav">
          <button 
            className={`detail-subnav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => scrollToSection('overview')}
          >
            Overview
          </button>
          <button 
            className={`detail-subnav-btn ${activeTab === 'facts' ? 'active' : ''}`}
            onClick={() => scrollToSection('facts')}
          >
            Facts and features
          </button>
          <button 
            className={`detail-subnav-btn ${activeTab === 'neighborhood' ? 'active' : ''}`}
            onClick={() => scrollToSection('neighborhood')}
          >
            Neighborhood
          </button>
          <button 
            className={`detail-subnav-btn ${activeTab === 'cost' ? 'active' : ''}`}
            onClick={() => scrollToSection('cost')}
          >
            Cost calculator
          </button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="save-btn"
            onClick={handleShare}
            style={{ minWidth: '100px' }}
          >
            <i className={shareStatus === 'Copied!' ? "fa-solid fa-check" : "fa-solid fa-share-nodes"}></i>
            {shareStatus}
          </button>
          <button 
            className={`save-btn ${isSaved ? 'saved' : ''}`}
            onClick={() => setIsSaved(!isSaved)}
          >
            <i className={isSaved ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Zillow-style Gallery */}
      <div className="z-gallery" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div className="z-gallery-item" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image 
              src={displayImages[0] || FALLBACK_IMAGE} 
              alt={listing.title} 
              fill 
              style={{ objectFit: 'cover', borderRadius: '16px' }}
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>
        </div>
        <div className="z-gallery-item" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image 
              src={displayImages[1] || displayImages[0] || FALLBACK_IMAGE} 
              alt={listing.title} 
              fill 
              style={{ objectFit: 'cover', borderRadius: '16px' }}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="z-gallery-item" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image 
              src={displayImages[2] || displayImages[0] || FALLBACK_IMAGE} 
              alt={listing.title} 
              fill 
              style={{ objectFit: 'cover', borderRadius: '16px' }}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {hasMorePhotos && (
              <div className="z-gallery-more">+{images.length - 2} photos</div>
            )}
          </div>
        </div>
      </div>

      <div className="detail-layout">
        <div className="detail-main-content">
          {/* Overview Section */}
          <section id="overview" className="detail-section">
            <div className="detail-info-content">
              <h2 style={{ marginBottom: '8px', fontSize: '2.25rem', fontWeight: '700', color: 'var(--color-dark)' }}>{listing.title}</h2>
              <p className="listing-location" style={{ marginBottom: '20px', fontSize: '1.15rem', color: '#666' }}>
                <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-accent)' }}></i> {listing.location}
              </p>
              
              <div style={{ display: 'flex', gap: '32px', marginBottom: '28px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-dark)' }}>
                  {listing.property_type === 'rent'
                    ? `$${listing.price?.toLocaleString('en-US')}/mo`
                    : `$${listing.price?.toLocaleString('en-US')}`}
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: '600', color: '#555' }}>
                  {listing.bedrooms || 0} <span style={{ fontWeight: '400', fontSize: '1.1rem' }}>bd</span> | {listing.bathrooms || 0} <span style={{ fontWeight: '400', fontSize: '1.1rem' }}>ba</span> | {listing.area?.toLocaleString('en-US') || 0} <span style={{ fontWeight: '400', fontSize: '1.1rem' }}>sqft</span>
                </span>
              </div>

              <div className="listing-desc" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
                <p>{listing.description}</p>
              </div>
            </div>
          </section>

          {/* Facts Section */}
          <section id="facts" className="detail-section">
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '12px', color: 'var(--color-dark)' }}>Facts, features & policies</h2>
            
            <div className="facts-group">
              <h3 className="facts-group-title">Building Amenities</h3>
              <div className="facts-subgrid">
                <div className="facts-subgroup">
                  <h4>Common Areas</h4>
                  <ul className="facts-list">
                    {isApartment ? (
                      <>
                        <li>Fitness Center: Fitness Formula Health Club On-Site**</li>
                        <li>Lounge: Free WiFi in The M Lounge</li>
                        <li>Rooftop Terrace with City Views</li>
                      </>
                    ) : (
                      <>
                        <li>Private Sundeck & Patio</li>
                        <li>Community Fire Pit Area</li>
                        <li>Landscaped Gardens</li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="facts-subgroup">
                  <h4>Security</h4>
                  <ul className="facts-list">
                    <li>{isApartment ? '24/7 Doorman & DoorAttendant' : 'Smart Security System'}</li>
                    <li>Secure Parcel Package Room</li>
                    <li>Controlled Access Entry</li>
                  </ul>
                </div>
                <div className="facts-subgroup">
                  <h4>Services</h4>
                  <ul className="facts-list">
                    <li>Professional Management</li>
                    <li>Online Rent/Payment Portal</li>
                    <li>{isLuxury ? 'Concierge Services' : 'On-call Maintenance'}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="facts-group">
              <h3 className="facts-group-title">Unit Features</h3>
              <div className="facts-subgrid">
                <div className="facts-subgroup">
                  <h4>Appliances</h4>
                  <ul className="facts-list">
                    <li>Energy-Star Stainless Dishwasher</li>
                    <li>In-Unit Washer/Dryer</li>
                    <li>Modern Chef-style Range</li>
                  </ul>
                </div>
                <div className="facts-subgroup">
                  <h4>Tech & Connectivity</h4>
                  <ul className="facts-list">
                    <li>Gigabit High-speed Internet Ready</li>
                    <li>Smart Thermostat System</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Neighborhood Section */}
          <section id="neighborhood" className="detail-section">
            <h3>Neighborhood</h3>
            <div style={{ position: 'relative', height: '450px', borderRadius: '20px', overflow: 'hidden', border: '1px solid #ddd', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapEmbedUrl}
              ></iframe>
            </div>
            <div style={{ display: 'flex', gap: '20px', marginTop: '24px', flexWrap: 'wrap' }}>
              <div style={{ ...beigeBgStyle, flex: 1, minWidth: '200px', padding: '24px', boxShadow: 'none' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-accent)' }}>85</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: '#888', marginTop: '4px' }}>Walk Score®</div>
                <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Very Walkable. Most errands can be accomplished on foot.</p>
              </div>
              <div style={{ ...beigeBgStyle, flex: 1, minWidth: '200px', padding: '24px', boxShadow: 'none' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-accent)' }}>72</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: '#888', marginTop: '4px' }}>Transit Score®</div>
                <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Excellent Transit. Transit is convenient for most trips.</p>
              </div>
            </div>
          </section>

          {/* Cost Calculator Section */}
          <section id="cost" className="detail-section">
            <h3>Cost calculator</h3>
            <div className="cost-calculator" style={{ ...beigeBgStyle, border: 'none' }}>
              <div className="calc-row">
                <span>{listing.property_type === 'rent' ? 'Monthly Rent' : 'Estimated Mortgage'}</span>
                <strong style={{ fontSize: '1.1rem' }}>${listing.price?.toLocaleString('en-US')}</strong>
              </div>
              <div className="calc-row">
                <span>Estimated Utilities</span>
                <strong style={{ fontSize: '1.1rem' }}>$150</strong>
              </div>
              <div className="calc-row">
                <span>Property Insurance</span>
                <strong style={{ fontSize: '1.1rem' }}>$45</strong>
              </div>
              <div className="calc-row total" style={{ color: 'var(--color-dark)' }}>
                <span>Total Monthly Cost</span>
                <span style={{ color: 'var(--color-accent)' }}>${(listing.price + 195).toLocaleString('en-US')}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Sidebar */}
        <aside className="detail-sidebar">
          <div style={{ ...beigeBgStyle, padding: '32px', boxShadow: '0 12px 40px rgba(27, 28, 54, 0.12)' }}>
            <h4 style={{ marginBottom: '24px', fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-dark)', textAlign: 'center' }}>Contact for more info</h4>
            <div className="detail-actions" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a 
                href={`mailto:agent@axiomllc.com?subject=Inquiry about ${encodeURIComponent(listing.title)}`} 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '20px', fontSize: '1.05rem', borderRadius: '12px' }}
              >
                <i className="fa-solid fa-envelope"></i> Contact Agent
              </a>
              <a 
                href={COMPANY_HOTLINE_TEL} 
                className="btn btn-call" 
                style={{ width: '100%', padding: '20px', fontSize: '1.05rem', borderRadius: '12px' }}
              >
                <i className="fa-solid fa-phone"></i> {COMPANY_HOTLINE}
              </a>
            </div>
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '0.85rem', color: '#888', textAlign: 'center', marginBottom: '8px' }}>
                Property ID: <span style={{ fontWeight: '600', color: '#555' }}>{listing.id}</span>
              </p>
              <p style={{ fontSize: '0.85rem', color: '#888', textAlign: 'center' }}>
                Listed by: Axiom Realty LLC
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
