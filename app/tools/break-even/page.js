'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AxiomBreakEven from '../../components/tools/AxiomBreakEven';
import ProFinancialDashboard from '../../components/tools/ProFinancialDashboard';
import { Calculator, FileText, BarChart2 } from 'lucide-react';

export default function BreakEvenPage() {
  const [activeTab, setActiveTab] = useState('pro');

  return (
    <main className="min-h-screen" style={{ background: 'var(--color-light)' }}>
      <Navbar />
      
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1454165833767-027ffea9e7a7?q=80&w=2070&auto=format&fit=crop" 
            alt="Financial Analysis" 
          />
        </div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content container">
          <h1>
            <Calculator size={42} style={{ color: 'var(--color-accent)', marginRight: '15px', verticalAlign: 'middle', display: 'inline-block' }} />
            Financial Analysis Hub
          </h1>
          <p>
            Professional-grade break-even analysis and performance tracking tools 
            designed for strategic business optimization.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="mb-8 text-center">
              <span className="badge badge-used" style={{ padding: '8px 20px', fontSize: '0.9rem', marginBottom: '15px', display: 'inline-block' }}>Business Intelligence</span>
              
              {/* Tab Navigation */}
              <div className="flex justify-center gap-4 mt-6 mb-10">
                <button 
                  onClick={() => setActiveTab('pro')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                    activeTab === 'pro' 
                      ? 'bg-[var(--color-accent)] text-[var(--color-dark)] shadow-lg' 
                      : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <FileText size={18} /> Pro Financial Appendix
                </button>
                <button 
                  onClick={() => setActiveTab('breakeven')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                    activeTab === 'breakeven' 
                      ? 'bg-[var(--color-accent)] text-[var(--color-dark)] shadow-lg' 
                      : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <BarChart2 size={18} /> Break-Even & Performance
                </button>
              </div>

              {activeTab === 'breakeven' ? (
                <div>
                  <h2 className="section-title">Break-Even Analysis</h2>
                  <p style={{ color: 'var(--color-dark)', opacity: '0.7', maxWidth: '700px', margin: '0 auto', marginBottom: '40px' }}>
                    Analyze your core financial metrics, monitor operational efficiency, 
                    and determine your exact break-even point.
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="section-title">Comprehensive Financial Appendix</h2>
                  <p style={{ color: 'var(--color-dark)', opacity: '0.7', maxWidth: '700px', margin: '0 auto', marginBottom: '40px' }}>
                    A professional-grade financial modeling tool complete with Income Statement, Balance Sheet, Cash Flow and Personal Net Worth tracking.
                  </p>
                </div>
              )}
            </div>

            {activeTab === 'breakeven' ? <AxiomBreakEven /> : <ProFinancialDashboard />}

            <div className="why-card mt-12" style={{ textAlign: 'left', padding: '40px' }}>
              <h4 style={{ color: 'var(--color-accent)', marginBottom: '20px', fontSize: '1.25rem' }}>Strategic Definitions:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ul className="facts-list" style={{ color: 'var(--color-light)' }}>
                  <li style={{ marginBottom: '15px' }}><strong style={{ color: '#B5945B' }}>Fixed Costs:</strong> Monthly recurring expenses independent of sales volume (Rent, Salaries, Insurance).</li>
                  <li style={{ marginBottom: '15px' }}><strong style={{ color: '#B5945B' }}>Variable Costs (COGS):</strong> Direct costs that fluctuate with production or sales (Material, Commission, Shipping).</li>
                </ul>
                <ul className="facts-list" style={{ color: 'var(--color-light)' }}>
                  <li style={{ marginBottom: '15px' }}><strong style={{ color: '#B5945B' }}>CLV (Customer Lifetime Value):</strong> Predicted total revenue a business can expect from a single customer account.</li>
                  <li style={{ marginBottom: '15px' }}><strong style={{ color: '#B5945B' }}>CAC (Customer Acquisition Cost):</strong> The total cost of winning a customer to purchase a product or service.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
