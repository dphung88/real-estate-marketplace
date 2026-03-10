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
              <div className="flex justify-center gap-4 mt-6 mb-12">
                <button 
                  onClick={() => setActiveTab('pro')}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-[14px] font-bold transition-all duration-300 ${
                    activeTab === 'pro' 
                      ? 'bg-[#1B1C36] text-[var(--color-accent)] shadow-xl' 
                      : 'bg-transparent text-[var(--color-dark)] opacity-70 hover:bg-white hover:opacity-100 border border-[var(--color-dark)]/10'
                  }`}
                >
                  <FileText size={18} /> Pro Financial
                </button>
                <button 
                  onClick={() => setActiveTab('breakeven')}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-[14px] font-bold transition-all duration-300 ${
                    activeTab === 'breakeven' 
                      ? 'bg-[#1B1C36] text-[var(--color-accent)] shadow-xl' 
                      : 'bg-transparent text-[var(--color-dark)] opacity-70 hover:bg-white hover:opacity-100 border border-[var(--color-dark)]/10'
                  }`}
                >
                  <BarChart2 size={18} /> Break-Even & Performance
                </button>
              </div>

              {activeTab === 'breakeven' ? (
                <div className="mb-14">
                  <h2 className="text-[var(--color-dark)] text-4xl md:text-5xl font-black tracking-tight mb-4">Break-Even Analysis</h2>
                  <p style={{ color: 'var(--color-dark)', opacity: '0.7', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                    Analyze your core financial metrics, monitor operational efficiency, 
                    and determine your exact break-even point.
                  </p>
                </div>
              ) : (
                <div className="mb-14">
                  <h2 className="text-[var(--color-dark)] text-4xl md:text-5xl font-black tracking-tight mb-4">Comprehensive Financial</h2>
                  <p style={{ color: 'var(--color-dark)', opacity: '0.7', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                    A professional-grade financial modeling tool complete with Income Statement, Balance Sheet, Cash Flow and Personal Net Worth tracking.
                  </p>
                </div>
              )}
            </div>

            {activeTab === 'breakeven' ? <AxiomBreakEven /> : <ProFinancialDashboard />}

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
