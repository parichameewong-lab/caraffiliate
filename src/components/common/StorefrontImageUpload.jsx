import React from 'react';

export function StorefrontImageUpload({ image, onChange, showToast }) {
  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast('รูปหน้าร้านต้องมีขนาดไม่เกิน 2 MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ''));
    reader.onerror = () => showToast('อ่านไฟล์รูปภาพไม่สำเร็จ กรุณาลองใหม่');
    reader.readAsDataURL(file);
  };

  return (
    <div className="full-field storefront-uploader">
      <div className="storefront-preview">
        {image ? (
          <img src={image} alt="ตัวอย่างรูปหน้าร้าน" />
        ) : (
          <div>
            <span aria-hidden="true">▧</span>
            <strong>ยังไม่มีรูปหน้าร้าน</strong>
            <small>เพิ่มภาพจริงของเต็นท์รถเพื่อให้ลูกค้าจดจำร้านได้ง่ายขึ้น</small>
          </div>
        )}
      </div>

      <div className="storefront-controls">
        <div>
          <strong>รูปหน้าร้าน</strong>
          <small>แนะนำภาพแนวนอน เห็นป้ายชื่อร้านและบริเวณหน้าร้านชัดเจน</small>
        </div>
        <label className="upload-button">
          {image ? 'เปลี่ยนรูปหน้าร้าน' : '+ อัปโหลดรูปหน้าร้าน'}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.currentTarget.value = '';
            }}
          />
        </label>
        {image && (
          <button
            type="button"
            className="remove-image"
            onClick={() => onChange('')}
          >
            ลบรูปหน้าร้าน
          </button>
        )}
        <small className="upload-only-note">
          รองรับ JPG, PNG และ WebP ขนาดไม่เกิน 2 MB
        </small>
      </div>
    </div>
  );
}

export default StorefrontImageUpload;
