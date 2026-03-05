'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navClass = (path) =>
    pathname === path ? 'nav-links-a active' : 'nav-links-a';

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="logo">
          <Image
            src="/AXIOM LLC Logo White.png"
            alt="Axiom Realty"
            width={140}
            height={50}
            style={{ objectFit: 'contain' }}
          />
        </Link>
        <ul className="nav-links">
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
