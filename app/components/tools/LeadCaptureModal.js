'use client';

import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle, X } from 'lucide-react';

const LeadCaptureModal = ({ onAccept, forceShow, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (forceShow) {
      setIsOpen(true);
      return;
    }
    
    if (typeof window !== 'undefined') {
      // Check if user has already submitted phone
      const isAccepted = localStorage.getItem('axiom_tool_access');
      if (!isAccepted) {
        setIsOpen(true);
      }
    }
  }, [forceShow]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    if (typeof window !== 'undefined') {
      // Save to localStorage
      localStorage.setItem('axiom_tool_access', 'true');
      localStorage.setItem('user_phone', phone);
    }
    
    setIsOpen(false);
    if (onAccept) onAccept();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(27, 28, 54, 0.95)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: '20px',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="animate-in zoom-in duration-300" style={{
        background: '#FFFFFF',
        width: '100%', maxWidth: '450px',
        borderRadius: '30px', padding: '40px 30px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center', position: 'relative',
        border: '2px solid #B5945B'
      }}>
        {onClose && (
          <button 
            onClick={onClose}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'none', border: 'none', cursor: 'pointer', color: '#999'
            }}
          >
            <X size={24} />
          </button>
        )}
        <div style={{ 
          width: '70px', height: '70px', background: 'rgba(181, 148, 91, 0.1)', 
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <CheckCircle size={35} color="#B5945B" />
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B1C36', marginBottom: '12px' }}>
          Happy to have you here!
        </h2>
        <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.6', marginBottom: '32px' }}>
          Welcome to our professional financial toolkit. Please provide your phone number to gain full access to the strategic analysis dashboard.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#B5945B' }}>
              <Phone size={18} />
            </div>
            <input 
              type="tel"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/[^\d+]/g, ''));
                setError('');
              }}
              style={{
                width: '100%', padding: '16px 16px 16px 48px',
                borderRadius: '16px', border: '2px solid rgba(27, 28, 54, 0.1)',
                fontSize: '1rem', fontWeight: '700', outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#B5945B'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(27, 28, 54, 0.1)'}
            />
          </div>
          
          {error && <p style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: '600', margin: 0 }}>{error}</p>}

          <button 
            type="submit"
            style={{
              padding: '16px', background: '#1B1C36', color: '#B5945B',
              borderRadius: '16px', border: 'none', fontSize: '1rem', fontWeight: '800',
              cursor: 'pointer', transition: 'all 0.3s ease', marginTop: '8px',
              textTransform: 'uppercase', letterSpacing: '1px'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Accept and Start Using
          </button>
        </form>

        <p style={{ marginTop: '24px', fontSize: '0.75rem', color: '#999' }}>
          By clicking Accept, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
