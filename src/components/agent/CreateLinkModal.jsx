import React, { useState } from 'react';

export function CreateLinkModal({ agent, cars, onClose, onPreviewStorefront, showToast }) {
  const [selectedCarId, setSelectedCarId] = useState('');
  const [copied, setCopied] = useState(false);

  const baseUrl = window.location.origin + window.location.pathname;
  const storefrontUrl = `${baseUrl}?ref=${agent.code}&view=storefront`;
  const selectedCar = cars.find((c) => c.id === selectedCarId);
  const targetUrl = selectedCar
    ? `${baseUrl}?ref=${agent.code}&car=${selectedCar.id}`
    : storefrontUrl;

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    showToast('คัดลอกลิงก์เรียบร้อยแล้ว!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card create-link-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>+ สร้างลิงก์นายหน้า</h2>
            <p>เลือกรถที่ต้องการแชร์ หรือใช้ลิงก์หน้าร้านรวมของคุณเพื่อส่งให้ลูกค้า</p>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <label className="form-group">
            <span>เลือกรถที่ต้องการแนะนำ (หรือเลือกหน้าร้านรวม)</span>
            <select
              value={selectedCarId}
              onChange={(e) => setSelectedCarId(e.target.value)}
            >
              <option value="">-- ลิงก์หน้าร้านรวมของคุณ ({cars.length} คัน) --</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.title} — ฿{Number(car.price).toLocaleString()} (คอมมิชชัน ~฿{Number(car.totalCommission || 10000).toLocaleString()})
                </option>
              ))}
            </select>
          </label>

          <div className="link-preview-box">
            <span className="link-type-label">
              {selectedCar ? `ลิงก์รถ: ${selectedCar.title}` : 'ลิงก์หน้าร้านนายหน้าของคุณ'}
            </span>
            <div className="url-copy-row">
              <input type="text" readOnly value={targetUrl} />
              <button
                type="button"
                className={`button ${copied ? 'success' : 'primary'}`}
                onClick={handleCopy}
              >
                {copied ? '✓ คัดลอกแล้ว' : 'คัดลอกลิงก์'}
              </button>
            </div>
          </div>

          <div className="share-actions">
            <strong>แชร์ไปยังสื่อโซเชียล:</strong>
            <div className="share-buttons">
              <a
                href={`https://line.me/R/msg/text/?${encodeURIComponent('สนใจรถมือสองคัดคุณภาพ ดูเพิ่มเติมได้ที่ลิงก์นี้: ' + targetUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="social-btn line-btn"
              >
                💚 แชร์ลง LINE
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(targetUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="social-btn fb-btn"
              >
                💙 แชร์ลง Facebook
              </a>
              <button
                type="button"
                className="social-btn preview-btn"
                onClick={() => {
                  onClose();
                  onPreviewStorefront(agent.code, selectedCarId);
                }}
              >
                👁 ดูตัวอย่างหน้าร้าน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateLinkModal;
