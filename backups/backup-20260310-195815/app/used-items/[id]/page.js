import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ALL_ITEMS } from '../../../lib/usedItemsData';
import UsedItemDetail from './UsedItemDetail';

function getCategoryLabel(cat) {
  if (cat === 'cars') return 'Car';
  if (cat === 'lawnmowers') return 'Lawn Mower';
  if (cat === 'mobile-homes') return 'Mobile Home';
  return 'Other';
}

export async function generateStaticParams() {
  return ALL_ITEMS.map((item) => ({ id: String(item.id) }));
}

export default async function UsedItemPage({ params }) {
  const id = Number(params?.id);
  const item = ALL_ITEMS.find((i) => i.id === id);

  if (!item) {
    return (
      <>
        <Navbar />
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h1>Item not found</h1>
            <Link href="/used-items" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Used Items</Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container">
          <Link href="/used-items" style={{ color: 'var(--color-accent)', marginBottom: '8px', display: 'inline-block' }}>
            <i className="fa-solid fa-arrow-left"></i> Back to Used Items
          </Link>
          <h1><i className="fa-solid fa-tag"></i> {item.title}</h1>
          <p>{getCategoryLabel(item.category)} • {item.location}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <UsedItemDetail item={item} />
        </div>
      </section>
      <Footer />
    </>
  );
}
