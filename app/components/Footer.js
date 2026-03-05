import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4><i className="fa-solid fa-house"></i> Prime Listings</h4>
              <p>Your trusted platform for real estate and quality used items across the United States.</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/real-estate">Real Estate</Link></li>
                <li><Link href="/used-items">Used Items</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <p><i className="fa-solid fa-phone"></i> <a href="tel:+13129997988">+1 (312) 999 7988</a></p>
              <p><i className="fa-solid fa-envelope"></i> info@primelistings.com</p>
              <p><i className="fa-solid fa-location-dot"></i> Chicago, Illinois, USA</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Prime Listings. All rights reserved.</p>
        <p>
          <Link href="/contact">Contact Us</Link>
          {' | '}
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}
