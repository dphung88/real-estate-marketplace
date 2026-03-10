'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FinancialDashboard from '../components/tools/FinancialDashboard';
import FinanceDashboard from '../components/tools/FinanceDashboard';
import { FileSpreadsheet, ChevronRight, LayoutDashboard, PieChart, TrendingUp, Wallet, Activity } from 'lucide-react';

export default function FinancialPlanningPage() {
  const [activeTab, setActiveTab] = useState('operational');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <Navbar />
      
      <main className="container" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10 animate-in slide-in-from-top duration-700">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-2">
              <span>Admin Tools</span>
              <ChevronRight size={14} />
              <span className="text-slate-400">Finance Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Axiom <span className="text-blue-600 italic">Finance Hub</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Professional financial analysis, forecasting, and operational optimization system.</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-3xl shadow-sm border border-slate-100 mb-8 w-fit">
            {[
              { id: 'operational', label: 'Operations (KPI)', icon: <Activity size={18} /> },
              { id: 'dashboard', label: '5-Year Strategy', icon: <LayoutDashboard size={18} /> },
              { id: 'income', label: 'Business Results', icon: <TrendingUp size={18} /> },
              { id: 'balance', label: 'Balance Sheet', icon: <PieChart size={18} /> },
              { id: 'cashflow', label: 'Cash Flow', icon: <Wallet size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {activeTab === 'operational' ? (
              <FinanceDashboard />
            ) : (
              <FinancialDashboard activeTab={activeTab} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
