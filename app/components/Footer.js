import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_HOTLINE_TEL, COMPANY_WHATSAPP } from '../../lib/constants';
import { LOGO } from '../../lib/theme';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">

        {/* LOGO + BRAND */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={LOGO.white}
            alt="Axiom Realty"
            width={45}
            height={45}
            style={{ objectFit: 'contain', width: '45px', height: '45px' }}
          />
        </Link>

        {/* 2 dòng text (slogan + copyright) */}
        <div className="footer-text-lines">
          <p style={{ color: 'var(--color-light)', opacity: 0.85, fontSize: '13px', margin: 0 }}>
            Your trusted platform for real estate &amp; quality used items across the United States.
          </p>
          <p style={{ color: 'var(--color-light)', opacity: 0.7, fontSize: '12px', margin: '4px 0 0 0' }}>
            &copy; {new Date().getFullYear()} Axiom Realty LLC
          </p>
        </div>

        {/* CỤM ICON — góc phải */}
        <div className="footer-social-icons">
          <a href="https://www.facebook.com/share/1AbdHWCaqN/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
            <i className="fab fa-facebook"></i>
          </a>
          <a href={COMPANY_WHATSAPP} target="_blank" rel="noopener noreferrer" className="footer-social-icon">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://www.tiktok.com/@mceagle.mentor" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://youtube.com/@mceagle.essentials" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
            <i className="fab fa-youtube"></i>
          </a>
          <a href={COMPANY_HOTLINE_TEL} className="footer-social-icon">
            <i className="fas fa-phone"></i>
          </a>
        </div>

      </div>
    </footer>
  );
}
