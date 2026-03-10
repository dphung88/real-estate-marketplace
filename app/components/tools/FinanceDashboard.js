'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp, Wallet, PieChart, BarChart3, Users, LayoutDashboard, 
  Target, ShoppingBag, ArrowUpRight, ArrowDownRight, Info, Calculator
} from 'lucide-react';

const FinanceDashboard = () => {
  // Force update by using a state that increments
  const [v, setV] = useState(0);
  
  // 1. Break-Even Point
  const [fixedCosts, setFixedCosts] = useState(10000000);
  const [sellingPrice, setSellingPrice] = useState(1000000);
  const [variableCost, setVariableCost] = useState(600000);

  // 2. Cash Flow
  const [cashIn, setCashIn] = useState(50000000);
  const [cashOut, setCashOut] = useState(30000000);
  
  // 3, 4, 5. Profitability
  const [totalRevenue, setTotalRevenue] = useState(100000000);
  const [cogs, setCogs] = useState(40000000); 
  const [laborCost, setLaborCost] = useState(20000000);
  
  // 6, 7. Management
  const [area, setArea] = useState(50);
  const [outputUnits, setOutputUnits] = useState(150); 
  const [resourceCount, setResourceCount] = useState(10); 
  const [totalOrders, setTotalOrders] = useState(120);

  // 9, 10. Customer
  const [marketingCost, setMarketingCost] = useState(5000000);
  const [newCustomers, setNewCustomers] = useState(50);
  const [oldCustomers, setOldCustomers] = useState(70);

  const formatUSD = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  // --- Calculations ---
  const contributionMargin = sellingPrice - variableCost;
  const beUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
  const cashFlow = cashIn - cashOut;
  const grossProfitMargin = totalRevenue > 0 ? ((totalRevenue - cogs) / totalRevenue) * 100 : 0;
  const directCostPercent = totalRevenue > 0 ? (cogs / totalRevenue) * 100 : 0;
  const laborCostPercent = totalRevenue > 0 ? (laborCost / totalRevenue) * 100 : 0;
  const revenuePerUnit = area > 0 ? totalRevenue / area : 0;
  const productivityRate = resourceCount > 0 ? outputUnits / resourceCount : 0;
  const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const cac = newCustomers > 0 ? marketingCost / newCustomers : 0;
  const retentionRate = (newCustomers + oldCustomers) > 0 ? (oldCustomers / (newCustomers + oldCustomers)) * 100 : 0;
  const clv = aov * (retentionRate > 0 ? (100 / (Math.max(1, 100 - retentionRate))) : 1);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700" key="finance-dashboard-new">
      
      {/* HEADER SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard icon={<TrendingUp className="text-blue-500"/>} label="Break-Even Point" value={`${beUnits} units`} sub="Minimum quantity" />
        <SummaryCard icon={<Wallet className={`text-${cashFlow >= 0 ? 'green' : 'red'}-500`}/>} label="Cash Flow" value={formatUSD(cashFlow)} sub="Actual cash" />
        <SummaryCard icon={<PieChart className="text-purple-500"/>} label="Gross Profit" value={`${grossProfitMargin.toFixed(1)}%`} sub="Profit margin" />
        <SummaryCard icon={<Users className="text-orange-500"/>} label="Customer Lifetime" value={formatUSD(clv)} sub="Average CLV value" />
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* LEFT COLUMN: INPUTS */}
        <div className="w-full xl:w-1/3 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-blue-50">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-blue-900">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Calculator size={20}/>
              </div>
              Input Parameters
            </h3>
            
            <div className="space-y-8">
              <InputGroup label="Basic Finance" items={[
                { label: 'Fixed costs', value: fixedCosts, set: setFixedCosts },
                { label: 'Average selling price', value: sellingPrice, set: setSellingPrice },
                { label: 'Product cost (COGS)', value: variableCost, set: setVariableCost },
              ]} />
              
              <InputGroup label="Operations & HR" items={[
                { label: 'Total revenue', value: totalRevenue, set: setTotalRevenue },
                { label: 'Total labor cost', value: laborCost, set: setLaborCost },
                { label: 'Area (sqm)', value: area, set: setArea },
              ]} />

              <InputGroup label="Customer & Marketing" items={[
                { label: 'Marketing cost', value: marketingCost, set: setMarketingCost },
                { label: 'New customers', value: newCustomers, set: setNewCustomers },
                { label: 'Returning customers', value: oldCustomers, set: setOldCustomers },
              ]} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DASHBOARD & ANALYSIS */}
        <div className="w-full xl:w-2/3 space-y-8">
          
          {/* SECTION: PHÂN TÍCH TỐI ƯU */}
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <BarChart3 size={180}/>
            </div>
            
            <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
              <LayoutDashboard className="text-blue-400"/> Performance Analysis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <EfficiencyBar label="Direct Cost Ratio" percent={directCostPercent} target="25-35%" color="bg-blue-500" />
                <EfficiencyBar label="Labor Cost Ratio" percent={laborCostPercent} target="< 25%" color="bg-purple-500" />
                <EfficiencyBar label="Retention Rate" percent={retentionRate} target="> 40%" color="bg-green-500" />
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-slate-800/40 p-8 rounded-3xl backdrop-blur-md border border-slate-700/50 flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Revenue / sqm</p>
                      <p className="text-3xl font-black text-white">{formatUSD(revenuePerUnit)}</p>
                    </div>
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="text-green-400" size={20} />
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Avg Resource Productivity</p>
                      <p className="text-3xl font-black text-white">{productivityRate.toFixed(1)} <small className="text-sm opacity-50 font-medium">units/day</small></p>
                    </div>
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="text-blue-400" size={20} />
                    </div>
                  </div>
                </div>

                {/* ADVICE BOX INSIDE DASHBOARD */}
                <div className="bg-blue-500/10 border border-blue-500/20 p-8 rounded-3xl flex gap-5 items-center">
                  <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                    <Info size={28}/>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-400 mb-1">Management Advice:</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {grossProfitMargin < 50 ? 'Gross profit margin is quite low. You should review selling prices or renegotiate with suppliers.' : 
                       laborCostPercent > 30 ? 'Labor costs are high. Consider optimizing processes or automation.' :
                       retentionRate < 20 ? 'Customer retention is low. Focus on customer care programs.' :
                       'Indicators are stable. Focus on increasing AOV (Average Order Value) to boost revenue.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: ORDER DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricBox 
              icon={<ShoppingBag className="text-indigo-500"/>} 
              label="Average Order Value (AOV)" 
              value={formatUSD(aov)} 
              desc="Average per invoice"
            />
            <MetricBox 
              icon={<Target className="text-pink-500"/>} 
              label="Customer Acquisition Cost (CAC)" 
              value={formatUSD(cac)} 
              desc="Marketing budget / New customers"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, label, value, sub }) => (
  <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-5">
    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-xl shadow-inner">{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">{label}</p>
      <p className="text-xl font-black text-gray-900 leading-none mb-1">{value}</p>
      <p className="text-[10px] text-gray-400 font-medium">{sub}</p>
    </div>
  </div>
);

