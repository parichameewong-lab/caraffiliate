import React, { useState } from 'react';
import { formatNumber, generateId } from '../../utils/formatters';
import MultiImageUpload from '../common/MultiImageUpload';
import InspectionPdfUpload from '../common/InspectionPdfUpload';

export function AdvertiserInventory({ advertiser, cars, setCars, showToast }) {
  const [editingCar, setEditingCar] = useState(null);

  const myCars = cars.filter((c) => c.advertiserId === advertiser.id);

  const handleCreateNew = () => {
    setEditingCar({
      id: `car-${generateId()}`,
      title: '',
      vehicleType: 'รถเก๋ง',
      brand: '',
      model: '',
      province: advertiser.province || 'กรุงเทพมหานคร',
      year: String(new Date().getFullYear()),
      price: 0,
      totalCommission: 10000,
      agentPercent: 70,
      sourceUrl: '',
      status: 'active',
      publicVisible: true,
      affiliateEnabled: true,
      description: '',
      monthlyPayment: 0,
      advertiserId: advertiser.id,
      imageUrls: [],
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingCar.title || !editingCar.price) {
      return showToast('กรุณาระบุชื่อประกาศและราคาเสนอขาย');
    }

    setCars((prev) => {
      const exists = prev.some((c) => c.id === editingCar.id);
      if (exists) {
        return prev.map((c) => (c.id === editingCar.id ? editingCar : c));
      }
      return [editingCar, ...prev];
    });

    showToast('บันทึกข้อมูลรถยนต์เรียบร้อยแล้ว');
    setEditingCar(null);
  };

  return (
    <>
      <div className="page-title header-action-row">
        <div>
          <h1>จัดการรายการรถมือสอง</h1>
          <p>เพิ่ม แก้ไข หรือซ่อนประกาศรถของเต็นท์รถคุณ ({myCars.length} คัน)</p>
        </div>
        {!editingCar && (
          <button type="button" className="button" onClick={handleCreateNew}>
            + เพิ่มประกาศรถใหม่
          </button>
        )}
      </div>

      {editingCar ? (
        <section className="panel car-edit-panel">
          <h2>{cars.some((c) => c.id === editingCar.id) ? 'แก้ไขประกาศรถ' : 'เพิ่มรถยนต์ใหม่'}</h2>
          <form className="car-form" onSubmit={handleSave}>
            <div className="form-grid">
              <label className="full-field">
                <span>หัวข้อประกาศ</span>
                <input
                  type="text"
                  required
                  placeholder="เช่น Honda City 1.0 Turbo SV ปี 2021"
                  value={editingCar.title}
                  onChange={(e) => setEditingCar({ ...editingCar, title: e.target.value })}
                />
              </label>

              <label>
                <span>ยี่ห้อ (Brand)</span>
                <input
                  type="text"
                  placeholder="Honda"
                  value={editingCar.brand}
                  onChange={(e) => setEditingCar({ ...editingCar, brand: e.target.value })}
                />
              </label>

              <label>
                <span>รุ่น (Model)</span>
                <input
                  type="text"
                  placeholder="City"
                  value={editingCar.model}
                  onChange={(e) => setEditingCar({ ...editingCar, model: e.target.value })}
                />
              </label>

              <label>
                <span>ปีรถ</span>
                <input
                  type="text"
                  placeholder="2021"
                  value={editingCar.year}
                  onChange={(e) => setEditingCar({ ...editingCar, year: e.target.value })}
                />
              </label>

              <label>
                <span>ราคาเสนอขาย (บาท)</span>
                <input
                  type="number"
                  required
                  placeholder="529000"
                  value={editingCar.price || ''}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, price: Number(e.target.value) })
                  }
                />
              </label>

              <label>
                <span>ค่างวดผ่อนต่อเดือน (บาท)</span>
                <input
                  type="number"
                  placeholder="9490"
                  value={editingCar.monthlyPayment || ''}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, monthlyPayment: Number(e.target.value) })
                  }
                />
              </label>

              <label>
                <span>ค่าคอมมิชชันรวม (บาท)</span>
                <input
                  type="number"
                  placeholder="10000"
                  value={editingCar.totalCommission || ''}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, totalCommission: Number(e.target.value) })
                  }
                />
              </label>

              <label className="full-field">
                <span>รายละเอียดเพิ่มเติม</span>
                <textarea
                  rows={4}
                  placeholder="รายละเอียดสภาพรถ ประวัติการดูแลรักษา สภาพยาง..."
                  value={editingCar.description}
                  onChange={(e) => setEditingCar({ ...editingCar, description: e.target.value })}
                />
              </label>

              <MultiImageUpload
                images={editingCar.imageUrls || []}
                onChange={(urls) => setEditingCar({ ...editingCar, imageUrls: urls })}
                showToast={showToast}
              />

              <InspectionPdfUpload
                carId={editingCar.id}
                name={editingCar.inspectionReportName}
                url={editingCar.inspectionReportUrl}
                onChange={(name, url) =>
                  setEditingCar({ ...editingCar, inspectionReportName: name, inspectionReportUrl: url })
                }
                showToast={showToast}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="button secondary" onClick={() => setEditingCar(null)}>
                ยกเลิก
              </button>
              <button type="submit" className="button">
                บันทึกประกาศรถ
              </button>
            </div>
          </form>
        </section>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>รถยนต์</th>
                <th>ปี</th>
                <th>ราคาขาย</th>
                <th>ผ่อน/เดือน</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {myCars.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    ยังไม่มีประกาศรถของคุณ
                  </td>
                </tr>
              ) : (
                myCars.map((car) => (
                  <tr key={car.id}>
                    <td>
                      <strong>{car.title}</strong>
                      <small>{car.brand} {car.model}</small>
                    </td>
                    <td>{car.year}</td>
                    <td>฿{formatNumber(car.price)}</td>
                    <td>฿{formatNumber(car.monthlyPayment)}</td>
                    <td>
                      <span className="status-badge active">{car.status}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="button small secondary"
                        onClick={() => setEditingCar(car)}
                      >
                        แก้ไข
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AdvertiserInventory;
