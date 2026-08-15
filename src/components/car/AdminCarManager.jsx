import React from 'react';
import { formatNumber } from '../../utils/formatters';

export function AdminCarManager({ cars, setCars, advertisers, showToast }) {
  const toggleVisibility = (carId) => {
    setCars((prev) =>
      prev.map((c) =>
        c.id === carId
          ? {
              ...c,
              publicVisible: c.publicVisible === false ? true : false,
              moderationStatus: c.publicVisible === false ? 'approved' : 'hidden',
            }
          : c
      )
    );
    showToast('อัปเดตสถานะการมองเห็นเรียบร้อยแล้ว');
  };

  const toggleFeatured = (carId) => {
    setCars((prev) =>
      prev.map((c) => (c.id === carId ? { ...c, featuredManual: !c.featuredManual } : c))
    );
    showToast('อัปเดตสถานะ CLUBROD CHOICE แล้ว');
  };

  return (
    <>
      <div className="page-title">
        <h1>จัดการประกาศรถยนต์ทั้งหมด</h1>
        <p>อนุมัติ ซ่อน หรือเลือกตั้งค่าเป็นรถเด่นประจำสัปดาห์ (CLUBROD CHOICE)</p>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>รายการรถ</th>
              <th>เต็นท์รถ/ผู้ขาย</th>
              <th>ราคา</th>
              <th>ค่าคอมฯ รวม</th>
              <th>CLUBROD CHOICE</th>
              <th>สถานะมองเห็น</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => {
              const dealer = advertisers.find((a) => a.id === car.advertiserId);
              const isVisible = car.publicVisible !== false && car.moderationStatus !== 'hidden';
              return (
                <tr key={car.id}>
                  <td>
                    <strong>{car.title}</strong>
                    <small>ปี {car.year} · {car.province}</small>
                  </td>
                  <td>{dealer?.storeName || 'ส่วนกลาง'}</td>
                  <td>฿{formatNumber(car.price)}</td>
                  <td>฿{formatNumber(car.totalCommission)}</td>
                  <td>
                    <button
                      type="button"
                      className={`button small ${car.featuredManual ? 'warning' : 'secondary'}`}
                      onClick={() => toggleFeatured(car.id)}
                    >
                      {car.featuredManual ? '★ รถเด่น' : '☆ ทั่วไป'}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`button small ${isVisible ? 'secondary' : 'danger'}`}
                      onClick={() => toggleVisibility(car.id)}
                    >
                      {isVisible ? 'แสดงผล' : 'ซ่อนอยู่'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminCarManager;
