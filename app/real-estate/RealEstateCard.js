'use client';

import Link from 'next/link';
import Image from 'next/image';

const DEFAULT_IMAGES = {
  sale: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
  rent: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  default: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
};

function getCategoryLabel(listing) {
  const cat = (listing.category || listing.listing_type || '').toLowerCase();
  const title = (listing.title || '').toLowerCase();
  if (cat === 'apartment' || cat === 'apt' || title.includes('apartment')) return { label: 'Apartment', icon: 'fa-solid fa-building' };
  if (cat === 'land' || title.includes('vacant') || title.includes('land')) return { label: 'Land', icon: 'fa-solid fa-mountain-sun' };
  return { label: 'House', icon: 'fa-solid fa-house' };
}

export default function RealEstateCard({ listing }) {
  const imgSrc = listing.image_url ||
    (listing.property_type === 'rent' ? DEFAULT_IMAGES.rent : DEFAULT_IMAGES.sale);
  const cat = getCategoryLabel(listing);

  return (
    <Link href={`/real-estate/${listing.id}`} className="listing-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <span className="listing-image">
        <Image
          src={imgSrc}
          alt={listing.title}
          width={600}
          height={400}
          style={{ objectFit: 'cover', width: '100%', height: '220px' }}
          sizes="(max-width: 768px) 100vw, 400px"
          loading="lazy"
        />
        <span className="listing-category-badge">{cat.label.toUpperCase()}</span>
      </span>
      <span className="listing-info">
        <h3>{listing.title}</h3>
        <p className="listing-location">{listing.location}</p>
        <p className="listing-price">
          {listing.property_type === 'rent'
            ? `$${listing.price?.toLocaleString('en-US')}/month`
            : `$${listing.price?.toLocaleString('en-US')}`
          }
        </p>
        {listing.description && (
          <p className="listing-desc">{listing.description}</p>
        )}
        <span className="btn btn-call">View details</span>
      </span>
    </Link>
  );
}
