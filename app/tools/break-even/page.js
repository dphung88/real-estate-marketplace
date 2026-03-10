import React from 'react';
import FinanceDashboard from '../../components/tools/FinanceDashboard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Công cụ Quản trị Tài chính | Real Estate Marketplace',
  description: 'Tính toán điểm hòa vốn, dòng tiền và tỷ lệ lãi gộp cho doanh nghiệp.',
};

const BreakEvenPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-gray-900 sm:text-5xl mb-4 tracking-tight">
            Quản Trị Tài Chính Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bộ công cụ giúp tối ưu lợi nhuận và kiểm soát dòng tiền dành riêng cho quản trị nội bộ.
          </p>
        </div>

        <FinanceDashboard />
      </div>

      <Footer />
    </main>
  );
};

export default BreakEvenPage;
