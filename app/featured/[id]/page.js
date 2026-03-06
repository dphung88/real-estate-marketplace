import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getFeaturedItem } from '../../../lib/featuredData';
import FeaturedDetailContent from './FeaturedDetailContent';

export async function generateStaticParams() {
  const { FEATURED_ITEMS } = await import('../../../lib/featuredData');
  return FEATURED_ITEMS.map((item) => ({ id: String(item.id) }));
}

export default async function FeaturedDetailPage({ params }) {
  const id = params?.id;
  const item = id ? getFeaturedItem(id) : null;

  if (!item) {
    return (
      <>
        <Navbar />
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h1>Listing not found</h1>
            <Link href="/" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Home</Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const images = item.images?.length >= 4
    ? item.images.slice(0, 4)
    : item.images?.length > 0
      ? Array(4).fill(item.images[0])
      : Array(4).fill('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=75');

  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container">
          <Link href="/" style={{ color: 'var(--color-accent)', marginBottom: '8px', display: 'inline-block' }}>
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
          <h1><i className="fa-solid fa-star"></i> {item.title}</h1>
          <p>{item.badge} • {item.location}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <FeaturedDetailContent item={item} images={images} />
        </div>
      </section>
      <Footer />
    </>
  );
}