const InputGroup = ({ label, items }) => (
  <div className="space-y-5">
    <p className="text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] opacity-70">{label}</p>
    {items.map((item, i) => (
      <div key={i} className="group">
        <label className="text-xs font-bold text-gray-500 mb-2 block group-focus-within:text-blue-600 transition-colors uppercase tracking-wide">{item.label}</label>
        <div className="relative">
          <input 
            type="number" 
            value={item.value} 
            onChange={(e) => item.set(Number(e.target.value))}
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 text-sm font-bold focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none"
          />
        </div>
      </div>
    ))}
  </div>
);

const EfficiencyBar = ({ label, percent, target, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <p className="text-sm font-bold text-slate-200">{label}</p>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mục tiêu: {target}</p>
    </div>
    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-1000 relative`} 
        style={{ width: `${Math.min(100, percent)}%` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white/20 blur-[2px]"></div>
      </div>
    </div>
    <p className="text-2xl font-black text-white">{percent.toFixed(1)}%</p>
  </div>
);

const MetricBox = ({ icon, label, value, desc }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group cursor-default">
    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-500 text-xl">{icon}</div>
    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-3xl font-black text-gray-900 mb-2">{value}</p>
    <p className="text-xs text-gray-400 font-medium">{desc}</p>
  </div>
);

export default FinanceDashboard;
