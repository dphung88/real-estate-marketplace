'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AxiomBreakEven from '../../components/tools/AxiomBreakEven';
import ProFinancialDashboard from '../../components/tools/ProFinancialDashboard';
import BreakEvenCalculator from '../../components/tools/BreakEvenCalculator';
import LeadCaptureModal from '../../components/tools/LeadCaptureModal';
import { Calculator, FileText, BarChart2, Zap } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';

export default function BreakEvenPage() {
  const [activeTab, setActiveTab] = useState('pro');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authorized = localStorage.getItem('axiom_tool_access') === 'true';
      setIsAuthorized(authorized);
    }
  }, []);

  return (
    <main className="min-h-screen" style={{ background: 'var(--color-light)' }}>
      <Navbar />
      
      {/* Slim Hero Header (Same as Contact Page) */}
      <section className="page-header">
        <div className="container">
          <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <Calculator size={38} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
            <span>Financial Tools</span>
          </h1>
          <p>Professional-grade break-even analysis and strategic performance tracking.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ fontFamily: "Aptos, 'Segoe UI', 'Helvetica Neue', sans-serif" }}>
        <div className="container">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="text-center">
              <span className="badge badge-used" style={{ padding: '8px 20px', fontSize: '0.9rem', marginBottom: '15px', display: 'inline-block' }}>Business Intelligence</span>
              
              {/* Tab Navigation */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '24px', marginBottom: '40px' }}>
                <button 
                  onClick={() => setActiveTab('pro')}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', 
                    padding: '14px 28px', borderRadius: '14px',
                    fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', 
                    transition: 'all 0.3s ease',
                    background: activeTab === 'pro' ? '#1B1C36' : '#FFFFFF',
                    color: activeTab === 'pro' ? '#B5945B' : '#666666',
                    border: activeTab === 'pro' ? '1.5px solid #1B1C36' : '1.5px solid rgba(0,0,0,0.05)',
                    boxShadow: activeTab === 'pro' ? '0 4px 14px rgba(27, 28, 54, 0.25)' : '0 2px 8px rgba(0,0,0,0.02)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <FileText size={18} /> Pro Financial
                </button>
                <button 
                  onClick={() => setActiveTab('breakeven')}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', 
                    padding: '14px 28px', borderRadius: '14px',
                    fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', 
                    transition: 'all 0.3s ease',
                    background: activeTab === 'breakeven' ? '#1B1C36' : '#FFFFFF',
                    color: activeTab === 'breakeven' ? '#B5945B' : '#666666',
                    border: activeTab === 'breakeven' ? '1.5px solid #1B1C36' : '1.5px solid rgba(0,0,0,0.05)',
                    boxShadow: activeTab === 'breakeven' ? '0 4px 14px rgba(27, 28, 54, 0.25)' : '0 2px 8px rgba(0,0,0,0.02)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <BarChart2 size={18} /> Strategic Break-Even
                </button>
                <button 
                  onClick={() => setActiveTab('quick')}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', 
                    padding: '14px 28px', borderRadius: '14px',
                    fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', 
                    transition: 'all 0.3s ease',
                    background: activeTab === 'quick' ? '#1B1C36' : '#FFFFFF',
                    color: activeTab === 'quick' ? '#B5945B' : '#666666',
                    border: activeTab === 'quick' ? '1.5px solid #1B1C36' : '1.5px solid rgba(0,0,0,0.05)',
                    boxShadow: activeTab === 'quick' ? '0 4px 14px rgba(27, 28, 54, 0.25)' : '0 2px 8px rgba(0,0,0,0.02)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Zap size={18} /> Quick Calculator
                </button>
              </div>

              {activeTab === 'breakeven' ? (
                <div style={{ marginBottom: '48px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h2 className="text-[var(--color-dark)] text-4xl md:text-5xl font-black tracking-tight mb-4 text-center w-full">Strategic Break-Even</h2>
                  <p className="text-center" style={{ color: 'var(--color-dark)', opacity: '0.7', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                    Advanced 5-year forecasting and detailed operational analysis for complex business models.
                  </p>
                </div>
              ) : activeTab === 'quick' ? (
                <div style={{ marginBottom: '48px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h2 className="text-[var(--color-dark)] text-4xl md:text-5xl font-black tracking-tight mb-4 text-center w-full">Quick Break-Even</h2>
                  <p className="text-center" style={{ color: 'var(--color-dark)', opacity: '0.7', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                    Rapid calculation for specific products or service lines to determine profitability thresholds instantly.
                  </p>
                </div>
              ) : (
                <div style={{ marginBottom: '48px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h2 className="text-[var(--color-dark)] text-4xl md:text-5xl font-black tracking-tight mb-4 text-center w-full">Comprehensive Financial</h2>
                  <p className="text-center" style={{ color: 'var(--color-dark)', opacity: '0.7', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                    A professional-grade financial modeling tool complete with Income Statement, Balance Sheet, and Personal Net Worth.
                  </p>
                </div>
              )}
            </div>

            {isAuthorized ? (
              activeTab === 'breakeven' ? <AxiomBreakEven /> : activeTab === 'quick' ? <BreakEvenCalculator /> : <ProFinancialDashboard />
            ) : (
              <div style={{ 
                padding: '100px 20px', textAlign: 'center', background: '#FFFFFF', 
                borderRadius: '24px', border: '1px dashed #B5945B', marginBottom: '40px'
              }}>
                <h3 style={{ color: '#1B1C36', fontWeight: '800', fontSize: '1.5rem' }}>Access Restricted</h3>
                <p style={{ color: '#666' }}>Please complete the verification to view the analysis.</p>
                <button 
                  onClick={() => window.location.reload()}
                  style={{ 
                    marginTop: '20px', padding: '12px 24px', background: '#1B1C36', 
                    color: '#B5945B', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer' 
                  }}
                >
                  Verify Now
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
      <LeadCaptureModal onAccept={() => setIsAuthorized(true)} />
    </main>
  );
}
