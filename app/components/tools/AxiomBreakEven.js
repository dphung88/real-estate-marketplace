'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, ReferenceLine, AreaChart, Area, BarChart, Bar
} from 'recharts';
import { 
  Calculator, TrendingUp, DollarSign, Users, Info, ChevronDown, ChevronUp, Calendar, 
  Table as TableIcon, Activity
} from 'lucide-react';

const AxiomBreakEven = () => {
  // --- DETAILED STATE BASED ON EXCEL PLAN ---
  // Revenue by Category
  const [salesData, setSalesData] = useState({
    frenchDoors: 571900,
    panelDoors: 275400,
    windows: 74100,
    newProducts: 0
  });

  // Cost of Sales (Direct Costs)
  const [cogsData, setCogsData] = useState({
    materials: 491900,
    directLabour: 80800,
    freightDuty: 18600
  });

  // Operating Expenses (Fixed)
  const [expensesData, setExpensesData] = useState({
    sellingSalaries: 38200,
    advertising: 9800,
    managementSalaries: 32000,
    officeExpenses: 12600,
    interest: 29500
  });

  // Growth Assumptions for 5-Year Plan
  const [growthAssumptions, setGrowthAssumptions] = useState({
    revenueGrowth: 12, // %
    cogsGrowth: 10,    // %
    expenseInflation: 5 // %
  });

  const [maxUnits, setMaxUnits] = useState(1500);
  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('forecast');

  // --- DERIVED CALCULATIONS ---
  const totalSales = Object.values(salesData).reduce((a, b) => a + b, 0);
  const totalCogs = Object.values(cogsData).reduce((a, b) => a + b, 0);
  const totalExpenses = Object.values(expensesData).reduce((a, b) => a + b, 0);
  const grossProfit = totalSales - totalCogs;
  const netProfit = grossProfit - totalExpenses;
  
  // For Break-even: Assume weighted average
  const avgSellingPrice = 1000; // Normalized for chart
  const avgVariableCost = (totalCogs / totalSales) * avgSellingPrice;
  const yearlyFixedCosts = totalExpenses;
  const monthlyFixedCosts = yearlyFixedCosts / 12;
  const contributionMargin = avgSellingPrice - avgVariableCost;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(yearlyFixedCosts / (totalSales / avgSellingPrice * (1 - totalCogs/totalSales))) : 0;

  // --- 5-YEAR PROJECTION LOGIC ---
  const [forecast, setForecast] = useState([]);
  
  useEffect(() => {
    const years = ['2024', '2025', '2026', '2027', '2028', '2029'];
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
  }, [salesData, cogsData, expensesData, growthAssumptions]);

  const formatUSD = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  return (
    <div className="axiom-finance-hub" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* 1. COMPREHENSIVE INPUT PANEL (3 COLUMNS) */}
      <div className="contact-form-box mb-8" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(181, 148, 91, 0.3)' }}>
        <button 
          onClick={() => setIsInputExpanded(!isInputExpanded)}
          style={{ width: '100%', padding: '18px 25px', background: '#1B1C36', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Calculator size={18} color="#B5945B" />
            <span style={{ color: '#E8E4D8', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Pro Financial Input (Excel Sync)</span>
          </div>
          {isInputExpanded ? <ChevronUp color="#B5945B" size={20} /> : <ChevronDown color="#B5945B" size={20} />}
        </button>

        {isInputExpanded && (
          <div style={{ padding: '30px', background: '#FFF' }} className="animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Col 1: Sales Activities */}
              <div className="space-y-4">
                <p className="input-header">Sales Activities</p>
                <MiniInput label="French Doors ($)" value={salesData.frenchDoors} onChange={(v) => setSalesData({...salesData, frenchDoors: v})} />
                <MiniInput label="Panel Doors ($)" value={salesData.panelDoors} onChange={(v) => setSalesData({...salesData, panelDoors: v})} />
                <MiniInput label="Windows ($)" value={salesData.windows} onChange={(v) => setSalesData({...salesData, windows: v})} />
                <MiniInput label="New Products ($)" value={salesData.newProducts} onChange={(v) => setSalesData({...salesData, newProducts: v})} />
              </div>

              {/* Col 2: Cost of Sales */}
              <div className="space-y-4">
                <p className="input-header">Cost of Sales (Direct)</p>
                <MiniInput label="Material Purchases ($)" value={cogsData.materials} onChange={(v) => setCogsData({...cogsData, materials: v})} />
                <MiniInput label="Direct Labour ($)" value={cogsData.directLabour} onChange={(v) => setCogsData({...cogsData, directLabour: v})} />
                <MiniInput label="Freight & Duty ($)" value={cogsData.freightDuty} onChange={(v) => setCogsData({...cogsData, freightDuty: v})} />
              </div>

              {/* Col 3: Operating Expenses */}
              <div className="space-y-4">
                <p className="input-header">Operating Expenses</p>
                <MiniInput label="Selling Salaries ($)" value={expensesData.sellingSalaries} onChange={(v) => setExpensesData({...expensesData, sellingSalaries: v})} />
                <MiniInput label="Advertising ($)" value={expensesData.advertising} onChange={(v) => setExpensesData({...expensesData, advertising: v})} />
                <MiniInput label="Management Salaries ($)" value={expensesData.managementSalaries} onChange={(v) => setExpensesData({...expensesData, managementSalaries: v})} />
                <MiniInput label="Interest ($)" value={expensesData.interest} onChange={(v) => setExpensesData({...expensesData, interest: v})} />
              </div>

              {/* Col 4: Growth Assumptions */}
              <div className="space-y-4">
                <p className="input-header">Strategic Growth (5-Year)</p>
                <MiniInput label="Annual Revenue Growth (%)" value={growthAssumptions.revenueGrowth} onChange={(v) => setGrowthAssumptions({...growthAssumptions, revenueGrowth: v})} />
                <MiniInput label="COGS Increase Rate (%)" value={growthAssumptions.cogsGrowth} onChange={(v) => setGrowthAssumptions({...growthAssumptions, cogsGrowth: v})} />
                <MiniInput label="OpEx Inflation (%)" value={growthAssumptions.expenseInflation} onChange={(v) => setGrowthAssumptions({...growthAssumptions, expenseInflation: v})} />
              </div>
            </div>
            <style jsx>{`
              .input-header { font-size: 0.75rem; font-weight: 800; color: #B5945B; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid rgba(181, 148, 91, 0.2); padding-bottom: 8px; margin-bottom: 15px; }
            `}</style>
          </div>
        )}
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex gap-4 mb-8">
        <TabButton active={activeTab === 'forecast'} onClick={() => setActiveTab('forecast')} label="Strategic Forecast" icon={<Calendar size={16} />} />
        <TabButton active={activeTab === 'performance'} onClick={() => setActiveTab('performance')} label="Performance Analysis" icon={<Activity size={16} />} />
      </div>

      {/* 3. DASHBOARD CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stats Column */}
        <div className="lg:col-span-4 space-y-4">
          <CompactMetric label="Total Yearly Revenue" value={formatUSD(totalSales)} icon={<TrendingUp size={20} color="#B5945B" />} />
          <CompactMetric label="Gross Profit" value={formatUSD(grossProfit)} icon={<DollarSign size={20} color="#B5945B" />} />
          <CompactMetric label="Net Income" value={formatUSD(netProfit)} icon={<Users size={20} color="#B5945B" />} />
          
          <div className="contact-info-box" style={{ padding: '24px', background: '#1B1C36', color: '#E8E4D8' }}>
            <h4 style={{ color: '#B5945B', fontSize: '0.8rem', fontWeight: '800', marginBottom: '12px' }}>EXPERT FINANCIAL INSIGHT</h4>
            <p style={{ fontSize: '0.8rem', lineHeight: '1.6', opacity: '0.9' }}>
              Current Gross Margin is <strong>{((grossProfit/totalSales)*100).toFixed(1)}%</strong>. 
              {netProfit > 0 ? " Your operations are profitable. " : " You are currently operating at a loss. "}
              Strategic target should be reducing COGS to below 60% of sales.
            </p>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'performance' && (
             <div className="contact-form-box" style={{ padding: '25px', overflowX: 'auto' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '20px', color: '#1B1C36' }}>
                  Detailed 5-Year Financial Outlook
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #B5945B', textAlign: 'left' }}>
                      <th style={{ padding: '10px' }}>Year</th>
                      <th style={{ padding: '10px' }}>Revenue</th>
                      <th style={{ padding: '10px' }}>Gross Profit</th>
                      <th style={{ padding: '10px' }}>Expenses</th>
                      <th style={{ padding: '10px' }}>Net Profit</th>
                      <th style={{ padding: '10px' }}>Margin %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forecast.map((row) => (
                      <tr key={row.year} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <td style={{ padding: '10px', fontWeight: '700' }}>{row.year}</td>
                        <td style={{ padding: '10px' }}>{formatUSD(row.revenue)}</td>
                        <td style={{ padding: '10px' }}>{formatUSD(row.grossProfit)}</td>
                        <td style={{ padding: '10px' }}>{formatUSD(row.expenses)}</td>
                        <td style={{ padding: '10px', color: row.netProfit >= 0 ? '#10B981' : '#EF4444', fontWeight: '700' }}>
                          {formatUSD(row.netProfit)}
                        </td>
                        <td style={{ padding: '10px' }}>{((row.netProfit/row.revenue)*100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          )}

          <div className="contact-form-box" style={{ padding: '25px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '20px', color: '#1B1C36' }}>
              {activeTab === 'forecast' ? '5-Year Revenue & Profit Projection' : 'Revenue vs. Total Costs Analysis'}
            </h3>
            <div style={{ height: '350px', width: '100%' }}>
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
                    <XAxis dataKey="year" fontSize={10} fontWeight="700" />
                    <YAxis tickFormatter={(v) => `$${v/1000}k`} fontSize={10} fontWeight="700" />
                    <Tooltip formatter={(v) => formatUSD(v)} contentStyle={{ borderRadius: '12px', border: 'none', background: '#1B1C36', color: '#E8E4D8' }} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#B5945B" strokeWidth={3} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="netProfit" name="Net Profit" stroke="#1B1C36" strokeWidth={2} fill="transparent" />
                  </AreaChart>
                ) : (
                  <BarChart data={forecast}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip formatter={(v) => formatUSD(v)} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#B5945B" name="Revenue" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#1B1C36" name="Expenses" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <MetricCard label="Gross Margin %" value={`${((grossProfit/totalSales)*100).toFixed(1)}%`} />
            <MetricCard label="Expense Ratio" value={`${((totalExpenses/totalSales)*100).toFixed(1)}%`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MiniInput = ({ label, value, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <label style={{ fontSize: '0.7rem', fontWeight: '600', color: '#666' }}>{label}</label>
    <input 
      type="number" value={value} onChange={(e) => onChange(Number(e.target.value))}
      style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem', fontWeight: '700', background: '#F9F9F9', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }}
    />
  </div>
);

const TabButton = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    style={{ 
      display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px',
      fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
      background: active ? '#B5945B' : 'white',
      color: active ? '#1B1C36' : '#666',
      border: active ? '1.5px solid #B5945B' : '1.5px solid rgba(0,0,0,0.1)'
    }}
  >
    {icon} {label}
  </button>
);

const CompactMetric = ({ label, value, icon }) => (
  <div className="contact-form-box" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ width: '44px', height: '44px', background: 'rgba(181, 148, 91, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#999', fontWeight: '800', marginBottom: '2px' }}>{label}</p>
      <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1B1C36', margin: 0 }}>{value}</h4>
    </div>
  </div>
);

const MetricCard = ({ label, value }) => (
  <div className="contact-form-box" style={{ padding: '15px', textAlign: 'center' }}>
    <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#B5945B', fontWeight: '800' }}>{label}</p>
    <h4 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{value}</h4>
  </div>
);

export default AxiomBreakEven;
