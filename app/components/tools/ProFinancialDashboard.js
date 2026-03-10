'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, Wallet, PieChart, BarChart3, Users, 
  Target, ArrowUpRight, ArrowDownRight, 
  Save, Download, Info, LayoutDashboard,
  Calendar, Building, FileText, Activity, CreditCard
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, Cell, Pie
} from 'recharts';

const INITIAL_DATA = {
  company: {
    name: "Doors To The World, Inc.",
    tradingName: "Doors To The World, Inc.",
    address: "2020 Sommerhill Drive Suite 203 New Barton, ON N2O 1T1",
    phone: "(514) 555-2020",
    email: "info@doorstotheworld.com",
    form: "Corporation",
    naicsCode: "321911",
    exportPercent: 10
  },
  years: ['2012', '2013', '2014', '2015', '2016', '2017'],
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
    name: "Johnathan W. Wright",
    salary: 58000,
    spouseSalary: 67000,
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

    // Balance Sheet Calcs (Last 3 years: 2014, 2015, 2016 mapped to indices 0, 1, 2)
    const bsYears = ['2014', '2015', '2016'];
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
    setData(prev => {
      const newData = { ...prev };
      newData[category][item][index] = Number(newValue);
      return newData;
    });
  };

  const handleDownloadPDF = () => {
    if (typeof window === 'undefined' || !window.html2pdf) return;
    setIsExporting(true);
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
        <KpiCard title="Projected Revenue (2017)" value={formatCurrency(calc.pnl[5].sales)} trend="+10%" icon={<TrendingUp color={COLORS.blue} />} />
        <KpiCard title="Projected Net Income" value={formatCurrency(calc.pnl[5].netProfit)} trend="Stable" icon={<Wallet color={COLORS.green} />} />
        <KpiCard title="Current Ratio (2016)" value={calc.bs[2].currentRatio.toFixed(2)} trend="Healthy" icon={<Activity color={COLORS.purple} />} />
        <KpiCard title="Personal Net Worth" value={formatCurrency(calc.netWorth)} trend="Strong" icon={<Users color={COLORS.accent} />} />
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

        <ChartContainer title="Balance Sheet Structure (2016)">
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

      {/* Ratios & Advice */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row gap-8 items-center justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Info className="text-blue-400" /> Executive Summary</h3>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            The company demonstrates strong revenue growth, primarily driven by <strong>French doors</strong>. 
            The debt-to-equity ratio of <strong>{calc.bs[2].debtEquity.toFixed(2)}</strong> indicates a leveraged but manageable position.
            Personal guarantees are backed by a strong net worth of <strong>{formatCurrency(calc.netWorth)}</strong>.
          </p>
        </div>
        <button onClick={handleDownloadPDF} disabled={isExporting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap">
          <Download size={18} /> {isExporting ? 'Exporting...' : 'Download Full Appendix'}
        </button>
      </div>
    </div>
  );

  const renderTableData = (category, title, yearsList) => (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-8">
      <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 uppercase text-sm tracking-wider">
        {title}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="p-4 font-semibold text-slate-500 w-1/4">Category</th>
              {yearsList.map(y => <th key={y} className="p-4 font-semibold text-slate-500 text-right">{y}</th>)}
            </tr>
          </thead>
          <tbody>
            {Object.entries(data[category]).map(([name, vals]) => (
              <tr key={name} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-700">{name}</td>
                {vals.map((v, i) => (
                  <td key={i} className="p-2">
                    <input type="number" value={v} onChange={(e) => updateArrayValue(category, name, i, e.target.value)} 
                      className="w-full text-right bg-transparent border border-transparent focus:border-blue-300 focus:bg-blue-50 rounded px-2 py-1 outline-none transition-all"
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

  const renderIncomeStatement = () => (
    <div className="space-y-6">
      {renderTableData('sales', '1. Sales Activities', data.years)}
      {renderTableData('cogs', '2. Cost of Sales', data.years)}
      {renderTableData('salesExpenses', '3. Sales Expenses', data.years)}
      {renderTableData('adminExpenses', '4. Admin Expenses', data.years)}
    </div>
  );

  const renderBalanceSheet = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-4">
        * Note: Balance Sheet data covers the last 3 historical/projected years (2014, 2015, 2016).
      </div>
      {renderTableData('assets', 'Assets', ['2014', '2015', '2016'])}
      {renderTableData('liabilities', 'Liabilities & Shareholders Equity', ['2014', '2015', '2016'])}
    </div>
  );

  const renderPersonal = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Director / Backer Info</h3>
          <div className="space-y-4">
            <div><label className="text-xs text-slate-500 uppercase">Name</label><p className="font-medium">{data.personal.name}</p></div>
            <div><label className="text-xs text-slate-500 uppercase">Annual Salary</label><p className="font-medium">{formatCurrency(data.personal.salary)}</p></div>
            <div><label className="text-xs text-slate-500 uppercase">Spouse Salary</label><p className="font-medium">{formatCurrency(data.personal.spouseSalary)}</p></div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-4">Net Worth Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-slate-400">Total Assets</span><span>{formatCurrency(calc.personalAssets)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Total Liabilities</span><span>{formatCurrency(calc.personalLiab)}</span></div>
            <div className="pt-3 mt-3 border-t border-slate-700 flex justify-between font-bold text-xl text-green-400">
              <span>NET WORTH</span><span>{formatCurrency(calc.netWorth)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800">Personal Assets</div>
          <div className="p-4 space-y-3">
            {Object.entries(data.personal.assets).map(([k, v]) => (
              <div key={k} className="flex justify-between items-center">
                <span className="text-sm text-slate-600">{k}</span>
                <span className="font-medium">{formatCurrency(v)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800">Personal Liabilities</div>
          <div className="p-4 space-y-3">
            {Object.entries(data.personal.liabilities).map(([k, v]) => (
              <div key={k} className="flex justify-between items-center">
                <span className="text-sm text-slate-600">{k}</span>
                <span className="font-medium">{formatCurrency(v)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-slate-50 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <Building className="text-blue-600" size={32} />
              Financial Appendix (Pro)
            </h1>
            <p className="text-slate-500 mt-1">{data.company.name} | Professional Grade Financial Modeler</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'income', label: 'Income Statement', icon: FileText },
            { id: 'balance', label: 'Balance Sheet', icon: CreditCard },
            { id: 'personal', label: 'Personal Status', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
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
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="p-4 bg-slate-50 rounded-2xl">{icon}</div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-black text-slate-800 leading-none">{value}</p>
        {trend && <span className="text-xs font-bold text-green-500 mb-1">{trend}</span>}
      </div>
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