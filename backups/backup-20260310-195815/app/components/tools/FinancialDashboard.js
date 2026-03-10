'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, Wallet, PieChart, BarChart3, Users, 
  Target, ShoppingBag, ArrowUpRight, ArrowDownRight, 
  Plus, Minus, Save, Download, Info, Calendar, LayoutDashboard,
  ChevronRight, FileSpreadsheet
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, AreaChart, Area, Cell, Pie
} from 'recharts';

// --- INITIAL DATA STRUCTURE ---
const INITIAL_DATA = {
  years: ['2024', '2025', '2026', '2027', '2028', '2029'],
  sales: {
    'French doors': [571900, 625300, 789000, 863000, 932000, 1007000],
    'Panel doors': [275400, 225000, 218900, 180000, 194000, 210000],
    'Windows': [74100, 83000, 114300, 130000, 140000, 151000],
    'New products': [0, 0, 0, 75000, 94000, 127000],
  },
  cogs: {
    'Material Purchases': [491900, 576900, 611700, 670000, 710000, 778000],
    'Direct Labour': [80800, 100400, 120900, 150000, 158000, 166000],
    'Freight & Duty': [18600, 20300, 22700, 25000, 35000, 38000],
  },
  expenses: {
    'Selling Salaries': [38200, 46900, 52400, 58500, 60000, 63000],
    'Advertising': [9800, 3500, 4800, 6600, 7500, 12000],
    'Management Salaries': [32000, 30000, 35000, 38000, 42000, 45000],
    'Office Expenses': [12600, 13700, 17100, 19200, 22500, 24000],
    'Interest': [29500, 27700, 22600, 20000, 18000, 16000],
  },
  assets: {
    'Cash': 5100,
    'Accounts Receivable': 145400,
    'Inventory': 6400,
    'Land & Building': 364000,
    'Equipment': 26800,
  },
  liabilities: {
    'Accounts Payable': 36100,
    'Bank Loan': 165000,
    'Term Debt': 245300,
    'Shareholders Equity': 184600,
  }
};

