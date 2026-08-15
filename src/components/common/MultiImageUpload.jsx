import React from 'react';

export function MultiImageUpload({ images, onChange, showToast }) {
  const readFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFiles = async (fileList) => {
    if (!fileList?.length) return;
    const files = Array.from(fileList);
    if (images.length + files.length > 15) {
      return showToast(`เพิ่มได้อีกไม่เกิน ${15 - images.length} รูป (สูงสุด 15 รูป)`);
    }

    const invalid = files.find((f) => !f.type.startsWith('image/'));
    if (invalid) {
      return showToast('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
    }

    const oversized = files.find((f) => f.size > 5 * 1024 * 1024);
    if (oversized) {
      return showToast('แต่ละรูปต้องมีขนาดไม่เกิน 5 MB');
    }

    try {
      const dataUrls = await Promise.all(files.map(readFile));
      onChange([...images, ...dataUrls]);
      showToast(`อัปโหลด ${dataUrls.length} รูปเรียบร้อย`);
    } catch {
      showToast('อ่านไฟล์รูปภาพไม่สำเร็จ กรุณาลองใหม่');
    }
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="full-field multi-image-uploader">
      <div className="uploader-header">
        <div>
          <strong>รูปภาพรถยนต์ ({images.length}/15 รูป)</strong>
          <small>รูปแรกจะเป็นภาพหลักของประกาศ แนะนำใช้ภาพมุมเฉียงด้านหน้า</small>
        </div>
        <label className="upload-button">
          + เลือกรูปภาพ
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              handleFiles(e.target.files);
              e.currentTarget.value = '';
            }}
          />
        </label>
      </div>

      <div className="image-grid-preview">
        {images.map((url, i) => (
          <div key={i} className="preview-item">
            <img src={url} alt={`รูปที่ ${i + 1}`} />
            {i === 0 && <span className="cover-badge">ภาพหลัก</span>}
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeImage(i)}
              aria-label={`ลบรูปที่ ${i + 1}`}
            >
              ×
            </button>
          </div>
        ))}
        {images.length === 0 && (
          <div className="empty-uploader-placeholder">
            <span>📷</span>
            <p>ยังไม่มีรูปภาพ แนบรูปสภาพรถ ห้องโดยสาร และเรือนไมล์</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiImageUpload;
