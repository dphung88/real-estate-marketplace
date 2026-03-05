'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar />

      <section className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-envelope"></i> Contact Us</h1>
          <p>Get in touch with our team for inquiries, listings, or support.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-wrapper">

            {/* FORM */}
            <div className="contact-form-box">
              <h2>Send Us a Message</h2>

              {status === 'success' && (
                <div style={{
                  background: '#e8f5e9', border: '1px solid #a5d6a7',
                  borderRadius: '8px', padding: '16px', marginBottom: '20px',
                  color: '#2e7d32', textAlign: 'center'
                }}>
                  <i className="fa-solid fa-circle-check" style={{ marginRight: '8px' }}></i>
                  <strong>Message sent!</strong> We&apos;ll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div style={{
                  background: '#ffebee', border: '1px solid #ef9a9a',
                  borderRadius: '8px', padding: '16px', marginBottom: '20px',
                  color: '#c62828'
                }}>
                  <i className="fa-solid fa-circle-xmark" style={{ marginRight: '8px' }}></i>
                  {errorMsg}
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="Your full name"
                    value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com"
                    value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="+1 (xxx) xxx xxxx"
                    value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
                    <option value="">Select a topic</option>
                    <option value="Real Estate Inquiry">Real Estate Inquiry</option>
                    <option value="Used Item Inquiry">Used Item Inquiry</option>
                    <option value="List My Property">List My Property</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5"
                    placeholder="Write your message here..."
                    value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <><i className="fa-solid fa-spinner fa-spin"></i> Sending...</>
                  ) : (
                    <><i className="fa-solid fa-paper-plane"></i> Send Message</>
                  )}
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
                  <p><a href="mailto:dphung@my.ggu.edu">dphung@my.ggu.edu</a></p>
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
                  <i className="fa-brands fa-facebook"></i>
                  <span>Facebook</span>
                </a>
                <a href="https://wa.me/13129997988" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>WhatsApp</span>
                </a>
                <a href="https://www.tiktok.com/@mceagle.mentor" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fa-brands fa-tiktok"></i>
                  <span>TikTok</span>
                </a>
                <a href="https://youtube.com/@mceagle.essentials" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fa-brands fa-youtube"></i>
                  <span>YouTube</span>
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
