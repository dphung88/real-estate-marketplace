'use client';
import Link from 'next/link';
import Image from 'next/image';
import { LOGO } from '../../lib/theme';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        </ul>
      </div>
    </nav>
  );
}
