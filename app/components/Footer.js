import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0d1b2a',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '16px 0',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>

        {/* LOGO + BRAND */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/AXIOM LLC Logo.png"
            alt="Axiom Realty"
            width={45}
            height={45}
            style={{ objectFit: 'contain', width: '45px', height: '45px' }}
          />
        </Link>

        {/* SLOGAN */}         <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', margin: 0, flexGrow: 1, textAlign: 'center' }}>           Your trusted platform for real estate &amp; quality used items across the United States.         </p>          {/* CONTACT ICONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="https://www.facebook.com/share/1AbdHWCaqN/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
            style={{ color: '#C9A84C', fontSize: '20px' }}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://wa.me/13129997988" target="_blank" rel="noopener noreferrer"
            style={{ color: '#C9A84C', fontSize: '20px' }}>
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://www.tiktok.com/@mceagle.mentor" target="_blank" rel="noopener noreferrer"
            style={{ color: '#C9A84C', fontSize: '20px' }}>
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://youtube.com/@mceagle.essentials" target="_blank" rel="noopener noreferrer"
            style={{ color: '#C9A84C', fontSize: '20px' }}>
            <i className="fab fa-youtube"></i>
          </a>
          <a href="tel:+13129997988"
            style={{ color: '#C9A84C', fontSize: '20px' }}>
            <i className="fas fa-phone"></i>
          </a>
        </div>

        {/* COPYRIGHT */}
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>
          &copy; {new Date().getFullYear()} Axiom Realty LLC
        </p>

      </div>
    </footer>
  );
}
