import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Prime Listings. All rights reserved.</p>
      <p>
        <Link href="/contact">Contact Us</Link>
        {' | '}
        <a href="#">Privacy Policy</a>
      </p>
    </footer>
  );
}
