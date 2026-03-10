'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const AxiomBreakEven = () => {
  // --- State for Inputs ---
  const [fixedCosts, setFixedCosts] = useState(10000);
  const [sellingPrice, setSellingPrice] = useState(1000);
  const [variableCost, setVariableCost] = useState(600);
  const [totalRevenue, setTotalRevenue] = useState(100000);
  const [cogs, setCogs] = useState(40000);
  const [laborCost, setLaborCost] = useState(20000);
  const [area, setArea] = useState(50);
  const [marketingCost, setMarketingCost] = useState(5000);
  const [newCustomers, setNewCustomers] = useState(50);
  const [oldCustomers, setOldCustomers] = useState(70);
  const [totalOrders, setTotalOrders] = useState(120);

  const [maxUnits, setMaxUnits] = useState(50);
  const [chartData, setChartData] = useState([]);
  const [isInputExpanded, setIsInputExpanded] = useState(true); // Default expanded for easier editing

  // --- Calculations ---
  const contributionMargin = sellingPrice - variableCost;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : Infinity;
  const grossProfitMargin = totalRevenue > 0 ? ((totalRevenue - cogs) / totalRevenue) * 100 : 0;
  const retentionRate = (newCustomers + oldCustomers) > 0 ? (oldCustomers / (newCustomers + oldCustomers)) * 100 : 0;
  const clv = totalOrders > 0 ? (totalRevenue / totalOrders) * (retentionRate > 0 ? (100 / Math.max(1, 100 - retentionRate)) : 1) : 0;
  const revenuePerSqm = area > 0 ? totalRevenue / area : 0;

  useEffect(() => {
    const data = [];
    const step = Math.max(1, Math.ceil(maxUnits / 10));
    const limit = Math.max(maxUnits, isFinite(breakEvenUnits) ? breakEvenUnits * 1.5 : 0);
    for (let i = 0; i <= Math.min(limit, 5000); i += step) {
      data.push({ units: i, totalCost: fixedCosts + (i * variableCost), totalRevenue: i * sellingPrice });
    }
    setChartData(data);
  }, [fixedCosts, variableCost, sellingPrice, maxUnits, breakEvenUnits]);

  const formatUSD = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  return (
    <div className="axiom-finance-hub" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* 1. COLLAPSIBLE INPUT PANEL WITH 3-COLUMN LAYOUT */}
      <div className="contact-form-box mb-8" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(181, 148, 91, 0.3)' }}>
        <button 
          onClick={() => setIsInputExpanded(!isInputExpanded)}
          style={{ width: '100%', padding: '18px 25px', background: '#1B1C36', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Calculator size={18} color="#B5945B" />
            <span style={{ color: '#E8E4D8', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Configuration Panel</span>
          </div>
          {isInputExpanded ? <ChevronUp color="#B5945B" size={20} /> : <ChevronDown color="#B5945B" size={20} />}
        </button>

        {isInputExpanded && (
          <div style={{ padding: '25px', background: '#FFF' }} className="animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Column 1: Core Finance */}
              <div className="space-y-4">
                <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid rgba(181, 148, 91, 0.2)', paddingBottom: '8px', marginBottom: '15px' }}>Core Finance</p>
                <InlineInput label="Fixed Costs ($)" value={fixedCosts} set={setFixedCosts} />
                <InlineInput label="Selling Price ($)" value={sellingPrice} set={setSellingPrice} />
                <InlineInput label="Variable Cost ($)" value={variableCost} set={setVariableCost} />
              </div>

              {/* Column 2: Operations */}
              <div className="space-y-4">
                <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid rgba(181, 148, 91, 0.2)', paddingBottom: '8px', marginBottom: '15px' }}>Operations</p>
                <InlineInput label="Total Revenue ($)" value={totalRevenue} set={setTotalRevenue} />
                <InlineInput label="Labor Cost ($)" value={laborCost} set={setLaborCost} />
                <InlineInput label="Area (SQM)" value={area} set={setArea} />
              </div>

              {/* Column 3: Marketing & Chart */}
              <div className="space-y-4">
                <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid rgba(181, 148, 91, 0.2)', paddingBottom: '8px', marginBottom: '15px' }}>Marketing & View</p>
                <InlineInput label="Marketing Budget ($)" value={marketingCost} set={setMarketingCost} />
                <InlineInput label="New Customers" value={newCustomers} set={setNewCustomers} />
                <InlineInput label="Max Chart Units" value={maxUnits} set={setMaxUnits} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. MAIN DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Stats */}
        <div className="lg:col-span-4 space-y-4">
          <CompactMetric label="Break-Even Point" value={`${breakEvenUnits.toLocaleString()} units`} icon={<TrendingUp size={20} color="#B5945B" />} />
          <CompactMetric label="Gross Margin" value={`${grossProfitMargin.toFixed(1)}%`} icon={<DollarSign size={20} color="#B5945B" />} />
          <CompactMetric label="CLV Value" value={formatUSD(clv)} icon={<Users size={20} color="#B5945B" />} />
          
          <div className="contact-info-box" style={{ padding: '24px', background: '#1B1C36', color: '#E8E4D8' }}>
            <div className="flex justify-between items-center mb-4">
              <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#B5945B', fontWeight: '800' }}>Expert Advice</p>
              <Info size={16} color="#B5945B" />
            </div>
            <p style={{ fontSize: '0.8rem', lineHeight: '1.5', opacity: '0.9' }}>
              {grossProfitMargin < 40 ? "Margin low. Review pricing." : "Efficiency healthy. Scale marketing."}
            </p>
          </div>
        </div>

        {/* Right Chart */}
        <div className="lg:col-span-8 space-y-6">
          <div className="contact-form-box" style={{ padding: '25px' }}>
            <div style={{ height: '350px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                  <XAxis dataKey="units" stroke="#1B1C36" fontSize={10} fontWeight="700" />
                  <YAxis stroke="#1B1C36" fontSize={10} fontWeight="700" tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ background: '#1B1C36', border: 'none', borderRadius: '12px', color: '#E8E4D8' }}
                    formatter={(v) => formatUSD(v)}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="totalCost" name="Total Cost" stroke="#1B1C36" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="totalRevenue" name="Total Revenue" stroke="#B5945B" strokeWidth={3} dot={false} />
                  {isFinite(breakEvenUnits) && <ReferenceLine x={breakEvenUnits} stroke="#E74C3C" strokeDasharray="5 5" />}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <MiniMetricCard label="Revenue / SQM" value={formatUSD(revenuePerSqm)} />
            <MiniMetricCard label="Order Value (AOV)" value={formatUSD(totalRevenue / (totalOrders || 1))} />
          </div>
        </div>
      </div>
    </div>
  );
};

// IMPROVED INLINE INPUT FOR 3-COLUMN LAYOUT
const InlineInput = ({ label, value, set }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666' }}>{label}</label>
    <input 
      type="number" 
      value={value} 
      onChange={(e) => set(Number(e.target.value))} 
      style={{ 
        width: '100%',
        padding: '10px 14px', 
        fontSize: '0.9rem', 
        fontWeight: '700',
        background: '#F9F9F9',
        border: '1.5px solid rgba(27, 28, 54, 0.1)',
        borderRadius: '10px',
        color: '#1B1C36',
        transition: 'all 0.2s'
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#B5945B';
        e.target.style.background = '#FFF';
        e.target.style.boxShadow = '0 0 0 3px rgba(181, 148, 91, 0.1)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'rgba(27, 28, 54, 0.1)';
        e.target.style.background = '#F9F9F9';
        e.target.style.boxShadow = 'none';
      }}
    />
  </div>
);

const CompactMetric = ({ label, value, icon }) => (
  <div className="contact-form-box" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
    <div style={{ width: '40px', height: '40px', background: 'rgba(27, 28, 54, 0.03)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#999', fontWeight: '800', letterSpacing: '1px' }}>{label}</p>
      <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1B1C36' }}>{value}</h4>
    </div>
  </div>
);

const MiniMetricCard = ({ label, value }) => (
  <div className="contact-form-box" style={{ padding: '15px 20px', textAlign: 'center' }}>
    <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#B5945B', fontWeight: '800', marginBottom: '2px' }}>{label}</p>
    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1B1C36' }}>{value}</h4>
  </div>
);

export default AxiomBreakEven;
