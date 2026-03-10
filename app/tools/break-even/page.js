'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AxiomBreakEven from '../../components/tools/AxiomBreakEven';
import { Calculator } from 'lucide-react';

export default function BreakEvenPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--color-light)' }}>
      <Navbar />
      
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1454165833767-027ffea9e7a7?q=80&w=2070&auto=format&fit=crop" 
            alt="Financial Analysis" 
          />
        </div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content container">
          <h1>
            <Calculator size={42} style={{ color: 'var(--color-accent)', marginRight: '15px', verticalAlign: 'middle', display: 'inline-block' }} />
            Điểm Hòa Vốn
          </h1>
          <p>
            Công cụ phân tích điểm hòa vốn chuyên sâu giúp bạn xác định mục tiêu doanh số 
            và tối ưu hóa cấu trúc chi phí cho doanh nghiệp.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="mb-10 text-center">
              <span className="badge badge-used" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Quản Trị Tài Chính</span>
              <h2 className="section-title" style={{ marginTop: '15px' }}>Phân Tích Lợi Nhuận Axiom</h2>
              <p style={{ color: 'var(--color-dark)', opacity: '0.7', maxWidth: '700px', margin: '0 auto' }}>
                Nhập các thông số tài chính bên dưới để tính toán chính xác số lượng sản phẩm hoặc doanh thu 
                cần thiết để bù đắp toàn bộ chi phí hoạt động.
              </p>
            </div>

            <AxiomBreakEven />

            <div className="why-card mt-12" style={{ textAlign: 'left', padding: '30px' }}>
              <h4 style={{ color: 'var(--color-accent)', marginBottom: '15px' }}>Hướng dẫn sử dụng:</h4>
              <ul className="facts-list" style={{ color: 'var(--color-light)' }}>
                <li><strong>Chi phí cố định:</strong> Là những khoản phí bạn phải trả hàng tháng dù có bán được hàng hay không (Mặt bằng, lương cơ bản, internet...).</li>
                <li><strong>Chi phí biến đổi:</strong> Là chi phí phát sinh trên mỗi sản phẩm bán ra (Giá vốn hàng bán, hoa hồng môi giới, phí vận chuyển...).</li>
                <li><strong>Giá bán:</strong> Doanh thu thu về trên mỗi đơn vị sản phẩm hoặc hợp đồng thành công.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
