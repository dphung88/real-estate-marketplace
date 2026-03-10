import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_HOTLINE, COMPANY_HOTLINE_TEL } from '../../lib/constants';

export const metadata = {
  title: 'Go-Live Service | Axiom Realty',
  description: 'Fast-track your property or item listing to go live on our marketplace.',
};

export default function GoLivePage() {
  const steps = [
    {
      title: 'Submit Details',
      description: 'Fill out our simple form with your property or item information and upload high-quality photos.',
      icon: 'fa-file-lines',
    },
    {
      title: 'Professional Review',
      description: 'Our team reviews your listing to ensure it meets our quality standards and verify ownership.',
      icon: 'fa-user-check',
    },
    {
      title: 'Instant Go-Live',
      description: 'Once approved, your listing goes live instantly, reaching thousands of potential buyers or renters.',
      icon: 'fa-rocket',
    },
  ];

  const packages = [
    {
      name: 'Standard',
      price: 'Free',
      features: ['Basic Listing', 'Up to 5 Photos', 'Standard Search Result', 'Valid for 30 Days'],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$29',
      features: ['Featured Placement', 'Up to 20 Photos', 'Priority Support', 'Valid for 90 Days', 'Social Media Promotion'],
      buttonText: 'Go Premium',
      popular: true,
    },
    {
      name: 'Professional',
      price: '$99',
      features: ['Top of Search Result', 'Professional Photography', 'Virtual Tour Support', 'Unlimited Duration', 'Dedicated Account Manager'],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <>
      <Navbar />
      
      <main className="go-live-page">
        {/* Hero Section */}
        <section className="hero-simple section">
          <div className="container text-center">
            <h1 className="section-title">Go Live with Axiom Realty</h1>
            <p className="section-subtitle">
              Ready to sell or rent? Get your listing in front of the right audience today.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="process section bg-light">
          <div className="container">
            <h2 className="section-title text-center">How It Works</h2>
            <div className="process-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem',
              marginTop: '3rem'
            }}>
              {steps.map((step, index) => (
                <div key={index} className="process-card text-center" style={{ 
                  padding: '2rem', 
                  backgroundColor: '#fff', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}>
                  <div className="icon-wrapper" style={{ 
                    fontSize: '2.5rem', 
                    color: 'var(--color-accent)', 
                    marginBottom: '1.5rem' 
                  }}>
                    <i className={`fa-solid ${step.icon}`}></i>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing/Packages */}
        <section className="pricing section">
          <div className="container">
            <h2 className="section-title text-center">Choose Your Package</h2>
            <div className="pricing-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem',
              marginTop: '3rem'
            }}>
              {packages.map((pkg, index) => (
                <div key={index} className={`pricing-card ${pkg.popular ? 'popular' : ''}`} style={{ 
                  padding: '2.5rem', 
                  backgroundColor: '#fff', 
                  borderRadius: '16px',
                  boxShadow: pkg.popular ? '0 10px 30px rgba(0,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.05)',
                  border: pkg.popular ? '2px solid var(--color-accent)' : '1px solid #eee',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {pkg.popular && (
                    <span style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-dark)',
                      padding: '4px 15px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>Most Popular</span>
                  )}
                  <h3 style={{ marginBottom: '1rem' }}>{pkg.name}</h3>
                  <div className="price" style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1.5rem',
                    color: 'var(--color-accent)'
                  }}>{pkg.price}</div>
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    marginBottom: '2rem',
                    flexGrow: 1
                  }}>
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                        <i className="fa-solid fa-check" style={{ color: '#10b981', marginRight: '10px' }}></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/contact"
                    className={`btn ${pkg.popular ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ textAlign: 'center' }}
                  >
                    {pkg.buttonText}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="contact-info section bg-light" style={{ padding: '4rem 0' }}>
          <div className="container text-center">
            <h2 className="section-title">Visit Our Office</h2>
            <p className="section-subtitle">
              AXIOM REALTY - REAL ESTATE & USED ITEMS<br />
              65 Đ. Số 2, Hiệp Bình Phước, Thủ Đức, Hồ Chí Minh, Vietnam
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta section bg-dark text-light" style={{ backgroundColor: '#111827', color: 'white', padding: '5rem 0' }}>
          <div className="container text-center">
            <h2 className="section-title" style={{ color: 'white' }}>Need Help Getting Started?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9 }}>
              Our support team is available 24/7 to help you with your listing.
            </p>
            <div className="cta-buttons" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={COMPANY_HOTLINE_TEL} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-phone"></i>
                Call {COMPANY_HOTLINE}
              </a>
              <Link href="/contact" className="btn btn-outline-light" style={{ border: '1px solid white', color: 'white' }}>
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
