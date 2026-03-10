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

const BreakEvenCalculator = () => {
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

    // Generate Chart Data
    const data = [];
    const step = Math.max(1, Math.ceil(maxUnits / 10));
    
    // Đảm bảo điểm hòa vốn có trong biểu đồ nếu nó hợp lý
    const limit = Math.max(maxUnits, isFinite(breakEvenUnits) ? breakEvenUnits * 1.5 : 0);
    const finalLimit = Math.min(limit, 10000); // Giới hạn để tránh treo trình duyệt

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
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Thông số đầu vào</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tổng chi phí cố định (Tháng)
            </label>
            <input
              type="number"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ví dụ: 10000000"
            />
            <p className="text-xs text-gray-500 mt-1">Mặt bằng, lương cố định, điện nước...</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chi phí biến đổi trên mỗi đơn vị
            </label>
            <input
              type="number"
              value={variableCostPerUnit}
              onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ví dụ: 500000"
            />
            <p className="text-xs text-gray-500 mt-1">Giá vốn hàng bán, hoa hồng, đóng gói...</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá bán trên mỗi đơn vị
            </label>
            <input
              type="number"
              value={sellingPricePerUnit}
              onChange={(e) => setSellingPricePerUnit(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ví dụ: 1000000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng sản phẩm tối đa hiển thị (Biểu đồ)
            </label>
            <input
              type="number"
              value={maxUnits}
              onChange={(e) => setMaxUnits(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Kết quả tính toán</h2>
          
          <div className="space-y-8">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 uppercase font-semibold">Điểm hòa vốn (Sản phẩm)</p>
              <p className="text-3xl font-bold text-blue-600">
                {isFinite(results.breakEvenUnits) ? results.breakEvenUnits.toLocaleString() : 'N/A'}
              </p>
              <p className="text-xs text-gray-400 mt-1">Sản phẩm/Hợp đồng</p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 uppercase font-semibold">Doanh thu hòa vốn</p>
              <p className="text-3xl font-bold text-green-600">
                {isFinite(results.breakEvenRevenue) ? formatCurrency(results.breakEvenRevenue) : 'N/A'}
              </p>
            </div>

            {sellingPricePerUnit <= variableCostPerUnit && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                ⚠️ Cảnh báo: Giá bán đang thấp hơn hoặc bằng chi phí biến đổi. Bạn sẽ không bao giờ hòa vốn!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Biểu đồ phân tích</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="units" 
                label={{ value: 'Số lượng sản phẩm', position: 'insideBottomRight', offset: -10 }} 
              />
              <YAxis 
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                label={{ value: 'Số tiền (VND)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(label) => `Số lượng: ${label}`}
              />
              <Legend verticalAlign="top" height={36}/>
              <Line
                type="monotone"
                dataKey="totalCost"
                stroke="#ef4444"
                name="Tổng chi phí"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#22c55e"
                name="Tổng doanh thu"
                strokeWidth={2}
                dot={false}
              />
              {isFinite(results.breakEvenUnits) && (
                <ReferenceLine 
                  x={results.breakEvenUnits} 
                  stroke="#3b82f6" 
                  strokeDasharray="5 5"
                  label={{ value: 'Hòa vốn', position: 'top', fill: '#3b82f6' }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BreakEvenCalculator;
