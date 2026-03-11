'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, Wallet, PieChart, BarChart3, Users, 
  Target, ArrowUpRight, ArrowDownRight, 
  Save, Download, Info, LayoutDashboard,
  Calendar, Building, FileText, Activity, CreditCard, ChevronDown, ChevronUp
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
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
      const margin = sales > 0 ? (netProfit / sales) * 100 : 0;
      return { year: years[i], sales, cogs, gp, totalExp, netProfit, margin };
    });

    // Balance Sheet Calcs (Last 3 years: 2028, 2029, 2030 mapped to indices 2, 3, 4 of the main data arrays for visual sync)
    // Wait, the BS initial data arrays only have 3 elements. Let's map them properly to 2028-2030.
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

  const updateArrayValue = (category, item, index, newValue) => {
    // Remove non-numeric characters except minus sign
    const cleanValue = String(newValue).replace(/[^\d.-]/g, '');
    const numValue = cleanValue === '' || cleanValue === '-' ? 0 : Number(cleanValue);
    
    setData(prev => {
      const newData = { ...prev };
      newData[category][item][index] = numValue;
      return newData;
    });
  };

  // Format number for display with commas
  const formatInputDisplay = (val) => {
    if (val === 0 || val === '0') return '0';
    if (!val) return '';
    return new Intl.NumberFormat('en-US').format(val);
  };

  const handleDownloadPDF = () => {
    if (typeof window === 'undefined') return;
    
    // Check if html2pdf is available, if not, try to load it or notify user
    if (!window.html2pdf) {
      alert("PDF library not loaded. Please ensure you have internet connection.");
      return;
    }

    setIsExporting(true);
    console.log("Exporting PDF version 1.0.1...");
    const element = document.getElementById('pro-financial-report');
    const opt = {
      margin: 10,
      filename: `Financial_Appendix_${activeTab}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    window.html2pdf().set(opt).from(element).save().then(() => setIsExporting(false));
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard title="Projected Revenue" value={formatCurrency(calc.pnl[5].sales)} trend="+10%" icon={<BarChart3 />} />
        <KpiCard title="Projected Net Income" value={formatCurrency(calc.pnl[5].netProfit)} trend="Stable" icon={<Wallet />} />
        <KpiCard title="Current Ratio" value={calc.bs[2].currentRatio.toFixed(2)} trend="Healthy" icon={<Activity />} />
        <KpiCard title="Personal Net Worth" value={formatCurrency(calc.netWorth)} trend="Strong" icon={<Users />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartContainer title="Revenue & Net Profit Projection">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={calc.pnl}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Area type="monotone" dataKey="sales" stroke={COLORS.blue} fillOpacity={0.1} fill={COLORS.blue} name="Revenue" />
              <Area type="monotone" dataKey="netProfit" stroke={COLORS.green} fillOpacity={0.1} fill={COLORS.green} name="Net Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Balance Sheet Structure">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={calc.bs} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
              <YAxis dataKey="year" type="category" tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="totalAssets" fill={COLORS.blue} name="Total Assets" />
              <Bar dataKey="totalLiabEq" fill={COLORS.purple} name="Liab + Equity" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Expert Financial Insight / Executive Summary */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-grow contact-info-box" style={{ padding: '30px', background: '#1B1C36', color: '#E8E4D8', borderRadius: '24px' }}>
          <div className="flex items-center gap-3 mb-4">
            <Info size={20} color="#B5945B" />
            <h3 style={{ color: '#B5945B', fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0 }}>
              EXECUTIVE FINANCIAL INSIGHT
            </h3>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.7', opacity: '0.95', color: '#E8E4D8' }}>
            The company demonstrates strong revenue growth, primarily driven by <strong>French doors</strong>. 
            The debt-to-equity ratio of <strong>{calc.bs[2].debtEquity.toFixed(2)}</strong> indicates a leveraged but manageable position.
            Personal guarantees are backed by a strong net worth of <strong>{formatCurrency(calc.netWorth)}</strong>.
            Strategic focus should remain on maintaining the current growth trajectory while optimizing operational overhead.
          </p>
        </div>
        
        <div className="flex items-center justify-center">
          <button 
            onClick={handleDownloadPDF} 
            disabled={isExporting} 
            className="group"
            style={{ 
              background: '#B5945B', 
              color: '#1B1C36', 
              fontWeight: '800', 
              padding: '24px 40px', 
              borderRadius: '20px', 
              border: 'none',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1rem',
              cursor: isExporting ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 25px rgba(181, 148, 91, 0.2)'
            }}
          >
            <Download size={20} /> 
            <span>{isExporting ? 'Exporting...' : 'Download Appendix'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTableData = (category, title, yearsList, sectionKey) => {
    return (
      <div className="mb-10">
        {/* Separator line ABOVE the entire table group */}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(181, 148, 91, 0.2)', marginBottom: '15px' }}></div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left" style={{ tableLayout: 'fixed', minWidth: '900px' }}>
            <thead>
              <tr>
                <th style={{ width: '25%', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    {title}
                  </span>
                </th>
                {yearsList.map(y => (
                  <th key={y} style={{ paddingBottom: '12px', textAlign: 'center', fontSize: '0.9rem', color: '#1B1C36', fontWeight: '800' }}>
                    {y}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(data[category]).map(([name, vals], rowIndex) => (
                <tr key={name}>
                  <td style={{ padding: '12px 0', fontSize: '1rem', fontWeight: '400', color: '#666666', width: '25%', letterSpacing: '0.2px' }}>
                    {name}
                  </td>
                  {vals.map((v, i) => (
                    <td key={i} style={{ padding: '6px 4px' }}>
                      <input 
                        type="text" 
                        value={formatInputDisplay(v)} 
                        onFocus={(e) => { e.target.value = v; }}
                        onBlur={(e) => { e.target.value = formatInputDisplay(v); }}
                        onChange={(e) => updateArrayValue(category, name, i, e.target.value)} 
                        style={{ width: '100%', padding: '8px 12px', fontSize: '0.95rem', fontWeight: '500', background: '#F9F9F9', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', textAlign: 'right', color: '#1B1C36', outline: 'none', fontFamily: 'inherit' }}
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
  };

  const renderIncomeStatement = () => (
    <div className="max-w-7xl mx-auto">
      <div className="contact-form-box mb-8" style={{ padding: '30px', overflow: 'hidden', border: '1px solid rgba(181, 148, 91, 0.3)', background: '#FFF' }}>
        {renderTableData('sales', 'Sales Activities', data.years, 'sales')}
        {renderTableData('cogs', 'Cost of Sales (Direct)', data.years, 'cogs')}
        {renderTableData('salesExpenses', 'Sales Expenses', data.years, 'salesExpenses')}
        {renderTableData('adminExpenses', 'Operating Expenses', data.years, 'adminExpenses')}
      </div>
    </div>
  );

  const renderBalanceSheet = () => (
    <div className="max-w-7xl mx-auto">
      <div className="contact-form-box mb-8" style={{ padding: '30px', overflow: 'hidden', border: '1px solid rgba(181, 148, 91, 0.3)', background: '#FFF' }}>
        {renderTableData('assets', 'Assets', ['2028', '2029', '2030'], 'assets')}
        {renderTableData('liabilities', 'Liabilities & Equity', ['2028', '2029', '2030'], 'liabilities')}
      </div>
    </div>
  );

  const renderPersonal = () => (
    <div className="max-w-7xl mx-auto">
      <div className="contact-form-box mb-8" style={{ padding: '30px', overflow: 'hidden', border: '1px solid rgba(181, 148, 91, 0.3)', background: '#FFF' }}>
        
        {/* Table-style Layout for Personal Status with Full Width Distribution */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left" style={{ tableLayout: 'fixed', minWidth: '1000px' }}>
            <thead>
              <tr>
                <th style={{ width: '20%', paddingBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B5945B', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    Personal Status
                  </span>
                </th>
                <th style={{ width: '15%', paddingBottom: '20px', textAlign: 'center', fontSize: '0.95rem', color: '#1B1C36', fontWeight: '800' }}>Director Info</th>
                <th style={{ width: '25%', paddingBottom: '20px', textAlign: 'center', fontSize: '0.95rem', color: '#1B1C36', fontWeight: '800' }}>Personal Assets</th>
                <th style={{ width: '25%', paddingBottom: '20px', textAlign: 'center', fontSize: '0.95rem', color: '#1B1C36', fontWeight: '800' }}>Personal Liabilities</th>
                <th style={{ width: '15%', paddingBottom: '20px', textAlign: 'center', fontSize: '0.95rem', color: '#1B1C36', fontWeight: '800' }}>Summary</th>
              </tr>
            </thead>
            <tbody>
              
              {/* Row 1: Liquid Assets */}
              <tr className="group transition-colors hover:bg-black/[0.02] border-t border-black/5">
                <td style={{ padding: '20px 0', fontSize: '1rem', fontWeight: '400', color: '#666666', letterSpacing: '0.2px', verticalAlign: 'top' }}>
                  Liquid Assets & Short-term
                </td>
                <td className="px-6 py-5 align-top text-left border-l border-black/5">
                  <div className="flex flex-col items-start">
                    <span className="text-[1.05rem] font-bold text-[#1B1C36]">{data.personal.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 align-top border-l border-black/5 text-left">
                  <div className="flex flex-col items-start w-full">
                    <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Cash</span>
                    <span className="font-bold text-[#1B1C36] text-[1.05rem]">&nbsp;${formatInputDisplay(data.personal.assets.Cash)}</span>
                  </div>
                </td>
                <td className="px-8 py-5 align-top border-l border-black/5 text-left">
                  <div className="flex flex-col items-start w-full">
                    <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Credit Cards</span>
                    <span className="font-bold text-[#1B1C36] text-[1.05rem]">&nbsp;${formatInputDisplay(data.personal.liabilities['Credit Cards'])}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-left border-l border-black/5 bg-[#F9F9F9]/50">
                  <div className="flex flex-col items-start">
                    <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Total Assets</span>
                    <span className="text-[1.1rem] font-bold text-[#1B1C36]">&nbsp;{formatCurrency(calc.personalAssets)}</span>
                  </div>
                </td>
              </tr>

              {/* Row 2: Investments & Loans */}
              <tr className="group transition-colors hover:bg-black/[0.02] border-t border-black/5">
                <td style={{ padding: '20px 0', fontSize: '1rem', fontWeight: '400', color: '#666666', letterSpacing: '0.2px', verticalAlign: 'top' }}>
                  Investments & Loans
                </td>
                <td className="px-6 py-5 align-top text-left border-l border-black/5">
                  <div className="flex flex-col items-start">
                    <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Annual Salary</span>
                    <span className="text-[1.05rem] font-bold text-[#1B1C36]">{formatCurrency(data.personal.salary)}</span>
                  </div>
                </td>
                <td className="px-8 py-5 align-top border-l border-black/5">
                  <div className="flex flex-col gap-6 w-full text-left">
                    <div className="flex flex-col items-start">
                      <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">RRSP</span>
                      <span className="font-bold text-[#1B1C36] text-[1.05rem]">&nbsp;${formatInputDisplay(data.personal.assets.RRSP)}</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Stocks/Bonds</span>
                      <span className="font-bold text-[#1B1C36] text-[1.05rem]">&nbsp;${formatInputDisplay(data.personal.assets['Stocks/Bonds'])}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 align-top border-l border-black/5 text-left">
                  <div className="flex flex-col items-start w-full">
                    <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Bank Loans</span>
                    <span className="font-bold text-[#1B1C36] text-[1.05rem]">&nbsp;${formatInputDisplay(data.personal.liabilities['Bank Loans'])}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-left border-l border-black/5 bg-[#F9F9F9]/50 align-top">
                  <div className="flex flex-col items-start">
                    <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Total Liabilities</span>
                    <span className="text-[1.1rem] font-bold text-[#1B1C36]">&nbsp;{formatCurrency(calc.personalLiab)}</span>
                  </div>
                </td>
              </tr>

              {/* Row 3: Fixed Assets */}
              <tr className="group transition-colors hover:bg-black/[0.02] border-t border-black/5">
                <td style={{ padding: '20px 0', fontSize: '1rem', fontWeight: '400', color: '#666666', letterSpacing: '0.2px', borderBottom: 'none', verticalAlign: 'top' }}>
                  Fixed Assets & Mortgages
                </td>
                <td className="px-6 py-5 border-l border-black/5"></td>
                <td className="px-8 py-5 border-l border-black/5 text-left">
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col items-start">
                      <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Real Estate</span>
                      <span className="font-bold text-[#1B1C36] text-[1.05rem]">&nbsp;${formatInputDisplay(data.personal.assets['Real Estate'])}</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Automobiles</span>
                      <span className="font-bold text-[#1B1C36] text-[1.05rem]">&nbsp;${formatInputDisplay(data.personal.assets.Automobiles)}</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Household/Personal</span>
                      <span className="font-bold text-[#1B1C36] text-[1.05rem]">&nbsp;${formatInputDisplay(data.personal.assets['Household/Personal'])}</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Life Insurance</span>
                      <span className="font-bold text-[#1B1C36] text-[1.05rem]">&nbsp;${formatInputDisplay(data.personal.assets['Life Insurance'])}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 align-top border-l border-black/5 text-left">
                  <div className="flex flex-col items-start w-full">
                    <span className="text-[1rem] text-[#1B1C36] font-medium mb-1">Mortgages</span>
                    <span className="font-bold text-[#1B1C36] text-[1.05rem]">&nbsp;${formatInputDisplay(data.personal.liabilities.Mortgages)}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-left border-l border-black/5 align-bottom">
                  <div className="pt-4 border-t border-[var(--color-accent)]/30 mt-auto flex flex-col items-start">
                    <span className="text-[1.1rem] text-[#1B1C36] font-medium mb-1 uppercase">NET WORTH</span>
                    <span className="text-[1.25rem] font-bold text-[#1B1C36]">&nbsp;{formatCurrency(calc.netWorth)}</span>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full font-sans axiom-finance-hub" style={{ color: '#1B1C36', fontFamily: "Aptos, 'Segoe UI', 'Helvetica Neue', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'income', label: 'Income Statement', icon: FileText },
            { id: 'balance', label: 'Balance Sheet', icon: CreditCard },
            { id: 'personal', label: 'Personal Status', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', 
                padding: '14px 28px', borderRadius: '14px',
                fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', 
                transition: 'all 0.3s ease',
                background: activeTab === tab.id ? '#B5945B' : '#FFFFFF',
                color: activeTab === tab.id ? '#1B1C36' : '#666666',
                border: activeTab === tab.id ? '1.5px solid #B5945B' : '1.5px solid rgba(0,0,0,0.05)',
                boxShadow: activeTab === tab.id ? '0 4px 14px rgba(181, 148, 91, 0.25)' : '0 2px 8px rgba(0,0,0,0.02)',
                whiteSpace: 'nowrap'
              }}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div id="pro-financial-report" className="animate-in fade-in duration-500">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'income' && renderIncomeStatement()}
          {activeTab === 'balance' && renderBalanceSheet()}
          {activeTab === 'personal' && renderPersonal()}
        </div>

      </div>
    </div>
  );
};

const KpiCard = ({ title, value, trend, icon }) => (
  <div className="bg-[#1B1C36] p-6 rounded-[32px] flex items-center gap-6 transition-all hover:translate-y-[-4px] hover:shadow-xl shadow-lg border border-white/5">
    <div className="text-[#B5945B] shrink-0 bg-white/5 p-4 rounded-2xl">
      {React.cloneElement(icon, { size: 32, strokeWidth: 1.5 })}
    </div>
    <div className="flex flex-col items-start text-left">
      <h4 className="text-white/60 text-[0.85rem] font-bold mb-1 tracking-tight uppercase">{title}</h4>
      <p className="text-[#B5945B] text-[1.5rem] font-black m-0 leading-tight mb-2">{value}</p>
      {trend && (
        <span className={`text-[0.7rem] font-bold px-2 py-0.5 rounded-full ${
          trend.includes('+') || trend === 'Strong' || trend === 'Healthy' 
            ? 'bg-emerald-500/10 text-emerald-400' 
            : 'bg-blue-500/10 text-blue-400'
        }`}>
          {trend}
        </span>
      )}
    </div>
  </div>
);

const ChartContainer = ({ title, children }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
    <h3 className="text-lg font-bold text-slate-800 mb-6">{title}</h3>
    {children}
  </div>
);

export default ProFinancialDashboard;