'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, ReferenceLine, AreaChart, Area
} from 'recharts';
import { 
  Calculator, DollarSign, Package, TrendingUp, Info, 
  ChevronRight, ArrowRight, ShieldCheck, AlertCircle
} from 'lucide-react';

const BreakEvenCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState(10000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(500);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(1000);
  const [targetProfit, setTargetProfit] = useState(5000);
  const [maxUnits, setMaxUnits] = useState(50);
  const [chartData, setChartData] = useState([]);
  
  // Calculations
  const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
  const contributionMarginRatio = sellingPricePerUnit > 0 ? (contributionMargin / sellingPricePerUnit) * 100 : 0;
  
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit;
  
  const targetUnits = contributionMargin > 0 ? Math.ceil((fixedCosts + targetProfit) / contributionMargin) : 0;
  const targetRevenue = targetUnits * sellingPricePerUnit;

  useEffect(() => {
    const data = [];
    const limit = Math.max(maxUnits, breakEvenUnits * 1.5, targetUnits * 1.2);
    const step = Math.max(1, Math.ceil(limit / 20));
    
    for (let i = 0; i <= limit; i += step) {
      const revenue = i * sellingPricePerUnit;
      const totalCost = fixedCosts + (i * variableCostPerUnit);
      data.push({
        units: i,
        revenue,
        totalCost,
        profit: revenue - totalCost
      });
    }
    setChartData(data);
  }, [fixedCosts, variableCostPerUnit, sellingPricePerUnit, maxUnits, breakEvenUnits, targetUnits]);

  const formatUSD = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  return (
    <div className="axiom-finance-hub" style={{ fontFamily: "Aptos, 'Segoe UI', 'Helvetica Neue', sans-serif" }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Input Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="contact-form-box" style={{ padding: '30px', background: '#FFF' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '30px', color: '#1B1C36', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calculator size={20} color="#B5945B" />
              QUICK PARAMETERS
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p className="input-header" style={{ fontSize: '0.85rem', fontWeight: '900', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', paddingLeft: '8px', borderLeft: '3px solid #B5945B', lineHeight: '1' }}>Operational Costs</p>
                <QuickInput 
                  label="Fixed Costs" 
                  description="Total Monthly"
                  value={fixedCosts} 
                  onChange={setFixedCosts} 
                />
                <QuickInput 
                  label="Variable Cost" 
                  description="Per Unit"
                  value={variableCostPerUnit} 
                  onChange={setVariableCostPerUnit} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p className="input-header" style={{ fontSize: '0.85rem', fontWeight: '900', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', paddingLeft: '8px', borderLeft: '3px solid #B5945B', lineHeight: '1' }}>Revenue & Targets</p>
                <QuickInput 
                  label="Selling Price" 
                  description="Per Unit"
                  value={sellingPricePerUnit} 
                  onChange={setSellingPricePerUnit} 
                />
                <div style={{ paddingTop: '15px', marginTop: '5px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  <QuickInput 
                    label="Target Profit" 
                    description="Desired Goal"
                    value={targetProfit} 
                    onChange={setTargetProfit} 
                    highlight
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="contact-info-box" style={{ padding: '24px', background: '#1B1C36', color: '#E8E4D8', borderRadius: '16px' }}>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={18} color="#B5945B" />
              <h4 style={{ color: '#B5945B', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                PROFITABILITY MARGIN
              </h4>
            </div>
            <div className="flex justify-between items-end">
              <span style={{ fontSize: '2rem', fontWeight: '900', color: '#FFF' }}>{contributionMarginRatio.toFixed(1)}%</span>
              <span style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '8px' }}>CM Ratio</span>
            </div>
            <p style={{ fontSize: '0.85rem', marginTop: '10px', opacity: 0.7, lineHeight: '1.5' }}>
              For every dollar in sales, you keep {formatUSD(contributionMargin/sellingPricePerUnit*1)} to cover fixed costs and profit.
            </p>
          </div>
        </div>

        {/* Right: Results & Chart */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultCard 
              label="Break-Even Point" 
              units={breakEvenUnits} 
              revenue={breakEvenRevenue}
              type="primary"
            />
            <ResultCard 
              label="Target Profit Point" 
              units={targetUnits} 
              revenue={targetRevenue}
              type="accent"
            />
          </div>

          <div className="contact-form-box" style={{ padding: '30px' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1B1C36' }}>
                Cost vs. Revenue Analysis
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#B5945B' }}></div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#666' }}>REVENUE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1B1C36' }}></div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#666' }}>TOTAL COST</span>
                </div>
              </div>
            </div>

            <div style={{ height: '350px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevQuick" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B5945B" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#B5945B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="units" fontSize={10} fontWeight="700" label={{ value: 'Units Sold', position: 'insideBottom', offset: -5, fontSize: 10, fontWeight: 700 }} />
                  <YAxis tickFormatter={(v) => `$${v/1000}k`} fontSize={10} fontWeight="700" />
                  <Tooltip 
                    formatter={(v) => formatUSD(v)} 
                    contentStyle={{ borderRadius: '12px', border: 'none', background: '#1B1C36', color: '#E8E4D8', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                  />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#B5945B" strokeWidth={3} fill="url(#colorRevQuick)" />
                  <Area type="monotone" dataKey="totalCost" name="Total Cost" stroke="#1B1C36" strokeWidth={2} fill="transparent" />
                  
                  <ReferenceLine x={breakEvenUnits} stroke="#1B1C36" strokeDasharray="3 3" label={{ position: 'top', value: 'BEP', fill: '#1B1C36', fontSize: 10, fontWeight: 900 }} />
                  {targetProfit > 0 && (
                    <ReferenceLine x={targetUnits} stroke="#B5945B" strokeDasharray="3 3" label={{ position: 'top', value: 'TARGET', fill: '#B5945B', fontSize: 10, fontWeight: 900 }} />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {sellingPricePerUnit <= variableCostPerUnit && sellingPricePerUnit > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '12px', color: '#B91C1C' }}>
              <AlertCircle size={20} />
              <p style={{ fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>
                Critical Error: Selling price must be higher than variable cost to achieve break-even.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuickInput = ({ label, description, value, onChange, highlight }) => {
  const formatInputDisplay = (val) => {
    if (val === 0 || val === '0') return '0';
    if (!val) return '';
    return new Intl.NumberFormat('en-US').format(val);
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (rawValue === '' || !isNaN(rawValue)) {
      onChange(rawValue === '' ? 0 : Number(rawValue));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div className="flex items-baseline justify-between gap-4">
        <label style={{ fontSize: '0.85rem', fontWeight: '900', color: highlight ? '#B5945B' : '#1B1C36', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
          {label}
        </label>
        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: '500', textAlign: 'right' }}>{description}</span>
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#B5945B' }}>
          <DollarSign size={16} />
        </div>
        <input 
          type="text" 
          value={formatInputDisplay(value)} 
          onChange={handleInputChange}
          style={{ 
            width: '100%', 
            padding: '12px 16px 12px 40px', 
            fontSize: '1rem', 
            fontWeight: '800', 
            background: '#FFFFFF', 
            border: highlight ? '2px solid #B5945B' : '1.5px solid rgba(27, 28, 54, 0.1)', 
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
            e.target.style.borderColor = highlight ? '#B5945B' : 'rgba(27, 28, 54, 0.1)';
            e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
          }}
        />
      </div>
    </div>
  );
};

const ResultCard = ({ label, units, revenue, type }) => (
  <div className="contact-form-box" style={{ 
    padding: '24px', 
    background: type === 'primary' ? '#FFF' : '#FDFCF9',
    borderLeft: `4px solid ${type === 'primary' ? '#1B1C36' : '#B5945B'}`
  }}>
    <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{label}</p>
    <div className="flex justify-between items-baseline">
      <h4 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B1C36', margin: 0 }}>
        {units.toLocaleString()} <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#666' }}>Units</span>
      </h4>
    </div>
    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: '#B5945B', fontWeight: '700', fontSize: '1rem' }}>
      <ArrowRight size={14} />
      <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenue)} Revenue</span>
    </div>
  </div>
);

const BuildingIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
);

const TagIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);

const TargetIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);

export default BreakEvenCalculator;
