'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, ReferenceLine, AreaChart, Area, BarChart, Bar
} from 'recharts';
import { 
  Calculator, TrendingUp, DollarSign, Users, Info, ChevronDown, ChevronUp, Calendar, 
  Table as TableIcon, Activity, Package, Building, Tag, Target, ArrowRight
} from 'lucide-react';

const AxiomBreakEven = () => {
  // --- DETAILED STATE BASED ON PRO FINANCIAL INCOME STATEMENT ---
  
  // 1. Sales Activities
  const [salesData, setSalesData] = useState({
    'French doors': 571900,
    'Panel doors': 275400,
    'Windows': 74100,
    'New door model': 0
  });

  // 2. Cost of Sales (Direct Costs)
  const [cogsData, setCogsData] = useState({
    'Opening Inventory': 173700,
    'Material Purchases': 491900,
    'Freight & Duty': 18600,
    'Other Materials': 0,
    'Closing Inventory': -147500,
    'Direct Labour Wages': 80800,
    'Repairs & Maint.': 4800,
    'Services / Utilities': 6400,
    'Depreciation (COGS)': 20200,
    'Overhead': 18400,
    'Other COGS': 12000
  });

  // 3. Sales Expenses
  const [salesExpData, setSalesExpData] = useState({
    'Selling Salaries': 38200,
    'Traveling': 0,
    'Advertising': 9800,
    'Shipping & Delivery': 27400,
    'Depreciation (Sales)': 0,
    'Other Sales Exp.': 8000
  });

  // 4. Operating Expenses (Admin)
  const [adminExpData, setAdminExpData] = useState({
    'Management Salaries': 32000,
    'Office Salaries': 34400,
    'Professional Fees': 9900,
    'Telecommunication': 7000,
    'Office Expenses': 12600,
    'Insurance & Taxes': 0,
    'Bank Charges': 14300,
    'Interest on L.T.D.': 29500,
    'Bad Debts': 8700,
    'Research & Dev.': 0
  });

  // Growth Assumptions for 5-Year Plan
  const [growthAssumptions, setGrowthAssumptions] = useState({
    revenueGrowth: 12, // %
    cogsGrowth: 10,    // %
    expenseInflation: 5 // %
  });

  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('forecast');
  
  // What-if Scenario adjustments
  const [priceAdjustment, setPriceAdjustment] = useState(0); // % change
  const [costAdjustment, setCostAdjustment] = useState(0); // % change

  // --- DERIVED CALCULATIONS ---
  const rawSales = Object.values(salesData).reduce((a, b) => a + b, 0);
  const totalSales = rawSales * (1 + priceAdjustment / 100);
  
  const rawCogs = Object.values(cogsData).reduce((a, b) => a + b, 0);
  const totalCogs = rawCogs * (1 + costAdjustment / 100);
  
  const totalSalesExp = Object.values(salesExpData).reduce((a, b) => a + b, 0);
  const totalAdminExp = Object.values(adminExpData).reduce((a, b) => a + b, 0);
  const totalExpenses = totalSalesExp + totalAdminExp;
  
  const grossProfit = totalSales - totalCogs;
  const netProfit = grossProfit - totalExpenses;
  
  // Margin of Safety
  const marginOfSafety = totalSales > 0 ? ((totalSales - (totalExpenses / (grossProfit / totalSales))) / totalSales) * 100 : 0;
  
  // For Break-even: Assume weighted average
  const breakEvenRevenue = (grossProfit > 0) ? (totalExpenses / (grossProfit / totalSales)) : 0;

  // --- 5-YEAR PROJECTION LOGIC ---
  const [forecast, setForecast] = useState([]);
  
  useEffect(() => {
    const years = ['2026', '2027', '2028', '2029', '2030', '2031'];
    const projection = years.map((year, i) => {
      const revGrowthFactor = Math.pow(1 + (growthAssumptions.revenueGrowth / 100), i);
      const cogsGrowthFactor = Math.pow(1 + (growthAssumptions.cogsGrowth / 100), i);
      const expGrowthFactor = Math.pow(1 + (growthAssumptions.expenseInflation / 100), i);
      
      const rev = totalSales * revGrowthFactor;
      const cost = totalCogs * cogsGrowthFactor;
      const exp = totalExpenses * expGrowthFactor;
      const gp = rev - cost;
      const np = gp - exp;
      return { year, revenue: rev, grossProfit: gp, netProfit: np, expenses: exp };
    });
    setForecast(projection);
  }, [salesData, cogsData, salesExpData, adminExpData, growthAssumptions, priceAdjustment, costAdjustment]);

  const formatUSD = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  return (
    <div className="axiom-finance-hub" style={{ fontFamily: "Aptos, 'Segoe UI', 'Helvetica Neue', sans-serif" }}>
      
      {/* 1. COMPREHENSIVE INPUT PANEL (4 COLUMNS) */}
      <div className="contact-form-box mb-8" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(181, 148, 91, 0.3)' }}>
        <button 
          onClick={() => setIsInputExpanded(!isInputExpanded)}
          style={{ width: '100%', padding: '14px 28px', background: '#1B1C36', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calculator size={18} color="#B5945B" />
            <span style={{ color: '#E8E4D8', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Strategic Operational Input</span>
          </div>
          {isInputExpanded ? <ChevronUp color="#B5945B" size={20} /> : <ChevronDown color="#B5945B" size={20} />}
        </button>

        {isInputExpanded && (
          <div style={{ padding: '30px', background: '#FFF' }} className="animate-in slide-in-from-top duration-300">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              
              {/* Col 1: Sales Activities */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p className="input-header">Sales Activities</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }} className="custom-scrollbar">
                  {Object.entries(salesData).map(([key, value]) => (
                    <QuickInput key={key} label={key} value={value} onChange={(v) => setSalesData(prev => ({...prev, [key]: v}))} />
                  ))}
                </div>
              </div>

              {/* Col 2: Cost of Sales */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p className="input-header">Cost of Sales (Direct)</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }} className="custom-scrollbar">
                  {Object.entries(cogsData).map(([key, value]) => (
                    <QuickInput key={key} label={key} value={value} onChange={(v) => setCogsData(prev => ({...prev, [key]: v}))} />
                  ))}
                </div>
              </div>

              {/* Col 3: Sales Expenses */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p className="input-header">Sales Expenses</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }} className="custom-scrollbar">
                  {Object.entries(salesExpData).map(([key, value]) => (
                    <QuickInput key={key} label={key} value={value} onChange={(v) => setSalesExpData(prev => ({...prev, [key]: v}))} />
                  ))}
                </div>
              </div>

              {/* Col 4: Operating Expenses */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p className="input-header">Operating Expenses</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }} className="custom-scrollbar">
                  {Object.entries(adminExpData).map(([key, value]) => (
                    <QuickInput key={key} label={key} value={value} onChange={(v) => setAdminExpData(prev => ({...prev, [key]: v}))} />
                  ))}
                </div>
              </div>

            </div>

            {/* Growth Assumptions Row */}
            <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid rgba(181, 148, 91, 0.2)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
               <div style={{ flex: 1 }}>
                  <p className="input-header" style={{ marginBottom: '15px' }}>Growth Assumptions</p>
                  <div className="flex flex-wrap gap-6">
                    <div style={{ minWidth: '180px' }}>
                      <QuickInput label="Rev Growth %" value={growthAssumptions.revenueGrowth} onChange={(v) => setGrowthAssumptions(prev => ({...prev, revenueGrowth: v}))} isPercent />
                    </div>
                    <div style={{ minWidth: '180px' }}>
                      <QuickInput label="COGS Growth %" value={growthAssumptions.cogsGrowth} onChange={(v) => setGrowthAssumptions(prev => ({...prev, cogsGrowth: v}))} isPercent />
                    </div>
                    <div style={{ minWidth: '180px' }}>
                      <QuickInput label="OpEx Inflation %" value={growthAssumptions.expenseInflation} onChange={(v) => setGrowthAssumptions(prev => ({...prev, expenseInflation: v}))} isPercent />
                    </div>
                  </div>
               </div>
            </div>

            <style jsx>{`
              .input-header { font-size: 0.85rem; font-weight: 900; color: #B5945B; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; padding-left: 8px; border-left: 3px solid #B5945B; line-height: 1.2; display: flex; align-items: center; min-height: 1.2rem; }
              .custom-scrollbar::-webkit-scrollbar { width: 4px; }
              .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
              .custom-scrollbar::-webkit-scrollbar-thumb { background: #B5945B; border-radius: 10px; }
            `}</style>
          </div>
        )}
      </div>

      {/* 2. NAVIGATION TABS */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '32px', marginBottom: '32px' }}>
        <TabButton active={activeTab === 'forecast'} onClick={() => setActiveTab('forecast')} label="Strategic Forecast" icon={<Calendar size={16} />} />
        <TabButton active={activeTab === 'performance'} onClick={() => setActiveTab('performance')} label="Performance Analysis" icon={<Activity size={16} />} />
        <TabButton active={activeTab === 'whatif'} onClick={() => setActiveTab('whatif')} label="What-If Analysis" icon={<Calculator size={16} />} />
      </div>

      {/* 3. DASHBOARD CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Stats Column */}
        <div className="lg:col-span-4 space-y-6">
          <CompactMetric label="Adjusted Revenue" value={formatUSD(totalSales)} icon={<TrendingUp size={20} color="#B5945B" />} />
          <CompactMetric label="Gross Profit" value={formatUSD(grossProfit)} icon={<DollarSign size={20} color="#B5945B" />} />
          <CompactMetric label="Net Income" value={formatUSD(netProfit)} icon={<Users size={20} color="#B5945B" />} />
          
          {activeTab === 'whatif' && (
            <div className="contact-form-box animate-in fade-in duration-500" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', marginBottom: '20px' }}>What-If Controls</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label style={{ fontSize: '0.85rem', fontWeight: '700' }}>Price Change: {priceAdjustment}%</label>
                  </div>
                  <input 
                    type="range" min="-20" max="20" step="1" value={priceAdjustment} 
                    onChange={(e) => setPriceAdjustment(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#B5945B' }}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label style={{ fontSize: '0.85rem', fontWeight: '700' }}>COGS Change: {costAdjustment}%</label>
                  </div>
                  <input 
                    type="range" min="-20" max="20" step="1" value={costAdjustment} 
                    onChange={(e) => setCostAdjustment(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#1B1C36' }}
                  />
                </div>
                <button 
                  onClick={() => { setPriceAdjustment(0); setCostAdjustment(0); }}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', background: '#f5f5f5', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseOver={(e) => e.target.style.background = '#eee'}
                  onMouseOut={(e) => e.target.style.background = '#f5f5f5'}
                >
                  Reset Scenario
                </button>
              </div>
            </div>
          )}

          <div className="contact-info-box" style={{ padding: '24px 32px', background: '#1B1C36', color: '#E8E4D8', borderRadius: '16px' }}>
            <h4 style={{ color: '#B5945B', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', margin: 0, marginBottom: '12px' }}>
              EXECUTIVE FINANCIAL INSIGHT
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#E8E4D8', margin: 0 }}>
              Current Gross Margin is <strong>{totalSales > 0 ? ((grossProfit/totalSales)*100).toFixed(1) : 0}%</strong>. 
              {netProfit > 0 ? " Your operations are profitable. " : " You are currently operating at a loss. "}
              Strategic target should be reducing COGS and OpEx to maximize net yield.
            </p>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'performance' && (
             <div className="contact-form-box animate-in fade-in duration-500" style={{ padding: '30px', overflowX: 'auto' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', color: '#1B1C36' }}>
                  Detailed 5-Year Financial Outlook
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #B5945B', textAlign: 'left' }}>
                      <th style={{ padding: '12px 10px' }}>Year</th>
                      <th style={{ padding: '12px 10px' }}>Revenue</th>
                      <th style={{ padding: '12px 10px' }}>Gross Profit</th>
                      <th style={{ padding: '12px 10px' }}>Expenses</th>
                      <th style={{ padding: '12px 10px' }}>Net Profit</th>
                      <th style={{ padding: '12px 10px' }}>Margin %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forecast.map((row) => (
                      <tr key={row.year} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <td style={{ padding: '12px 10px', fontWeight: '800', color: '#1B1C36' }}>{row.year}</td>
                        <td style={{ padding: '12px 10px' }}>{formatUSD(row.revenue)}</td>
                        <td style={{ padding: '12px 10px' }}>{formatUSD(row.grossProfit)}</td>
                        <td style={{ padding: '12px 10px' }}>{formatUSD(row.expenses)}</td>
                        <td style={{ padding: '12px 10px', color: row.netProfit >= 0 ? '#10B981' : '#EF4444', fontWeight: '800' }}>
                          {formatUSD(row.netProfit)}
                        </td>
                        <td style={{ padding: '12px 10px' }}>{row.revenue > 0 ? ((row.netProfit/row.revenue)*100).toFixed(1) : 0}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          )}

          <div className="contact-form-box animate-in fade-in duration-500" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', color: '#1B1C36' }}>
              {activeTab === 'forecast' ? '5-Year Revenue & Profit Projection' : 'Revenue vs. Total Costs Analysis'}
            </h3>
            <div style={{ height: '380px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === 'forecast' ? (
                  <AreaChart data={forecast}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B5945B" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#B5945B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" fontSize={10} fontWeight="800" />
                    <YAxis tickFormatter={(v) => `$${v/1000}k`} fontSize={10} fontWeight="800" />
                    <Tooltip formatter={(v) => formatUSD(v)} contentStyle={{ borderRadius: '12px', border: 'none', background: '#1B1C36', color: '#E8E4D8', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#B5945B" strokeWidth={3} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="netProfit" name="Net Profit" stroke="#1B1C36" strokeWidth={2} fill="transparent" />
                  </AreaChart>
                ) : (
                  <BarChart data={forecast}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" fontSize={10} fontWeight="800" />
                    <YAxis tickFormatter={(v) => `$${v/1000}k`} fontSize={10} fontWeight="800" />
                    <Tooltip formatter={(v) => formatUSD(v)} contentStyle={{ borderRadius: '12px', border: 'none', background: '#1B1C36', color: '#E8E4D8' }} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#B5945B" name="Revenue" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#1B1C36" name="Expenses" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard label="Gross Margin %" value={`${totalSales > 0 ? ((grossProfit/totalSales)*100).toFixed(1) : 0}%`} />
            <MetricCard label="Margin of Safety" value={`${marginOfSafety.toFixed(1)}%`} />
            <MetricCard label="BEP Revenue" value={formatUSD(breakEvenRevenue)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickInput = ({ label, value, onChange, isPercent }) => {
  const formatInputDisplay = (val) => {
    if (val === 0 || val === '0') return '0';
    if (!val) return '';
    return new Intl.NumberFormat('en-US').format(val);
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '').replace(/[^\d.-]/g, '');
    if (rawValue === '' || rawValue === '-' || !isNaN(rawValue)) {
      onChange(rawValue === '' || rawValue === '-' ? 0 : Number(rawValue));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="flex items-baseline justify-between gap-4">
        <label style={{ fontSize: '0.85rem', fontWeight: '900', color: '#1B1C36', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
          {label}
        </label>
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#B5945B' }}>
          {isPercent ? <span style={{ fontWeight: '900', fontSize: '1rem' }}>%</span> : <DollarSign size={14} />}
        </div>
        <input 
          type="text" 
          value={formatInputDisplay(value)} 
          onChange={handleInputChange}
          style={{ 
            width: '100%', 
            padding: '12px 16px 12px 35px', 
            fontSize: '1rem', 
            fontWeight: '800', 
            background: '#FFFFFF', 
            border: '1.5px solid rgba(27, 28, 54, 0.1)', 
            borderRadius: '12px',
            outline: 'none',
            color: '#1B1C36',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#B5945B';
            e.target.style.boxShadow = '0 4px 12px rgba(181, 148, 91, 0.15)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(27, 28, 54, 0.1)';
            e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
          }}
        />
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    style={{ 
      display: 'flex', alignItems: 'center', gap: '10px', 
      padding: '14px 28px', borderRadius: '14px',
      fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', 
      transition: 'all 0.3s ease',
      background: active ? '#B5945B' : '#FFFFFF',
      color: active ? '#1B1C36' : '#666666',
      border: active ? '1.5px solid #B5945B' : '1.5px solid rgba(0,0,0,0.05)',
      boxShadow: active ? '0 4px 14px rgba(181, 148, 91, 0.25)' : '0 2px 8px rgba(0,0,0,0.02)',
      whiteSpace: 'nowrap'
    }}
  >
    {icon} {label}
  </button>
);

const CompactMetric = ({ label, value, icon }) => (
  <div className="contact-form-box" style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ width: '48px', height: '48px', background: 'rgba(181, 148, 91, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#999', fontWeight: '900', marginBottom: '4px', letterSpacing: '0.5px' }}>{label}</p>
      <h4 style={{ fontSize: '1.6rem', fontWeight: '950', color: '#1B1C36', margin: 0, letterSpacing: '-0.5px' }}>{value}</h4>
    </div>
  </div>
);

const MetricCard = ({ label, value }) => (
  <div className="contact-form-box" style={{ padding: '24px', textAlign: 'center' }}>
    <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#B5945B', fontWeight: '900', marginBottom: '8px', letterSpacing: '1px' }}>{label}</p>
    <h4 style={{ fontSize: '1.7rem', fontWeight: '950', color: '#1B1C36' }}>{value}</h4>
  </div>
);

export default AxiomBreakEven;
