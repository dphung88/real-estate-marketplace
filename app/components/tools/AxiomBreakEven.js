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
  Layers,
  ShoppingBag
} from 'lucide-react';

const AxiomBreakEven = () => {
  // --- State for Inputs ---
  // Basic Finance
  const [fixedCosts, setFixedCosts] = useState(10000);
  const [sellingPrice, setSellingPrice] = useState(1000);
  const [variableCost, setVariableCost] = useState(600);
  
  // Operations
  const [totalRevenue, setTotalRevenue] = useState(100000);
  const [cogs, setCogs] = useState(40000);
  const [laborCost, setLaborCost] = useState(20000);
  const [area, setArea] = useState(50);
  
  // Marketing & Customer
  const [marketingCost, setMarketingCost] = useState(5000);
  const [newCustomers, setNewCustomers] = useState(50);
  const [oldCustomers, setOldCustomers] = useState(70);
  const [totalOrders, setTotalOrders] = useState(120);

  // Chart view state
  const [maxUnits, setMaxUnits] = useState(50);
  const [chartData, setChartData] = useState([]);

  // --- Calculations ---
  const contributionMargin = sellingPrice - variableCost;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : Infinity;
  const breakEvenRevenue = isFinite(breakEvenUnits) ? breakEvenUnits * sellingPrice : 0;
  
  const grossProfitMargin = totalRevenue > 0 ? ((totalRevenue - cogs) / totalRevenue) * 100 : 0;
  const laborCostRatio = totalRevenue > 0 ? (laborCost / totalRevenue) * 100 : 0;
  const directCostRatio = totalRevenue > 0 ? (cogs / totalRevenue) * 100 : 0;
  
  const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const cac = newCustomers > 0 ? marketingCost / newCustomers : 0;
  const retentionRate = (newCustomers + oldCustomers) > 0 ? (oldCustomers / (newCustomers + oldCustomers)) * 100 : 0;
  const clv = aov * (retentionRate > 0 ? (100 / (Math.max(1, 100 - retentionRate))) : 1);
  const revenuePerSqm = area > 0 ? totalRevenue / area : 0;

  useEffect(() => {
    // Generate Chart Data
    const data = [];
    const step = Math.max(1, Math.ceil(maxUnits / 10));
    const limit = Math.max(maxUnits, isFinite(breakEvenUnits) ? breakEvenUnits * 1.5 : 0);
    const finalLimit = Math.min(limit, 5000);

    for (let i = 0; i <= finalLimit; i += step) {
      const totalFixed = fixedCosts;
      const totalVar = i * variableCost;
      const cost = totalFixed + totalVar;
      const rev = i * sellingPrice;
      data.push({
        units: i,
        totalCost: cost,
        totalRevenue: rev,
      });
    }
    setChartData(data);
  }, [fixedCosts, variableCost, sellingPrice, maxUnits, breakEvenUnits]);

  const formatUSD = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="axiom-finance-hub" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: INPUTS (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="contact-form-box" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1B1C36', marginBottom: '24px', display: 'flex', itemsCenter: 'center', gap: '10px' }}>
              <Calculator size={20} color="#B5945B" />
              Financial Parameters
            </h3>
            
            <div className="contact-form space-y-6">
              {/* Basic Section */}
              <div className="input-section">
                <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px' }}>Core Finance</p>
                <div className="space-y-4">
                  <div className="form-group">
                    <label>Monthly Fixed Costs ($)</label>
                    <input type="number" value={fixedCosts} onChange={(e) => setFixedCosts(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label>Avg. Selling Price ($)</label>
                    <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label>Variable Cost / Unit ($)</label>
                    <input type="number" value={variableCost} onChange={(e) => setVariableCost(Number(e.target.value))} />
                  </div>
                </div>
              </div>

              {/* Operations Section */}
              <div className="input-section" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px' }}>Operations</p>
                <div className="space-y-4">
                  <div className="form-group">
                    <label>Total Revenue ($)</label>
                    <input type="number" value={totalRevenue} onChange={(e) => setTotalRevenue(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label>Total COGS ($)</label>
                    <input type="number" value={cogs} onChange={(e) => setCogs(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label>Total Labor Cost ($)</label>
                    <input type="number" value={laborCost} onChange={(e) => setLaborCost(Number(e.target.value))} />
                  </div>
                </div>
              </div>

              {/* Customer Section */}
              <div className="input-section" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px' }}>Customers & Marketing</p>
                <div className="space-y-4">
                  <div className="form-group">
                    <label>Marketing Budget ($)</label>
                    <input type="number" value={marketingCost} onChange={(e) => setMarketingCost(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label>New Customers</label>
                    <input type="number" value={newCustomers} onChange={(e) => setNewCustomers(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label>Max Chart Units</label>
                    <input type="number" value={maxUnits} onChange={(e) => setMaxUnits(Number(e.target.value))} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ANALYSIS (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="contact-info-box" style={{ padding: '20px', background: '#1B1C36', textAlign: 'center' }}>
              <TrendingUp size={24} color="#B5945B" style={{ margin: '0 auto 10px' }} />
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#B5945B', fontWeight: '800' }}>Break-Even Point</p>
              <h4 style={{ fontSize: '1.5rem', color: '#E8E4D8', fontWeight: '800' }}>{isFinite(breakEvenUnits) ? breakEvenUnits.toLocaleString() : 'N/A'} <span style={{ fontSize: '0.8rem', fontWeight: '400', opacity: '0.7' }}>units</span></h4>
            </div>
            <div className="contact-info-box" style={{ padding: '20px', background: '#1B1C36', textAlign: 'center' }}>
              <DollarSign size={24} color="#B5945B" style={{ margin: '0 auto 10px' }} />
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#B5945B', fontWeight: '800' }}>Gross Margin</p>
              <h4 style={{ fontSize: '1.5rem', color: '#E8E4D8', fontWeight: '800' }}>{grossProfitMargin.toFixed(1)}%</h4>
            </div>
            <div className="contact-info-box" style={{ padding: '20px', background: '#1B1C36', textAlign: 'center' }}>
              <Users size={24} color="#B5945B" style={{ margin: '0 auto 10px' }} />
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#B5945B', fontWeight: '800' }}>Avg. CLV</p>
              <h4 style={{ fontSize: '1.5rem', color: '#E8E4D8', fontWeight: '800' }}>{formatUSD(clv)}</h4>
            </div>
          </div>

          {/* Performance Analysis Section */}
          <div className="contact-form-box" style={{ padding: '30px' }}>
            <div className="flex justify-between items-center mb-8">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1B1C36' }}>Performance Indicators</h3>
              <div style={{ padding: '4px 12px', background: 'rgba(181, 148, 91, 0.1)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', color: '#B5945B' }}>
                Strategic Analysis
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <EfficiencyMetric label="Direct Cost Ratio" percent={directCostRatio} target="25-35%" />
                <EfficiencyMetric label="Labor Cost Ratio" percent={laborCostRatio} target="< 25%" />
                <EfficiencyMetric label="Retention Rate" percent={retentionRate} target="> 40%" />
              </div>

              <div className="space-y-4">
                <div style={{ background: '#1B1C36', padding: '24px', borderRadius: '16px', color: '#E8E4D8' }}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#B5945B', fontWeight: '800', letterSpacing: '1px' }}>Revenue / SQM</p>
                      <h4 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{formatUSD(revenuePerSqm)}</h4>
                    </div>
                    <ArrowUpRight color="#B5945B" size={24} />
                  </div>
                  <div style={{ borderTop: '1px solid rgba(232,229,215,0.1)', paddingTop: '15px' }}>
                    <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#B5945B', fontWeight: '800', letterSpacing: '1px' }}>Avg. Order Value (AOV)</p>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{formatUSD(aov)}</h4>
                  </div>
                </div>

                <div style={{ background: 'rgba(27, 28, 54, 0.03)', border: '1px dashed #B5945B', padding: '20px', borderRadius: '16px', display: 'flex', gap: '15px' }}>
                  <Info color="#B5945B" size={20} style={{ flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1B1C36', marginBottom: '4px' }}>Expert Advice</p>
                    <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.5' }}>
                      {grossProfitMargin < 40 ? "Gross margin is low. Consider price adjustments or vendor negotiation." : 
                       retentionRate < 30 ? "Retention is below target. Focus on CRM and loyalty programs." :
                       "Operational efficiency is healthy. Focus on scaling marketing to boost volume."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Break-even Chart */}
          <div className="contact-form-box" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1B1C36', marginBottom: '25px' }}>Profitability Projection</h3>
            <div style={{ height: '320px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                  <XAxis dataKey="units" stroke="#1B1C36" fontSize={10} fontWeight="700" axisLine={false} tickLine={false} />
                  <YAxis stroke="#1B1C36" fontSize={10} fontWeight="700" axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ background: '#1B1C36', border: 'none', borderRadius: '12px', padding: '12px', boxShadow: '0 10px 15px rgba(0,0,0,0.2)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: '700' }}
                    labelStyle={{ color: '#B5945B', marginBottom: '5px', fontWeight: '800' }}
                    formatter={(v) => formatUSD(v)}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: '700' }} />
                  <Line type="monotone" dataKey="totalCost" name="Total Cost" stroke="#1B1C36" strokeWidth={4} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="totalRevenue" name="Total Revenue" stroke="#B5945B" strokeWidth={4} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                  {isFinite(breakEvenUnits) && (
                    <ReferenceLine x={breakEvenUnits} stroke="#E74C3C" strokeDasharray="5 5" />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard 
              icon={<Target size={20} color="#B5945B" />} 
              label="CAC" 
              value={formatUSD(cac)} 
              desc="Customer Acquisition Cost" 
            />
            <MetricCard 
              icon={<ShoppingBag size={20} color="#B5945B" />} 
              label="Revenue / SQM" 
              value={formatUSD(revenuePerSqm)} 
              desc="Efficiency per area unit" 
            />
          </div>

        </div>
      </div>
    </div>
  );
};

const EfficiencyMetric = ({ label, percent, target }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <p style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B1C36' }}>{label}</p>
      <p style={{ fontSize: '0.65rem', fontWeight: '800', color: '#999', textTransform: 'uppercase' }}>Target: {target}</p>
    </div>
    <div style={{ height: '8px', background: 'rgba(27, 28, 54, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
      <div 
        style={{ 
          height: '100%', 
          width: `${Math.min(100, percent)}%`, 
          background: percent > 50 ? '#1B1C36' : '#B5945B',
          borderRadius: '4px',
          transition: 'width 1s ease-in-out'
        }} 
      />
    </div>
    <p style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1B1C36' }}>{percent.toFixed(1)}%</p>
  </div>
);

const MetricCard = ({ icon, label, value, desc }) => (
  <div className="contact-form-box" style={{ padding: '24px', display: 'flex', itemsCenter: 'center', gap: '20px' }}>
    <div style={{ width: '48px', height: '48px', background: 'rgba(27, 28, 54, 0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#999', fontWeight: '800', letterSpacing: '1px', marginBottom: '2px' }}>{label}</p>
      <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1B1C36' }}>{value}</h4>
      <p style={{ fontSize: '0.7rem', color: '#666' }}>{desc}</p>
    </div>
  </div>
);

export default AxiomBreakEven;
