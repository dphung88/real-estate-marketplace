'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, ReferenceLine, AreaChart, Area
} from 'recharts';
import { 
  Calculator, DollarSign, Package, TrendingUp, Info, 
  ChevronRight, ArrowRight, ShieldCheck, AlertCircle, ChevronUp, ChevronDown, Target
} from 'lucide-react';

const BreakEvenCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState(10000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(500);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(1000);
  const [targetProfit, setTargetProfit] = useState(5000);
  const [maxUnits, setMaxUnits] = useState(50);
  const [chartData, setChartData] = useState([]);
  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const [mobileInputTab, setMobileInputTab] = useState('costs');
  
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
      
      {/* 1. SYNCED INPUT PANEL (HORIZONTAL LAYOUT) */}
      <div className="contact-form-box mb-8" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(181, 148, 91, 0.3)' }}>
        <button 
          onClick={() => setIsInputExpanded(!isInputExpanded)}
          style={{ width: '100%', padding: '14px 28px', background: '#1B1C36', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calculator size={18} color="#B5945B" />
            <span style={{ color: '#E8E4D8', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Parameters Input</span>
          </div>
          {isInputExpanded ? <ChevronUp color="#B5945B" size={20} /> : <ChevronDown color="#B5945B" size={20} />}
        </button>

        {isInputExpanded && (
          <div style={{ padding: '20px 30px 30px', background: '#FFF' }} className="animate-in slide-in-from-top duration-300">
            
            {/* Mobile Sub-Tabs */}
            <div className="mobile-only-flex mb-6" style={{ overflowX: 'auto', paddingBottom: '10px', gap: '10px', borderBottom: '1px solid #eee' }}>
              <button 
                onClick={() => setMobileInputTab('costs')}
                style={{ 
                  padding: '10px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800', whiteSpace: 'nowrap',
                  background: mobileInputTab === 'costs' ? '#1B1C36' : '#f5f5f5',
                  color: mobileInputTab === 'costs' ? '#B5945B' : '#666',
                  border: 'none', cursor: 'pointer'
                }}
              >Costs</button>
              <button 
                onClick={() => setMobileInputTab('revenue')}
                style={{ 
                  padding: '10px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800', whiteSpace: 'nowrap',
                  background: mobileInputTab === 'revenue' ? '#1B1C36' : '#f5f5f5',
                  color: mobileInputTab === 'revenue' ? '#B5945B' : '#666',
                  border: 'none', cursor: 'pointer'
                }}
              >Revenue</button>
              <button 
                onClick={() => setMobileInputTab('insight')}
                style={{ 
                  padding: '10px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800', whiteSpace: 'nowrap',
                  background: mobileInputTab === 'insight' ? '#1B1C36' : '#f5f5f5',
                  color: mobileInputTab === 'insight' ? '#B5945B' : '#666',
                  border: 'none', cursor: 'pointer'
                }}
              >Insight</button>
            </div>

            <div className="input-grid-container">
              
              {/* Col 1: Operational Costs */}
              <div className={`input-col ${mobileInputTab === 'costs' ? 'mobile-active' : 'mobile-hidden'}`}>
                <p className="input-header">Operational Costs</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <QuickInput label="Fixed Costs" description="Monthly Total" value={fixedCosts} onChange={setFixedCosts} />
                  <QuickInput label="Variable Cost" description="Per Unit" value={variableCostPerUnit} onChange={setVariableCostPerUnit} />
                </div>
              </div>

              {/* Col 2: Revenue & Targets */}
              <div className={`input-col ${mobileInputTab === 'revenue' ? 'mobile-active' : 'mobile-hidden'}`}>
                <p className="input-header">Revenue & Targets</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <QuickInput label="Selling Price" description="Per Unit" value={sellingPricePerUnit} onChange={setSellingPricePerUnit} />
                  <QuickInput label="Target Profit" description="Goal" value={targetProfit} onChange={setTargetProfit} highlight />
                </div>
              </div>

              {/* Col 3: Profitability Insight */}
              <div className={`input-col ${mobileInputTab === 'insight' ? 'mobile-active' : 'mobile-hidden'}`}>
                <p className="input-header">Profitability Insight</p>
                <div className="contact-info-box" style={{ padding: '24px', background: '#1B1C36', color: '#E8E4D8', borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={18} color="#B5945B" />
                    <h4 style={{ color: '#B5945B', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                      MARGIN RATIO
                    </h4>
                  </div>
                  <div className="flex justify-between items-end">
                    <span style={{ fontSize: '2.2rem', fontWeight: '950', color: '#FFF', letterSpacing: '-1px' }}>{contributionMarginRatio.toFixed(1)}%</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', marginTop: '12px', opacity: 0.8, lineHeight: '1.6', margin: 0 }}>
                    You retain <strong>{formatUSD(contributionMargin/sellingPricePerUnit*1)}</strong> from every dollar in sales to cover fixed costs and net profit.
                  </p>
                </div>
              </div>

            </div>
            
            <style jsx>{`
              .input-header { font-size: 0.85rem; font-weight: 900; color: #B5945B; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; padding-left: 8px; border-left: 3px solid #B5945B; line-height: 1.2; display: flex; align-items: center; min-height: 1.2rem; }
              
              .input-grid-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 30px;
              }

              .mobile-only-flex { display: none; }

              @media (max-width: 768px) {
                .mobile-only-flex { display: flex; }
                .input-grid-container { display: block; }
                .mobile-hidden { display: none; }
                .mobile-active { display: block; }
              }
            `}</style>
          </div>
        )}
      </div>

      {/* 2. RESULTS & CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Results Column */}
        <div className="lg:col-span-4 space-y-6">
          <CompactMetric label="Break-Even Point" value={`${breakEvenUnits.toLocaleString()} Units`} icon={<TrendingUp size={20} color="#B5945B" />} />
          <CompactMetric label="Target Sales" value={`${targetUnits.toLocaleString()} Units`} icon={<Target size={20} color="#B5945B" />} />
          
          <div className="contact-info-box" style={{ padding: '24px 32px', background: '#1B1C36', color: '#E8E4D8', borderRadius: '16px' }}>
            <h4 style={{ color: '#B5945B', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', margin: 0, marginBottom: '12px' }}>
              CALCULATION SUMMARY
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#E8E4D8', margin: 0 }}>
              To achieve your <strong>{formatUSD(targetProfit)}</strong> profit goal, you need total revenue of <strong>{formatUSD(targetRevenue)}</strong>. 
              Break-even revenue is <strong>{formatUSD(breakEvenRevenue)}</strong>.
            </p>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="contact-form-box" style={{ padding: '30px' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1B1C36' }}>
                Quick Cost vs. Revenue Analysis
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

            <div style={{ height: '380px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevQuick" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B5945B" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#B5945B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="units" fontSize={10} fontWeight="800" label={{ value: 'Units Sold', position: 'insideBottom', offset: -5, fontSize: 10, fontWeight: 800 }} />
                  <YAxis tickFormatter={(v) => `$${v/1000}k`} fontSize={10} fontWeight="800" />
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
        <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#B5945B' }}>
          <DollarSign size={14} />
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
            e.target.style.borderColor = highlight ? '#B5945B' : 'rgba(27, 28, 54, 0.1)';
            e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
          }}
        />
      </div>
    </div>
  );
};

const CompactMetric = ({ label, value, icon }) => (
  <div className="contact-form-box" style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ width: '48px', height: '48px', background: 'rgba(181, 148, 91, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#999', fontWeight: '900', marginBottom: '4px', letterSpacing: '0.5px' }}>{label}</p>
      <h4 style={{ fontSize: '1.6rem', fontWeight: '950', color: '#1B1C36', margin: 0, letterSpacing: '-0.5px' }}>{value}</h4>
    </div>
  </div>
);

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

export default BreakEvenCalculator;
