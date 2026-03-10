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
  Target, 
  ArrowUpRight, 
  Info,
  ShoppingBag,
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
  const [isInputExpanded, setIsInputExpanded] = useState(false);

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
      
      {/* 1. COLLAPSIBLE INPUT PANEL */}
      <div className="contact-form-box mb-8" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(181, 148, 91, 0.3)' }}>
        <button 
          onClick={() => setIsInputExpanded(!isInputExpanded)}
          style={{ width: '100%', padding: '20px 30px', background: '#1B1C36', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Calculator size={20} color="#B5945B" />
            <span style={{ color: '#E8E4D8', fontWeight: '700', fontSize: '1.1rem' }}>Configuration Panel</span>
            {!isInputExpanded && <span style={{ color: '#B5945B', fontSize: '0.75rem', marginLeft: '10px', opacity: '0.8' }}>(Click to edit financial parameters)</span>}
          </div>
          {isInputExpanded ? <ChevronUp color="#B5945B" /> : <ChevronDown color="#B5945B" />}
        </button>

        {isInputExpanded && (
          <div style={{ padding: '30px', background: '#FFF' }} className="animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1px' }}>Core Finance</p>
                <MiniInput label="Fixed Costs ($)" value={fixedCosts} set={setFixedCosts} />
                <MiniInput label="Selling Price ($)" value={sellingPrice} set={setSellingPrice} />
                <MiniInput label="Variable Cost ($)" value={variableCost} set={setVariableCost} />
              </div>
              <div className="space-y-4">
                <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1px' }}>Operations</p>
                <MiniInput label="Total Revenue ($)" value={totalRevenue} set={setTotalRevenue} />
                <MiniInput label="Labor Cost ($)" value={laborCost} set={setLaborCost} />
                <MiniInput label="Area (SQM)" value={area} set={setArea} />
              </div>
              <div className="space-y-4">
                <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1px' }}>Marketing</p>
                <MiniInput label="Marketing Budget ($)" value={marketingCost} set={setMarketingCost} />
                <MiniInput label="New Customers" value={newCustomers} set={setNewCustomers} />
                <MiniInput label="Max Chart Units" value={maxUnits} set={setMaxUnits} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. MAIN DASHBOARD (FIXED HEIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Key Metrics (4 cols) */}
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

        {/* Right: Chart & Efficiency (8 cols) */}
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

const MiniInput = ({ label, value, set }) => (
  <div className="form-group" style={{ marginBottom: '0' }}>
    <label style={{ fontSize: '0.75rem', marginBottom: '4px' }}>{label}</label>
    <input 
      type="number" 
      value={value} 
      onChange={(e) => set(Number(e.target.value))} 
      style={{ padding: '8px 12px', fontSize: '0.9rem' }}
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
