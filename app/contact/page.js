import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Contact Us - Prime Listings',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-envelope"></i> Contact Us</h1>
          <p>Get in touch with our team for inquiries, listings, or support.</p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section">
        <div className="container">
          <div className="contact-wrapper">

            {/* FORM */}
            <div className="contact-form-box">
              <h2>Send Us a Message</h2>
              <form className="contact-form" action="#" method="POST">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="+84 xxx xxx xxx" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject">
                    <option value="">Select a topic</option>
                    <option value="real-estate">Real Estate Inquiry</option>
                    <option value="used-items">Used Item Inquiry</option>
                    <option value="list-property">List My Property</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="Write your message here..." />
                </div>
                <button type="submit" className="btn-submit">Send Message</button>
              </form>
            </div>

            {/* CONTACT INFO */}
            <div className="contact-info-box">
              <h2>Our Contact Information</h2>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <i className="fa-solid fa-location-dot"></i>
                  <div>
                    <strong>Address</strong>
                    <p>123 Nguyen Van Linh, District 7<br />Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="fa-solid fa-phone"></i>
                  <div>
                    <strong>Phone</strong>
                    <p>+84 28 1234 5678</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="fa-solid fa-envelope"></i>
                  <div>
                    <strong>Email</strong>
                    <p>info@primelistings.vn</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="fa-solid fa-clock"></i>
                  <div>
                    <strong>Working Hours</strong>
                    <p>Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-btn" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-btn" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-btn" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-btn" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
