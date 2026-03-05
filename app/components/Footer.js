import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0d1b2a',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '20px 0',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        {/* LOGO */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/AXIOM LLC Logo.png"
            alt="Axiom Realty"
            width={50}
            height={50}
            style={{ objectFit: 'contain', width: '50px', height: '50px' }}
          />
        </Link>

        {/* TAGLINE */}
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>
          Your trusted platform for real estate &amp; used items across the US.
        </p>

        {/* NAV LINKS */}
        <nav style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#C9A84C', fontSize: '14px', textDecoration: 'none' }}>Home</Link>
          <Link href="/real-estate" style={{ color: '#C9A84C', fontSize: '14px', textDecoration: 'none' }}>Real Estate</Link>
          <Link href="/used-items" style={{ color: '#C9A84C', fontSize: '14px', textDecoration: 'none' }}>Used Items</Link>
          <Link href="/contact" style={{ color: '#C9A84C', fontSize: '14px', textDecoration: 'none' }}>Contact</Link>
        </nav>

        {/* COPYRIGHT */}
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>
          &copy; {new Date().getFullYear()} Axiom Realty LLC
        </p>
      </div>
    </footer>
  );
}
