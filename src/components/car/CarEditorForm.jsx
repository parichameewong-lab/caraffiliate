import React, { useState } from 'react';
import MultiImageUpload from '../common/MultiImageUpload';
import InspectionPdfUpload from '../common/InspectionPdfUpload';
import { formatNumber } from '../../utils/formatters';

export function CarEditorForm({ car, storeName, onSave, onCancel, showToast }) {
  const [formData, setFormData] = useState({
    id: car.id,
    title: car.title || '',
    brand: car.brand || '',
    model: car.model || '',
    vehicleType: car.vehicleType || 'รถเก๋ง',
    year: car.year || String(new Date().getFullYear()),
    mileage: car.mileage || '',
    color: car.color || 'ขาว',
    fuel: car.fuel || 'เบนซิน',
    gasSystem: car.gasSystem || 'ไม่มีแก๊ส',
    transmission: car.transmission || 'อัตโนมัติ',
    price: car.price || '',
    monthlyPayment: car.monthlyPayment || '',
    totalCommission: car.totalCommission || '',
    agentPercent: car.agentPercent || 70,
    description: car.description || '',
    status: car.status || 'active',
    moderationStatus: car.moderationStatus || 'visible',
    moderationReason: car.moderationReason || '',
    imageUrls: car.imageUrls || (car.imageUrl ? [car.imageUrl] : []),
    inspectionReportName: car.inspectionReportName || '',
    inspectionReportUrl: car.inspectionReportUrl || '',
    advertiserId: car.advertiserId || '',
    province: car.province || 'กรุงเทพมหานคร',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-generate title if brand or model changes
      if (field === 'brand' || field === 'model') {
        const brandStr = field === 'brand' ? value : prev.brand;
        const modelStr = field === 'model' ? value : prev.model;
        if (brandStr || modelStr) {
          updated.title = `${brandStr} ${modelStr}`.trim();
        }
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.brand || !formData.model || !formData.price || Number(formData.price) <= 0) {
      return showToast('กรุณากรอกยี่ห้อ รุ่นรถ และราคาขายให้ครบถ้วน');
    }
    if (!formData.totalCommission || Number(formData.totalCommission) <= 0) {
      return showToast('กรุณาระบุจำนวนค่าคอมมิชชันรวมที่เสนอ');
    }

    const finalTitle = formData.title || `${formData.brand} ${formData.model}`.trim();
    onSave({
      ...formData,
      title: finalTitle,
      price: Number(formData.price),
      monthlyPayment: Number(formData.monthlyPayment || 0),
      totalCommission: Number(formData.totalCommission),
      mileage: Number(formData.mileage || 0),
      imageUrl: formData.imageUrls[0] || '',
    });
  };

  return (
    <div className="car-form-container">
      {/* Banner / Header */}
      <div className="form-header-banner">
        <div>
          <span className="banner-badge">
            {storeName ? `ประกาศของ ${storeName}` : 'ระบบลงประกาศกลาง'}
          </span>
          <h2 className="banner-title">
            {car.title ? 'แก้ไขข้อมูลรถยนต์' : 'เพิ่มประกาศรถมือสองใหม่'}
          </h2>
          <p className="banner-sub">
            กรอกข้อมูลรถยนต์อย่างเป็นระเบียบ เพื่อความรวดเร็วในการตรวจสอบและลงขาย
          </p>
        </div>
        <div className="banner-status">
          <span className={`status-badge ${formData.status === 'active' ? 'active' : 'paused'}`}>
            {formData.status === 'active' ? '● กำลังประกาศขาย' : '○ ปิดประกาศไว้'}
          </span>
        </div>
      </div>

      {formData.moderationStatus === 'hidden' && (
        <div className="moderation-alert-box">
          <span className="alert-icon">⚠️</span>
          <div>
            <strong>ประกาศนี้ถูกระงับการมองเห็นโดยแอดมิน</strong>
            <small>{formData.moderationReason || 'พบข้อมูลที่ต้องแก้ไข กรุณาปรับปรุงและติดต่อทีมงาน'}</small>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="modern-car-form">
        {/* SECTION 1: PHOTOS & INSPECTION DOCS */}
        <section className="form-section-card">
          <div className="section-header">
            <span className="section-icon">📸</span>
            <div>
              <h3>1. รูปภาพรถ & เอกสารตรวจสภาพ</h3>
              <p>อัปโหลดรูปถ่ายจริงมุมต่างๆ ของรถ และไฟล์รายงานตรวจสภาพ (ถ้ามี)</p>
            </div>
          </div>

          <div className="section-body">
            <MultiImageUpload
              images={formData.imageUrls}
              onChange={(urls) => handleChange('imageUrls', urls)}
              showToast={showToast}
            />

            <div className="pdf-upload-divider" />

            <InspectionPdfUpload
              carId={formData.id}
              name={formData.inspectionReportName}
              url={formData.inspectionReportUrl}
              onChange={(name, url) => {
                handleChange('inspectionReportName', name);
                handleChange('inspectionReportUrl', url);
              }}
              showToast={showToast}
            />
          </div>
        </section>

        {/* SECTION 2: BASIC CAR SPECS */}
        <section className="form-section-card">
          <div className="section-header">
            <span className="section-icon">🚗</span>
            <div>
              <h3>2. ข้อมูลสเปครถยนต์</h3>
              <p>ระบุรายละเอียดปี ยี่ห้อ รุ่น และประเภทรถยนต์</p>
            </div>
          </div>

          <div className="section-body">
            <div className="form-grid-3">
              <div className="form-field-group">
                <label>
                  ยี่ห้อ (Brand) <span className="required">*</span>
                </label>
                <select
                  required
                  value={formData.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                >
                  <option value="">เลือกยี่ห้อรถ</option>
                  {['Toyota', 'Honda', 'Isuzu', 'Mazda', 'Nissan', 'Mitsubishi', 'Ford', 'Suzuki', 'MG', 'BMW', 'Mercedes-Benz'].map(
                    (b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="form-field-group">
                <label>
                  รุ่น / รุ่นย่อย (Model) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Note 1.2 VL, Yaris G+"
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                />
              </div>

              <div className="form-field-group">
                <label>
                  ปีรถ (Year) <span className="required">*</span>
                </label>
                <select
                  required
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                >
                  {Array.from({ length: 31 }, (_, i) => String(new Date().getFullYear() - i)).map((y) => (
                    <option key={y} value={y}>
                      ปี {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-grid-3" style={{ marginTop: '16px' }}>
              <div className="form-field-group">
                <label>
                  ประเภทรถ <span className="required">*</span>
                </label>
                <select
                  required
                  value={formData.vehicleType}
                  onChange={(e) => handleChange('vehicleType', e.target.value)}
                >
                  <option value="รถเก๋ง">รถเก๋ง (Sedan)</option>
                  <option value="รถแฮทช์แบ็ก">รถแฮทช์แบ็ก (Hatchback)</option>
                  <option value="รถกระบะ">รถกระบะ (Pickup)</option>
                  <option value="รถอเนกประสงค์ SUV">รถอเนกประสงค์ (SUV/PPV)</option>
                  <option value="รถตู้">รถตู้ (Van)</option>
                  <option value="รถยุโรป">รถยุโรป (European)</option>
                </select>
              </div>

              <div className="form-field-group">
                <label>เลขไมล์ (กิโลเมตร)</label>
                <div className="input-unit-wrap">
                  <input
                    type="number"
                    min="0"
                    placeholder="เช่น 45000"
                    value={formData.mileage}
                    onChange={(e) => handleChange('mileage', e.target.value)}
                  />
                  <span className="unit-label">กม.</span>
                </div>
              </div>

              <div className="form-field-group">
                <label>สีรถยนต์</label>
                <select
                  value={formData.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                >
                  {['ขาว', 'ดำ', 'เทา', 'เงิน', 'แดง', 'น้ำเงิน', 'น้ำตาล', 'เขียว', 'เหลือง', 'ส้ม', 'อื่นๆ'].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="form-grid-3" style={{ marginTop: '16px' }}>
              <div className="form-field-group">
                <label>ระบบเกียร์</label>
                <select
                  value={formData.transmission}
                  onChange={(e) => handleChange('transmission', e.target.value)}
                >
                  <option value="อัตโนมัติ">อัตโนมัติ (Auto)</option>
                  <option value="ธรรมดา">ธรรมดา (Manual)</option>
                </select>
              </div>

              <div className="form-field-group">
                <label>ประเภทเชื้อเพลิง</label>
                <select
                  value={formData.fuel}
                  onChange={(e) => handleChange('fuel', e.target.value)}
                >
                  <option value="เบนซิน">เบนซิน</option>
                  <option value="ดีเซล">ดีเซล</option>
                  <option value="ไฮบริด">ไฮบริด (Hybrid)</option>
                  <option value="ไฟฟ้า (EV)">ไฟฟ้า (EV)</option>
                </select>
              </div>

              <div className="form-field-group">
                <label>ระบบแก๊ส</label>
                <select
                  value={formData.gasSystem}
                  onChange={(e) => handleChange('gasSystem', e.target.value)}
                >
                  <option value="ไม่มีแก๊ส">ไม่มีแก๊ส</option>
                  <option value="LPG">LPG</option>
                  <option value="NGV">NGV</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: PRICING & COMMISSION */}
        <section className="form-section-card">
          <div className="section-header">
            <span className="section-icon">💰</span>
            <div>
              <h3>3. ราคา & ค่าคอมมิชชัน</h3>
              <p>ระบุราคาเสนอขายเต็ม ผ่อนเริ่มต้น และยอดค่าคอมมิชชันรวมที่เสนอ</p>
            </div>
          </div>

          <div className="section-body">
            <div className="form-grid-3">
              <div className="form-field-group">
                <label>
                  ราคาเสนอขายเต็ม (บาท) <span className="required">*</span>
                </label>
                <div className="input-unit-wrap">
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="เช่น 329000"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                  />
                  <span className="unit-label">บาท</span>
                </div>
              </div>

              <div className="form-field-group">
                <label>ผ่อนต่อเดือนโดยประมาณ (บาท)</label>
                <div className="input-unit-wrap">
                  <input
                    type="number"
                    min="0"
                    placeholder="เช่น 5990"
                    value={formData.monthlyPayment}
                    onChange={(e) => handleChange('monthlyPayment', e.target.value)}
                  />
                  <span className="unit-label">บาท/เดือน</span>
                </div>
              </div>

              <div className="form-field-group highlight-field">
                <label>
                  ค่าคอมมิชชันรวมที่เสนอ (บาท) <span className="required">*</span>
                </label>
                <div className="input-unit-wrap">
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="เช่น 10000"
                    value={formData.totalCommission}
                    onChange={(e) => handleChange('totalCommission', e.target.value)}
                  />
                  <span className="unit-label orange-unit">บาท</span>
                </div>
              </div>
            </div>

            <div className="privacy-notice-box">
              <span className="lock-icon">🔒</span>
              <div>
                <strong>ข้อกำหนดความเป็นส่วนตัวของส่วนแบ่งค่าคอมมิชชัน</strong>
                <p>
                  Advertiser จะเห็นและจัดการเฉพาะยอดค่าคอมมิชชันรวมที่เสนอเท่านั้น
                  การจัดสรรส่วนแบ่งระหว่างนายหน้าและแพลตฟอร์มจะถูกจัดเก็บเป็นความลับและดูแลโดยระบบ CLUBROD
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DESCRIPTION & VISIBILITY */}
        <section className="form-section-card">
          <div className="section-header">
            <span className="section-icon">📝</span>
            <div>
              <h3>4. รายละเอียดรถยนต์ & การแสดงผล</h3>
              <p>เพิ่มรายละเอียดสภาพรถ ประวัติการดูแล และเปิด-ปิดการแสดงผล</p>
            </div>
          </div>

          <div className="section-body">
            <div className="form-field-group">
              <label>รายละเอียดเพิ่มเติมเกี่ยวกับตัวรถ</label>
              <textarea
                rows={4}
                placeholder="ระบุรายละเอียด เช่น สภาพตัวถัง ประวัติการเข้าศูนย์ สีเดิมทั้งคัน อุปกรณ์ตกแต่งเพิ่มเติม หรือเงื่อนไขการออกรถ..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>

            <div className="toggle-status-box">
              <label className="checkbox-toggle">
                <input
                  type="checkbox"
                  checked={formData.status === 'active'}
                  disabled={formData.moderationStatus === 'hidden'}
                  onChange={(e) => handleChange('status', e.target.checked ? 'active' : 'paused')}
                />
                <span className="toggle-label">
                  {formData.moderationStatus === 'hidden'
                    ? 'ประกาศนี้ถูกระงับโดยแอดมิน ไม่สามารถเปิดขายได้'
                    : 'เปิดประกาศขายทันที (แสดงบนหน้ารวมรถ และเปิดให้นายหน้าสร้างลิงก์)'}
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* ACTION BUTTONS */}
        <div className="form-actions-bar">
          <button type="button" className="button secondary" onClick={onCancel}>
            ยกเลิก
          </button>
          <button type="submit" className="button primary-orange">
            บันทึกประกาศรถ <b>→</b>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarEditorForm;
