import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Contact Us - Axiom Realty',
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
                  <input type="tel" id="phone" name="phone" placeholder="+1 (xxx) xxx xxxx" />
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
                  <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-paper-plane"></i> Send Message
                </button>
              </form>
            </div>

            {/* CONTACT INFO */}
            <div className="contact-info-box">
              <h2>Our Contact Information</h2>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <strong>Address</strong>
                  <p>Chicago, Illinois<br />United States</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <strong>Hotline</strong>
                  <p><a href="tel:+13129997988">+1 (312) 999 7988</a></p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:info@axiomrealty.com">info@axiomrealty.com</a></p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <strong>Working Hours</strong>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM CT<br />Saturday: 9:00 AM - 4:00 PM CT</p>
                </div>
              </div>

              <div className="contact-social">
                <a href="https://www.facebook.com/share/1AbdHWCaqN/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fa-brands fa-facebook"></i> Facebook
                </a>
                <a href="https://wa.me/13129997988" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp
                </a>
                <a href="https://www.tiktok.com/@mceagle.mentor" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fa-brands fa-tiktok"></i> TikTok
                </a>
                <a href="https://youtube.com/@mceagle.essentials" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fa-brands fa-youtube"></i> YouTube
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
