'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * Featured listing card: only 1 big image, category tag on image. Click goes to detail page (with gallery).
 */
export default function FeaturedCard({ id, title, image, location, price, description, badge }) {
  return (
    <Link href={`/featured/${id}`} className="listing-card">
      <span className="listing-img">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 400px"
          loading="lazy"
        />
        {badge && <span className="listing-category-badge">{String(badge).toUpperCase()}</span>}
      </span>
      <span className="listing-content">
        <h3>{title}</h3>
        <p className="listing-loc"><i className="fa-solid fa-location-dot"></i> {location}</p>
        <p className="listing-price">{price}</p>
        <p className="listing-desc">{description}</p>
        <span className="btn btn-call">View details</span>
      </span>
    </Link>
  );
}
