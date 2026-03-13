'use client';
import Link from 'next/link';
import Image from 'next/image';
import { LOGO } from '../../lib/theme';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import LeadCaptureModal from './tools/LeadCaptureModal';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navClass = (path) =>
    pathname === path ? 'nav-links-a active' : 'nav-links-a';

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={LOGO.dark}
            alt="Axiom Realty"
            width={45}
            height={45}
            style={{ objectFit: 'contain', width: '45px', height: '45px' }}
          />
        </Link>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <Link href="/" className={navClass('/')}>Home</Link>
          </li>
          <li>
            <Link href="/real-estate" className={navClass('/real-estate')}>Real Estate</Link>
          </li>
          <li>
            <Link href="/used-items" className={navClass('/used-items')}>Used Items</Link>
          </li>
          <li>
            <Link href="/contact" className={navClass('/contact')}>Contact</Link>
          </li>
          <li>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const isAccepted = localStorage.getItem('axiom_tool_access') === 'true';
                  if (isAccepted) {
                    router.push('/tools/break-even');
                  } else {
                    setShowModal(true);
                  }
                }
              }}
              className={navClass('/tools/break-even')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
            >
              Financial Tools
            </button>
          </li>
        </ul>
      </div>
      
      {showModal && (
        <LeadCaptureModal onAccept={() => {
          setShowModal(false);
          router.push('/tools/break-even');
        }} forceShow={true} onClose={() => setShowModal(false)} />
      )}
      {/* Overlay for closing menu */}
      {isMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
        ></div>
      )}
    </nav>
  );
}
