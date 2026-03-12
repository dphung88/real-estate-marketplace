'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, Wallet, PieChart, BarChart3, Users, 
  Target, ArrowUpRight, ArrowDownRight, 
  Save, Download, Info, LayoutDashboard,
  Calendar, Building, FileText, Activity, CreditCard, ChevronDown, ChevronUp,
  DollarSign, Percent, BarChart, Scale
} from 'lucide-react';
import { 
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, Cell, Pie
} from 'recharts';

const INITIAL_DATA = {
  company: {
    name: "Axiom Enterprises LLC",
    tradingName: "Axiom Advanced Manufacturing",
    address: "One World Trade Center, Suite 8500, New York, NY 10007",
    phone: "+1 (800) 555-0199",
    email: "finance@axiom-enterprises.com",
    form: "Limited Liability Company (LLC)",
    naicsCode: "332999",
    exportPercent: 25
  },
  years: ['2026', '2027', '2028', '2029', '2030', '2031'],
  sales: {
    'French doors': [571900, 625300, 789000, 863000, 932000, 1007000],
    'Panel doors': [275400, 225000, 218900, 180000, 194000, 210000],
    'Windows': [74100, 83000, 114300, 130000, 140000, 151000],
    'New door model': [0, 0, 0, 75000, 94000, 127000]
  },
  cogs: {
    'Opening Inventory': [173700, 147500, 227100, 212400, 270000, 290000],
    'Material Purchases': [491900, 576900, 611700, 670000, 710000, 778000],
    'Freight & Duty': [18600, 20300, 22700, 25000, 35000, 38000],
    'Other Materials': [0, 0, 0, 3000, 3000, 3000],
    'Closing Inventory': [-147500, -227100, -212400, -270000, -290000, -270000],
    'Direct Labour Wages': [80800, 100400, 120900, 150000, 158000, 166000],
    'Repairs & Maint.': [4800, 1000, 1700, 2500, 3000, 3000],
    'Services / Utilities': [6400, 6100, 6800, 7000, 8000, 9000],
    'Depreciation (COGS)': [20200, 12200, 10700, 12000, 13000, 14000],
    'Overhead': [18400, 21200, 28800, 32000, 35000, 37000],
    'Other COGS': [12000, 19200, 26300, 33000, 36000, 39000]
  },
  salesExpenses: {
    'Selling Salaries': [38200, 46900, 52400, 58500, 60000, 63000],
    'Traveling': [0, 0, 0, 0, 0, 0],
    'Advertising': [9800, 3500, 4800, 6600, 7500, 12000],
    'Shipping & Delivery': [27400, 22400, 27100, 32800, 35000, 38000],
    'Depreciation (Sales)': [0, 0, 0, 0, 0, 0],
    'Other Sales Exp.': [8000, 6000, 6900, 7000, 8500, 9500]
  },
  adminExpenses: {
    'Management Salaries': [32000, 30000, 35000, 38000, 42000, 45000],
    'Office Salaries': [34400, 38100, 41400, 44000, 46000, 48000],
    'Professional Fees': [9900, 4300, 4900, 5200, 5700, 6300],
    'Telecommunication': [7000, 9300, 9100, 9300, 8500, 9500],
    'Office Expenses': [12600, 13700, 17100, 19200, 22500, 24000],
    'Insurance & Taxes': [0, 0, 0, 0, 0, 0],
    'Bank Charges': [14300, 18500, 16100, 17500, 18500, 17000],
    'Interest on L.T.D.': [29500, 27700, 22600, 20000, 18000, 16000],
    'Bad Debts': [8700, 2700, 4200, 5000, 6000, 8000],
    'Research & Dev.': [0, 0, 0, 0, 25000, 0]
  },
  assets: {
    'Cash': [2800, 3100, 5100],
    'Accounts Receivable': [127600, 140400, 145400],
    'Inventory': [1300, 1400, 6400],
    'Prepaid Expenses': [147600, 162400, 167400],
    'Other Current Assets': [2300, 2500, 7500],
    'Land': [248600, 273500, 278500],
    'Building': [15800, 0, 85500],
    'Furniture & Fixtures': [0, 17400, 17400],
    'Equipment & Machinery': [19800, 21800, 26800],
    'Other Fixed Assets': [15000, 16500, 215000],
    'Research & Dev. Asset': [2100, 2300, 5300]
  },
  liabilities: {
    'Bank Loan': [110000, 160000, 165000],
    'Accounts Payable': [69200, 76100, 36100],
    'Accruals': [9200, 10100, 25100],
    'Current Portion of L.T.D.': [32900, 36200, 45200],
    'Income Taxes Payable': [2700, 3000, 8000],
    'Term Debt': [196600, 216300, 245300],
    'Shareholders Advances': [64100, 70500, 9000],
    'Other Non-Current': [0, 0, 50400],
    'Common Shares': [60000, 66000, 89000],
    'Retained Earnings': [38200, 3100, 45200]
  },
  personal: {
    name: "Abraham Lincoln",
    salary: 500000,
    assets: {
      'Cash': 6000,
      'RRSP': 85000,
      'Life Insurance': 500000,
      'Real Estate': 230000,
      'Automobiles': 32000,
      'Stocks/Bonds': 8000,
      'Household/Personal': 5000
    },
    liabilities: {
      'Bank Loans': 25000,
      'Credit Cards': 2500,
      'Mortgages': 180000
    }
  }
};

const ProFinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(INITIAL_DATA);
  const [isExporting, setIsExporting] = useState(false);

  const COLORS = {
    dark: '#1B1C36',
    light: '#f8fafc',
    accent: '#B5945B',
    blue: '#2563eb',
    green: '#10b981',
    purple: '#8b5cf6',
    red: '#ef4444',
    gray: '#64748b'
  };

  // --- Calculations ---
  const calc = useMemo(() => {
    const years = data.years;
    
    // Income Statement Calcs
    const pnl = years.map((_, i) => {
      const sales = Object.values(data.sales).reduce((sum, v) => sum + (Number(v[i]) || 0), 0);
      const cogs = Object.values(data.cogs).reduce((sum, v) => sum + (Number(v[i]) || 0), 0);
      const gp = sales - cogs;
      const salesExp = Object.values(data.salesExpenses).reduce((sum, v) => sum + (Number(v[i]) || 0), 0);
      const adminExp = Object.values(data.adminExpenses).reduce((sum, v) => sum + (Number(v[i]) || 0), 0);
      const totalExp = salesExp + adminExp;
      const netProfit = gp - totalExp;
      const margin = sales > 0 ? (gp / sales) * 100 : 0;
      const netMargin = sales > 0 ? (netProfit / sales) * 100 : 0;
      return { year: years[i], sales, cogs, gp, totalExp, netProfit, margin, netMargin };
    });

    // Balance Sheet Calcs
    const bsYears = ['2028', '2029', '2030'];
    const bs = bsYears.map((_, i) => {
      const currentAssets = data.assets['Cash'][i] + data.assets['Accounts Receivable'][i] + data.assets['Inventory'][i] + data.assets['Prepaid Expenses'][i] + data.assets['Other Current Assets'][i];
      const fixedAssets = data.assets['Land'][i] + data.assets['Building'][i] + data.assets['Furniture & Fixtures'][i] + data.assets['Equipment & Machinery'][i] + data.assets['Other Fixed Assets'][i] + data.assets['Research & Dev. Asset'][i];
      const totalAssets = currentAssets + fixedAssets;

      const currentLiab = data.liabilities['Bank Loan'][i] + data.liabilities['Accounts Payable'][i] + data.liabilities['Accruals'][i] + data.liabilities['Current Portion of L.T.D.'][i] + data.liabilities['Income Taxes Payable'][i];
      const longTermLiab = data.liabilities['Term Debt'][i] + data.liabilities['Shareholders Advances'][i] + data.liabilities['Other Non-Current'][i];
      const equity = data.liabilities['Common Shares'][i] + data.liabilities['Retained Earnings'][i];
      const totalLiabEq = currentLiab + longTermLiab + equity;

      return {
        year: bsYears[i],
        currentAssets, fixedAssets, totalAssets,
        currentLiab, longTermLiab, equity, totalLiabEq,
        currentRatio: currentLiab > 0 ? currentAssets / currentLiab : 0,
        debtEquity: equity > 0 ? (currentLiab + longTermLiab) / equity : 0
      };
    });

    // Personal Calcs
    const personalAssets = Object.values(data.personal.assets).reduce((a, b) => a + b, 0);
    const personalLiab = Object.values(data.personal.liabilities).reduce((a, b) => a + b, 0);
    const netWorth = personalAssets - personalLiab;

    return { pnl, bs, personalAssets, personalLiab, netWorth };
  }, [data]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const handleDownloadPDF = () => {
    if (typeof window === 'undefined') return;
    if (!window.html2pdf) {
      const script = document.querySelector('script[src*="html2pdf"]');
      if (script) alert("Thư viện PDF đang được tải, vui lòng thử lại sau vài giây.");
      else alert("Không tìm thấy thư viện PDF. Vui lòng kiểm tra kết nối mạng.");
      return;
    }
    setIsExporting(true);
    const titleMap = { 'dashboard': 'Dashboard', 'income': 'PNL', 'balance': 'Balance_Sheet', 'personal': 'Personal' };
    const fileName = `Axiom_${titleMap[activeTab] || 'Report'}_${new Date().toISOString().split('T')[0]}.pdf`;
    const element = document.getElementById('pro-financial-report');
    const opt = {
      margin: [10, 10], filename: fileName, image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollX: 0, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    window.html2pdf().set(opt).from(element).save().then(() => setIsExporting(false)).catch(err => {
      console.error(err); setIsExporting(false); alert("Lỗi khi xuất PDF.");
    });
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* 1. Executive Summary & Download */}
      <div className="flex flex-col gap-4 w-full">
        <div style={{ padding: '24px 32px', background: '#1B1C36', color: '#E8E4D8', borderRadius: '16px' }}>
          <h3 style={{ color: '#B5945B', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            EXECUTIVE FINANCIAL INSIGHT
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#E8E4D8', margin: 0 }}>
            The company demonstrates strong revenue growth, primarily driven by <strong>French doors</strong>. 
            The current ratio of <strong>{calc.bs[2].currentRatio.toFixed(2)}</strong> indicates a healthy liquidity position.
            Personal guarantees are backed by a strong net worth of <strong>{formatCurrency(calc.netWorth)}</strong>.
            Strategic focus should remain on maintaining the current growth trajectory while optimizing operational overhead.
          </p>
        </div>
        
        <div className="flex justify-start">
          <button 
            onClick={handleDownloadPDF} 
            disabled={isExporting} 
            style={{ 
              background: '#B5945B', color: '#1B1C36', fontWeight: '700', 
              padding: '12px 24px', borderRadius: '12px', border: 'none',
              display: 'flex', alignItems: 'center', gap: '8px', cursor: isExporting ? 'not-allowed' : 'pointer'
            }}
          >
            <Download size={18} /> 
            <span>{isExporting ? 'Exporting...' : 'Download Appendix'}</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Result Cards - 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CompactKpiCard 
          label="Estimated Revenue (2031)" 
          value={formatCurrency(calc.pnl[5].sales)} 
          icon={<TrendingUp size={20} color="#B5945B" />} 
          trend={`${((calc.pnl[5].sales/calc.pnl[0].sales - 1)*100).toFixed(1)}% total growth`}
        />
        <CompactKpiCard 
          label="Gross Profit Margin" 
          value={`${calc.pnl[5].margin.toFixed(1)}%`} 
          icon={<Percent size={20} color="#B5945B" />} 
          trend={`$${(calc.pnl[5].gp/1000).toFixed(0)}k gross yield`}
        />
        <CompactKpiCard 
          label="Net Profit (2031)" 
          value={formatCurrency(calc.pnl[5].netProfit)} 
          icon={<DollarSign size={20} color="#B5945B" />} 
          trend={`${calc.pnl[5].netMargin.toFixed(1)}% net margin`}
        />
        <CompactKpiCard 
          label="Liquidity Ratio" 
          value={calc.bs[2].currentRatio.toFixed(2)} 
          icon={<Activity size={20} color="#B5945B" />} 
          trend="Current assets / liabilities"
        />
        <CompactKpiCard 
          label="Solvency (D/E)" 
          value={calc.bs[2].debtEquity.toFixed(2)} 
          icon={<Scale size={20} color="#B5945B" />} 
          trend="Total debt / Equity"
        />
        <CompactKpiCard 
          label="Personal Net Worth" 
          value={formatCurrency(calc.netWorth)} 
          icon={<Users size={20} color="#B5945B" />} 
          trend="Director's backing"
        />
      </div>

      {/* 3. Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartContainer title="Revenue & Net Profit Projection">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={calc.pnl}>
              <defs>
                <linearGradient id="colorRevPro" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B5945B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#B5945B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Area type="monotone" dataKey="sales" stroke="#B5945B" strokeWidth={3} fillOpacity={1} fill="url(#colorRevPro)" name="Revenue" />
              <Area type="monotone" dataKey="netProfit" stroke="#1B1C36" strokeWidth={2} fill="transparent" name="Net Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Balance Sheet Structure (Assets vs Liab)">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={calc.bs} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
              <YAxis dataKey="year" type="category" tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="totalAssets" fill="#B5945B" name="Total Assets" radius={[0, 4, 4, 0]} />
              <Bar dataKey="totalLiabEq" fill="#1B1C36" name="Liab + Equity" radius={[0, 4, 4, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );

  // Helper components
  const CompactKpiCard = ({ label, value, icon, trend }) => (
    <div className="contact-form-box" style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '16px', background: '#FFF' }}>
      <div style={{ width: '48px', height: '48px', background: 'rgba(181, 148, 91, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#999', fontWeight: '800', marginBottom: '4px', letterSpacing: '0.5px' }}>{label}</p>
        <h4 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#1B1C36', margin: 0, letterSpacing: '-0.5px' }}>{value}</h4>
        <p style={{ fontSize: '0.7rem', color: '#B5945B', fontWeight: '700', marginTop: '2px' }}>{trend}</p>
      </div>
    </div>
  );

  const updatePersonalValue = (type, key, value) => {
    const cleanValue = String(value).replace(/[^\d.-]/g, '');
    const numValue = cleanValue === '' || cleanValue === '-' ? 0 : Number(cleanValue);
    setData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [type]: {
          ...prev.personal[type],
          [key]: numValue
        }
      }
    }));
  };

  const renderPersonalStatus = () => (
    <div className="contact-form-box p-12 bg-white border border-[#B5945B]/30 animate-in fade-in duration-500">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px' }}>
        
        {/* Col 1: Personal Info & Assets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p className="input-header">Director & Assets</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div className="flex flex-col gap-4">
              <label className="text-[0.85rem] font-black uppercase tracking-widest text-[#B5945B] pl-1">Annual Salary</label>
              <input 
                type="text" value={formatInputDisplay(data.personal.salary)}
                onChange={(e) => {
                  const cleanValue = e.target.value.replace(/[^\d.-]/g, '');
                  setData(prev => ({...prev, personal: {...prev.personal, salary: cleanValue === '' ? 0 : Number(cleanValue)}}));
                }}
                style={{ width: '100%', padding: '12px 16px', fontSize: '1rem', fontWeight: '600', background: '#F9F9F9', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', textAlign: 'right', color: '#1B1C36', outline: 'none' }}
              />
            </div>
            {Object.entries(data.personal.assets).map(([k, v]) => (
              <div key={k} className="flex flex-col gap-4">
                <label className="text-[0.85rem] font-black uppercase tracking-widest text-slate-400 pl-1">{k}</label>
                <input 
                  type="text" value={formatInputDisplay(v)}
                  onChange={(e) => updatePersonalValue('assets', k, e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', fontSize: '1rem', fontWeight: '600', background: '#F9F9F9', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', textAlign: 'right', color: '#1B1C36', outline: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Liabilities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p className="input-header" style={{ borderLeftColor: '#ef4444', color: '#ef4444' }}>Liabilities</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {Object.entries(data.personal.liabilities).map(([k, v]) => (
              <div key={k} className="flex flex-col gap-4">
                <label className="text-[0.85rem] font-black uppercase tracking-widest text-red-300 pl-1">{k}</label>
                <input 
                  type="text" value={formatInputDisplay(v)}
                  onChange={(e) => updatePersonalValue('liabilities', k, e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', fontSize: '1rem', fontWeight: '600', background: '#F9F9F9', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', textAlign: 'right', color: '#1B1C36', outline: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Financial Backing Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p className="input-header">Executive Summary</p>
          <div className="bg-[#1B1C36] p-12 rounded-3xl border-2 border-[#B5945B] shadow-xl h-full flex flex-col justify-center">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-[#B5945B]/20 rounded-full flex items-center justify-center">
                  <Activity size={20} className="text-[#B5945B]" />
                </div>
                <span className="text-[#B5945B] text-xs font-black uppercase tracking-[0.25em]">Personal Backing</span>
              </div>
              <span className="text-white/50 text-[0.7rem] font-black uppercase tracking-[0.2em] block mb-2">Total Net Worth</span>
              <h2 className="text-5xl font-black text-white">{formatCurrency(calc.netWorth)}</h2>
            </div>
            <div className="pt-10 border-t border-white/10 flex flex-col gap-8">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-white/40 text-[0.65rem] font-black uppercase tracking-widest block mb-1">Total Assets</span>
                  <span className="text-white text-xl font-bold">{formatCurrency(calc.personalAssets)}</span>
                </div>
                <ArrowUpRight size={24} className="text-green-400 mb-1" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-white/40 text-[0.65rem] font-black uppercase tracking-widest block mb-1">Total Liabilities</span>
                  <span className="text-white text-xl font-bold">{formatCurrency(calc.personalLiab)}</span>
                </div>
                <ArrowDownRight size={24} className="text-red-400 mb-1" />
              </div>
            </div>
          </div>
        </div>

      </div>
      <style jsx>{`
        .input-header { font-size: 0.95rem; font-weight: 950; color: #B5945B; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 20px; padding-left: 15px; border-left: 5px solid #B5945B; line-height: 1.2; display: flex; align-items: center; min-height: 2rem; }
      `}</style>
    </div>
  );

  const renderTableData = (category, title, yearsList) => (
    <div className="mb-10">
      <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(181, 148, 91, 0.2)', marginBottom: '15px' }}></div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left" style={{ tableLayout: 'fixed', minWidth: '900px' }}>
          <thead>
            <tr>
              <th style={{ width: '25%', paddingBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{title}</span>
              </th>
              {yearsList.map(y => (
                <th key={y} style={{ paddingBottom: '12px', textAlign: 'center', fontSize: '0.9rem', color: '#1B1C36', fontWeight: '800' }}>{y}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(data[category]).map(([name, vals]) => (
              <tr key={name}>
                <td style={{ padding: '12px 0', fontSize: '1rem', fontWeight: '400', color: '#666666', width: '25%' }}>{name}</td>
                {vals.map((v, i) => (
                  <td key={i} style={{ padding: '6px 4px' }}>
                    <input 
                      type="text" value={formatInputDisplay(v)} 
                      onChange={(e) => {
                        const cleanValue = e.target.value.replace(/[^\d.-]/g, '');
                        const numValue = cleanValue === '' || cleanValue === '-' ? 0 : Number(cleanValue);
                        setData(prev => {
                          const newData = JSON.parse(JSON.stringify(prev));
                          newData[category][name][i] = numValue;
                          return newData;
                        });
                      }} 
                      style={{ width: '100%', padding: '8px 12px', fontSize: '0.95rem', fontWeight: '500', background: '#F9F9F9', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', textAlign: 'right', color: '#1B1C36', outline: 'none' }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="w-full axiom-finance-hub" style={{ color: '#1B1C36', fontFamily: "Aptos, 'Segoe UI', 'Helvetica Neue', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'income', label: 'Income Statement', icon: FileText },
            { id: 'balance', label: 'Balance Sheet', icon: CreditCard },
            { id: 'personal', label: 'Personal Status', icon: Users }
          ].map(tab => (
            <button
              key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', borderRadius: '14px',
                fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s ease',
                background: activeTab === tab.id ? '#B5945B' : '#FFFFFF',
                color: activeTab === tab.id ? '#1B1C36' : '#666666',
                border: activeTab === tab.id ? '1.5px solid #B5945B' : '1.5px solid rgba(0,0,0,0.05)',
                boxShadow: activeTab === tab.id ? '0 4px 14px rgba(181, 148, 91, 0.25)' : '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        <div id="pro-financial-report" className="animate-in fade-in duration-500">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'income' && <div className="contact-form-box p-8 bg-white border border-[#B5945B]/30">
            {renderTableData('sales', 'Sales Activities', data.years)}
            {renderTableData('cogs', 'Cost of Sales (Direct)', data.years)}
            {renderTableData('salesExpenses', 'Sales Expenses', data.years)}
            {renderTableData('adminExpenses', 'Operating Expenses', data.years)}
          </div>}
          {activeTab === 'balance' && <div className="contact-form-box p-8 bg-white border border-[#B5945B]/30">
            {renderTableData('assets', 'Assets', ['2028', '2029', '2030'])}
            {renderTableData('liabilities', 'Liabilities & Equity', ['2028', '2029', '2030'])}
          </div>}
          {activeTab === 'personal' && renderPersonalStatus()}
        </div>
      </div>
    </div>
  );
};

const ChartContainer = ({ title, children }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
    <h3 className="text-lg font-black text-[#1B1C36] mb-8 uppercase tracking-tight" style={{ borderLeft: '4px solid #B5945B', paddingLeft: '15px' }}>{title}</h3>
    {children}
  </div>
);

const formatInputDisplay = (val) => {
  if (val === 0 || val === '0') return '0';
  if (!val) return '';
  return new Intl.NumberFormat('en-US').format(val);
};

export default ProFinancialDashboard;
