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

const AxiomBreakEven = () => {
  const [fixedCosts, setFixedCosts] = useState(10000000); // 10 triệu
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(500000); // 500k
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(1000000); // 1 triệu
  const [maxUnits, setMaxUnits] = useState(50);
  const [chartData, setChartData] = useState([]);
  const [results, setResults] = useState({ breakEvenUnits: 0, breakEvenRevenue: 0 });

  useEffect(() => {
    calculateBreakEven();
  }, [fixedCosts, variableCostPerUnit, sellingPricePerUnit, maxUnits]);

  const calculateBreakEven = () => {
    const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
    let breakEvenUnits = 0;
    
    if (contributionMargin > 0) {
      breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
    } else {
      breakEvenUnits = Infinity;
    }

    const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit;
    setResults({ breakEvenUnits, breakEvenRevenue });

    const data = [];
    const step = Math.max(1, Math.ceil(maxUnits / 10));
    const limit = Math.max(maxUnits, isFinite(breakEvenUnits) ? breakEvenUnits * 1.5 : 0);
    const finalLimit = Math.min(limit, 10000);

    for (let i = 0; i <= finalLimit; i += step) {
      const totalFixed = fixedCosts;
      const totalVariable = i * variableCostPerUnit;
      const totalCost = totalFixed + totalVariable;
      const totalRevenue = i * sellingPricePerUnit;
      const profit = totalRevenue - totalCost;

      data.push({
        units: i,
        totalCost,
        totalRevenue,
        profit,
      });
    }
    setChartData(data);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <div className="axiom-calculator" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="contact-form-box" style={{ padding: '30px', height: '100%' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1B1C36', marginBottom: '24px', borderBottom: '2px solid #B5945B', paddingBottom: '10px', display: 'inline-block' }}>
              Thông số đầu vào
            </h2>
            
            <div className="contact-form space-y-5">
              <div className="form-group">
                <label>Tổng chi phí cố định (Tháng)</label>
                <input
                  type="number"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(Number(e.target.value))}
                  placeholder="Ví dụ: 10,000,000"
                />
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>Mặt bằng, lương cố định, điện nước...</p>
              </div>

              <div className="form-group">
                <label>Chi phí biến đổi / đơn vị</label>
                <input
                  type="number"
                  value={variableCostPerUnit}
                  onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
                  placeholder="Ví dụ: 500,000"
                />
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>Giá vốn, hoa hồng, đóng gói...</p>
              </div>

              <div className="form-group">
                <label>Giá bán / đơn vị</label>
                <input
                  type="number"
                  value={sellingPricePerUnit}
                  onChange={(e) => setSellingPricePerUnit(Number(e.target.value))}
                  placeholder="Ví dụ: 1,000,000"
                />
              </div>

              <div className="form-group">
                <label>Số lượng hiển thị (Biểu đồ)</label>
                <input
                  type="number"
                  value={maxUnits}
                  onChange={(e) => setMaxUnits(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="contact-info-box" style={{ padding: '30px', background: '#1B1C36', color: '#E8E4D8' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#B5945B', marginBottom: '30px', textAlign: 'center' }}>
              Kết quả tính toán
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(232, 229, 215, 0.05)', borderRadius: '12px', border: '1px solid rgba(181, 148, 91, 0.3)' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#B5945B', marginBottom: '12px' }}>
                  Điểm hòa vốn
                </strong>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#E8E4D8' }}>
                  {isFinite(results.breakEvenUnits) ? results.breakEvenUnits.toLocaleString() : 'N/A'}
                </span>
                <p style={{ fontSize: '0.9rem', opacity: '0.7', marginTop: '4px' }}>Sản phẩm / Hợp đồng</p>
              </div>

              <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(232, 229, 215, 0.05)', borderRadius: '12px', border: '1px solid rgba(181, 148, 91, 0.3)' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#B5945B', marginBottom: '12px' }}>
                  Doanh thu hòa vốn
                </strong>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#E8E4D8', display: 'block', margin: '8px 0' }}>
                  {isFinite(results.breakEvenRevenue) ? formatCurrency(results.breakEvenRevenue) : 'N/A'}
                </span>
              </div>
            </div>

            {sellingPricePerUnit <= variableCostPerUnit && (
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(231, 76, 60, 0.2)', border: '1px solid #E74C3C', borderRadius: '8px', color: '#E8E4D8', fontSize: '0.9rem', textAlign: 'center' }}>
                ⚠️ <strong>Cảnh báo:</strong> Giá bán đang thấp hơn hoặc bằng chi phí biến đổi. Bạn sẽ không bao giờ hòa vốn!
              </div>
            )}
          </div>

          {/* Chart Card */}
          <div className="contact-form-box" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1B1C36', marginBottom: '20px' }}>Biểu đồ phân tích doanh thu & chi phí</h3>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="units" stroke="#1B1C36" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#1B1C36" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1B1C36', border: 'none', borderRadius: '8px', color: '#E8E4D8' }}
                    itemStyle={{ color: '#B5945B' }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="totalCost" name="Tổng chi phí" stroke="#1B1C36" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="totalRevenue" name="Tổng doanh thu" stroke="#B5945B" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  {isFinite(results.breakEvenUnits) && (
                    <ReferenceLine x={results.breakEvenUnits} stroke="#E74C3C" strokeDasharray="5 5" label={{ value: 'Hòa vốn', position: 'top', fill: '#E74C3C', fontSize: 12, fontWeight: 'bold' }} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AxiomBreakEven;
