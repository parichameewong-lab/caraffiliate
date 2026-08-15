import React, { useState } from 'react';
import { formatNumber } from '../../utils/formatters';

export function AgentCarList({ cars, agent, onPreview, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');

  const activeCars = cars.filter(
    (c) =>
      c.status === 'active' &&
      c.moderationStatus !== 'hidden' &&
      c.affiliateEnabled !== false &&
      c.totalCommission > 0 &&
      `${c.title} ${c.year}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyLink = (car) => {
    const url = `${window.location.origin}/?ref=${agent.code}&car=${car.id}`;
    navigator.clipboard.writeText(url);
    showToast('คัดลอกลิงก์ส่วนตัวเรียบร้อยแล้ว');
  };

  return (
    <>
      <div className="page-title">
        <h1>เลือกรถเพื่อรับลิงก์แนะนำ</h1>
        <p>คัดลอกลิงก์ส่วนตัวไปแชร์ เมื่อมีลูกค้าสนใจและตกลงซื้อ คุณจะได้รับค่าคอมมิชชัน</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="ค้นหายี่ห้อ หรือรุ่นรถ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="agent-car-grid">
        {activeCars.map((car) => {
          const comm = Math.round((car.totalCommission * (car.agentPercent || 70)) / 100);
          return (
            <article key={car.id} className="agent-car-card">
              <div className="car-head">
                <h3>{car.title}</h3>
                <span className="year-chip">ปี {car.year}</span>
              </div>

              <div className="car-pricing">
                <div>
                  <small>ราคาเสนอขาย</small>
                  <strong>฿{formatNumber(car.price)}</strong>
                </div>
                <div className="comm-box">
                  <small>ค่าคอมฯ ของคุณ ({car.agentPercent || 70}%)</small>
                  <strong className="green">฿{formatNumber(comm)}</strong>
                </div>
              </div>

              <div className="card-actions">
                <button
                  type="button"
                  className="button secondary small"
                  onClick={() => onPreview(car, agent.code)}
                >
                  ดูหน้ารถ
                </button>
                <button
                  type="button"
                  className="button small"
                  onClick={() => copyLink(car)}
                >
                  คัดลอกลิงก์แนะนำ
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

export default AgentCarList;