const FinancialDashboard = ({ activeTab }) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [isExporting, setIsExporting] = useState(false);

  // Axiom Brand Colors
  const COLORS = {
    dark: '#1B1C36',      // Background
    light: '#E8E4D8',     // Cream
    accent: '#B5945B',    // Gold
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    orange: '#f59e0b'
  };

  const handleDownloadPDF = () => {
    if (typeof window === 'undefined' || !window.html2pdf) return;
    
    setIsExporting(true);
    const element = document.getElementById('financial-report-content');
    const opt = {
      margin: [10, 10],
      filename: `Axiom_Financial_Report_${activeTab}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    window.html2pdf().set(opt).from(element).save().then(() => {
      setIsExporting(false);
    });
  };

  // Styles for replacing Tailwind classes
  const styles = {
    card: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '24px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #f1f5f9',
    },
    grid4: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '32px',
      marginBottom: '32px',
    },
    header: {
      fontSize: '18px',
      fontWeight: '900',
      color: '#0f172a',
      marginBottom: '32px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    input: {
      width: '100%',
      backgroundColor: '#f8fafc',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: 'bold',
      textAlign: 'right',
      outline: 'none',
    }
  };

  // --- Calculations ---
  const calculations = useMemo(() => {
    const years = data.years;
    const yearlyTotals = years.map((_, i) => {
      const totalSales = Object.values(data.sales).reduce((sum, vals) => sum + (Number(vals[i]) || 0), 0);
      const totalCogs = Object.values(data.cogs).reduce((sum, vals) => sum + (Number(vals[i]) || 0), 0);
      const totalExpenses = Object.values(data.expenses).reduce((sum, vals) => sum + (Number(vals[i]) || 0), 0);
      const grossProfit = totalSales - totalCogs;
      const netProfit = grossProfit - totalExpenses;
      
      return {
        year: years[i],
        sales: totalSales,
        cogs: totalCogs,
        expenses: totalExpenses,
        grossProfit,
        netProfit,
        margin: totalSales > 0 ? (netProfit / totalSales) * 100 : 0
      };
    });

    const currentAssets = Number(data.assets.Cash) + Number(data.assets['Accounts Receivable']) + Number(data.assets.Inventory);
    const currentLiabilities = Number(data.liabilities['Accounts Payable']);
    const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;

    return { yearlyTotals, currentRatio };
  }, [data]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(val);

  const updateValue = (category, item, yearIndex, newValue) => {
    setData(prev => {
      const newData = { ...prev };
      const val = Number(newValue);
      newData[category][item][yearIndex] = val;
      return newData;
    });
  };

  if (activeTab === 'dashboard') {
    return (
      <div style={{ paddingBottom: '40px' }} id="financial-report-content">
        {/* KPI Grid */}
        <div style={styles.grid4}>
          <KpiCard 
            title="Revenue Forecast (2029)" 
            value={formatCurrency(calculations.yearlyTotals[5].sales)}
            trend="+12%"
            icon={<TrendingUp color={COLORS.accent} />}
            color="rgba(181, 148, 91, 0.1)"
          />
          <KpiCard 
            title="Projected Net Profit" 
            value={formatCurrency(calculations.yearlyTotals[5].netProfit)}
            trend="+8.5%"
            icon={<Wallet color={COLORS.green} />}
            color="rgba(16, 185, 129, 0.1)"
          />
          <KpiCard 
            title="Current Ratio" 
            value={calculations.currentRatio.toFixed(2)}
            trend="Stable"
            icon={<Target color={COLORS.blue} />}
            color="rgba(59, 130, 246, 0.1)"
          />
          <KpiCard 
            title="Net Profit Margin" 
            value={`${calculations.yearlyTotals[5].margin.toFixed(1)}%`}
            trend="Growing"
            icon={<PieChart color={COLORS.purple} />}
            color="rgba(139, 92, 246, 0.1)"
          />
        </div>

        {/* Charts Row 1 */}
        <div style={styles.grid2}>
          <ChartContainer title="Revenue & Profit Growth" styles={styles} accentColor={COLORS.accent}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={calculations.yearlyTotals}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(val) => formatCurrency(val)}
                />
                <Area type="monotone" dataKey="sales" stroke={COLORS.accent} strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" name="Revenue" />
                <Area type="monotone" dataKey="netProfit" stroke={COLORS.dark} strokeWidth={3} fillOpacity={0} name="Net Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Product Composition (2029)" styles={styles} accentColor={COLORS.dark}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={Object.entries(data.sales).map(([name, vals]) => ({ name, value: vals[5] }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {Object.entries(data.sales).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={[COLORS.accent, COLORS.dark, COLORS.blue, COLORS.purple][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Charts Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <ChartContainer title="Expense Analysis over Years" styles={styles} accentColor={COLORS.accent}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={calculations.yearlyTotals}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="cogs" fill={COLORS.accent} radius={[4, 4, 0, 0]} name="COGS" />
                  <Bar dataKey="expenses" fill={COLORS.dark} radius={[4, 4, 0, 0]} opacity={0.6} name="Operating Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div style={{ backgroundColor: COLORS.dark, borderRadius: '40px', padding: '32px', color: 'white', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             <div style={{ position: 'absolute', top: 0, right: 0, padding: '32px', opacity: 0.1 }}>
              <Target size={120}/>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info color="#60a5fa" /> Expert Insights
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
              <p>• Revenue is expected to grow steadily by 10-15%/year thanks to new product lines.</p>
              <p>• Current ratio of <strong>{calculations.currentRatio.toFixed(2)}</strong> indicates a very healthy financial position.</p>
              <p>• Attention should be paid to controlling material costs to maintain a profit margin above 15%.</p>
            </div>
            <button 
              onClick={handleDownloadPDF}
              disabled={isExporting}
              style={{ 
                marginTop: '32px', 
                backgroundColor: isExporting ? '#64748b' : '#2563eb', 
                color: 'white', 
                fontWeight: 'bold', 
                padding: '12px 24px', 
                borderRadius: '16px', 
                border: 'none', 
                cursor: isExporting ? 'not-allowed' : 'pointer', 
                width: 'fit-content',
                transition: 'all 0.2s'
              }}
            >
              {isExporting ? 'Exporting...' : 'Download Detailed Report (.PDF)'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'income') {
    return (
      <div style={{ backgroundColor: 'white', borderRadius: '40px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp color="#2563eb" /> Business Results Report (Forecast)
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>* You can enter data directly into the boxes below to update the Dashboard.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '8px', border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
              <Download size={20} />
            </button>
            <button style={{ padding: '8px', border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
              <Save size={20} />
            </button>
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '16px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', textAlign: 'left', position: 'sticky', left: 0, backgroundColor: '#f8fafc', zIndex: 10 }}>Category</th>
                {data.years.map(y => (
                  <th key={y} style={{ padding: '16px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', textAlign: 'right' }}>{y}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ divideY: '1px solid #f8fafc' }}>
              <TableSectionTitle title="Revenue" />
              {Object.entries(data.sales).map(([name, vals]) => (
                <tr key={name} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#475569', position: 'sticky', left: 0, backgroundColor: 'white' }}>{name}</td>
                  {vals.map((v, i) => (
                    <td key={i} style={{ padding: '8px 16px' }}>
                      <input 
                        type="number"
                        style={styles.input}
                        value={v}
                        onChange={(e) => updateValue('sales', name, i, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ backgroundColor: 'rgba(239, 246, 255, 0.3)', fontWeight: 'bold' }}>
                <td style={{ padding: '16px', fontSize: '14px', color: '#0f172a' }}>TOTAL REVENUE</td>
                {calculations.yearlyTotals.map((t, i) => (
                  <td key={i} style={{ padding: '16px', fontSize: '14px', textAlign: 'right', color: '#2563eb', fontWeight: '900' }}>{formatCurrency(t.sales)}</td>
                ))}
              </tr>

              <TableSectionTitle title="COGS & Gross Profit" />
              {Object.entries(data.cogs).map(([name, vals]) => (
                <tr key={name} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#475569', position: 'sticky', left: 0, backgroundColor: 'white' }}>{name}</td>
                  {vals.map((v, i) => (
                    <td key={i} style={{ padding: '8px 16px' }}>
                      <input 
                        type="number"
                        style={styles.input}
                        value={v}
                        onChange={(e) => updateValue('cogs', name, i, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
                <td style={{ padding: '16px', fontSize: '14px', color: '#0f172a', fontStyle: 'italic' }}>Gross Profit</td>
                {calculations.yearlyTotals.map((t, i) => (
                  <td key={i} style={{ padding: '16px', fontSize: '14px', textAlign: 'right', color: '#0f172a' }}>{formatCurrency(t.grossProfit)}</td>
                ))}
              </tr>

              <TableSectionTitle title="Operating Expenses" />
              {Object.entries(data.expenses).map(([name, vals]) => (
                <tr key={name} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#475569', position: 'sticky', left: 0, backgroundColor: 'white' }}>{name}</td>
                  {vals.map((v, i) => (
                    <td key={i} style={{ padding: '8px 16px' }}>
                      <input 
                        type="number"
                        style={styles.input}
                        value={v}
                        onChange={(e) => updateValue('expenses', name, i, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}

              <tr style={{ backgroundColor: '#0f172a', color: 'white', fontWeight: '900' }}>
                <td style={{ padding: '24px', fontSize: '16px' }}>NET PROFIT</td>
                {calculations.yearlyTotals.map((t, i) => (
                  <td key={i} style={{ padding: '24px', fontSize: '18px', textAlign: 'right', color: '#34d399' }}>{formatCurrency(t.netProfit)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'balance') {
    return (
      <div style={{ backgroundColor: 'white', borderRadius: '40px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieChart color="#7c3aed" /> Balance Sheet
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Updates on current assets and liabilities position.</p>
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '16px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>Item</th>
                <th style={{ padding: '16px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', textAlign: 'right' }}>Value (USD)</th>
              </tr>
            </thead>
            <tbody>
              <TableSectionTitle title="Assets" />
              {Object.entries(data.assets).map(([name, val]) => (
                <tr key={name} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#475569' }}>{name}</td>
                  <td style={{ padding: '8px 16px' }}>
                    <input 
                      type="number"
                      style={styles.input}
                      value={val}
                      onChange={(e) => setData(prev => ({ ...prev, assets: { ...prev.assets, [name]: Number(e.target.value) } }))}
                    />
                  </td>
                </tr>
              ))}
              <tr style={{ backgroundColor: 'rgba(37, 99, 235, 0.05)', fontWeight: 'bold' }}>
                <td style={{ padding: '16px', fontSize: '14px', color: '#0f172a' }}>TOTAL ASSETS</td>
                <td style={{ padding: '16px', fontSize: '14px', textAlign: 'right', color: '#2563eb', fontWeight: '900' }}>
                  {formatCurrency(Object.values(data.assets).reduce((sum, v) => sum + v, 0))}
                </td>
              </tr>

              <TableSectionTitle title="Liabilities & Equity" />
              {Object.entries(data.liabilities).map(([name, val]) => (
                <tr key={name} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#475569' }}>{name}</td>
                  <td style={{ padding: '8px 16px' }}>
                    <input 
                      type="number"
                      style={styles.input}
                      value={val}
                      onChange={(e) => setData(prev => ({ ...prev, liabilities: { ...prev.liabilities, [name]: Number(e.target.value) } }))}
                    />
                  </td>
                </tr>
              ))}
              <tr style={{ backgroundColor: 'rgba(15, 23, 42, 0.05)', fontWeight: 'bold' }}>
                <td style={{ padding: '16px', fontSize: '14px', color: '#0f172a' }}>TOTAL LIABILITIES & EQUITY</td>
                <td style={{ padding: '16px', fontSize: '14px', textAlign: 'right', color: '#0f172a', fontWeight: '900' }}>
                  {formatCurrency(Object.values(data.liabilities).reduce((sum, v) => sum + v, 0))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'cashflow') {
    const cashflowData = calculations.yearlyTotals.map(t => ({
      year: t.year,
      inflow: t.sales,
      outflow: t.cogs + t.expenses,
      net: t.netProfit
    }));

    return (
      <div style={{ backgroundColor: 'white', borderRadius: '40px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wallet color="#059669" /> Projected Cash Flow (5 Years)
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Cash flow forecast based on business plans.</p>
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '16px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>Item</th>
                {data.years.map(y => (
                  <th key={y} style={{ padding: '16px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', textAlign: 'right' }}>{y}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f8fafc' }}>
                <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: '#10b981' }}>Cash Inflow</td>
                {cashflowData.map((d, i) => (
                  <td key={i} style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: '#10b981' }}>{formatCurrency(d.inflow)}</td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid #f8fafc' }}>
                <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: '#ef4444' }}>Cash Outflow</td>
                {cashflowData.map((d, i) => (
                  <td key={i} style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: '#ef4444' }}>({formatCurrency(d.outflow)})</td>
                ))}
              </tr>
              <tr style={{ backgroundColor: '#0f172a', color: 'white', fontWeight: '900' }}>
                <td style={{ padding: '24px', fontSize: '16px' }}>NET CASH FLOW</td>
                {cashflowData.map((d, i) => (
                  <td key={i} style={{ padding: '24px', fontSize: '18px', textAlign: 'right', color: d.net >= 0 ? '#34d399' : '#f87171' }}>
                    {formatCurrency(d.net)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ padding: '32px', backgroundColor: '#f8fafc' }}>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashflowData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip formatter={(val) => formatCurrency(val)} />
                <Bar dataKey="inflow" fill="#10b981" radius={[4, 4, 0, 0]} name="Inflow" />
                <Bar dataKey="outflow" fill="#ef4444" radius={[4, 4, 0, 0]} name="Outflow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', backgroundColor: 'white', borderRadius: '48px', border: '2px dashed #e2e8f0' }}>
      <div style={{ width: '80px', height: '80px', backgroundColor: '#f8fafc', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <Calendar color="#cbd5e1" size={40} />
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Under Construction...</h3>
      <p style={{ color: '#94a3b8', marginTop: '8px' }}>Feature {activeTab} is being finalized based on your "pro" Excel file.</p>
    </div>
  );
};

// --- Sub-components ---
const KpiCard = ({ title, value, trend, icon, color }) => (
  <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '40px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9' }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
      {icon}
    </div>
    <p style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{title}</p>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
      <p style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 }}>{value}</p>
      <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>{trend}</span>
    </div>
  </div>
);

const ChartContainer = ({ title, children, styles, accentColor = '#2563eb' }) => (
  <div style={styles.card}>
    <h3 style={styles.header}>
      <div style={{ width: '6px', height: '24px', backgroundColor: accentColor, borderRadius: '9999px' }}></div>
      {title}
    </h3>
    {children}
  </div>
);

const TableSectionTitle = ({ title }) => (
  <tr style={{ backgroundColor: 'rgba(248, 250, 252, 0.5)' }}>
    <td colSpan="10" style={{ padding: '16px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', color: '#3b82f6', letterSpacing: '0.2em' }}>{title}</td>
  </tr>
);

export default FinancialDashboard;
