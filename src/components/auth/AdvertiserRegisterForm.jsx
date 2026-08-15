import React, { useState } from 'react';
import AuthLayoutCard from './AuthLayoutCard';
import { generateId } from '../../utils/formatters';

export function AdvertiserRegisterForm({ onBack, onComplete }) {
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const storeName = String(formData.get('storeName') || '').trim();
    const ownerName = String(formData.get('ownerName') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const province = String(formData.get('province') || '').trim();
    const address = String(formData.get('address') || '').trim();
    const line = String(formData.get('line') || '').trim();
    const password = String(formData.get('password') || '').trim();

    if (!storeName || !email || !phone || !password) {
      return setErrorMsg('กรุณากรอกข้อมูลให้ครบถ้วน');
    }

    const newAdvertiser = {
      id: `advertiser-${generateId()}`,
      storeName,
      ownerName,
      email,
      phone,
      province,
      address,
      line,
      password,
      status: 'pending',
    };

    onComplete(newAdvertiser);
  };

  return (
    <AuthLayoutCard
      title="สมัคร Advertiser"
      subtitle="สำหรับเต็นท์รถและผู้ประกอบการที่ต้องการลงขายรถกับแพลตฟอร์ม"
      onBack={onBack}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {errorMsg && <div className="error-banner">{errorMsg}</div>}
        <label>
          <span>ชื่อเต็นท์รถ / ร้านค้า</span>
          <input type="text" name="storeName" required placeholder="สมชาย ออโต้คาร์" />
        </label>
        <label>
          <span>ชื่อผู้ติดต่อ</span>
          <input type="text" name="ownerName" placeholder="คุณสมชาย" />
        </label>
        <label>
          <span>อีเมล</span>
          <input type="email" name="email" required placeholder="dealer@email.com" />
        </label>
        <label>
          <span>เบอร์โทรศัพท์</span>
          <input type="tel" name="phone" required placeholder="0823456789" />
        </label>
        <label>
          <span>จังหวัด</span>
          <input type="text" name="province" placeholder="เชียงใหม่" />
        </label>
        <label>
          <span>ที่อยู่เต็นท์รถ</span>
          <input type="text" name="address" placeholder="ถนนซุปเปอร์ไฮเวย์ อำเภอเมือง" />
        </label>
        <label>
          <span>Line ID</span>
          <input type="text" name="line" placeholder="dealer_line" />
        </label>
        <label>
          <span>รหัสผ่าน</span>
          <input type="password" name="password" required placeholder="••••••••" />
        </label>
        <button type="submit" className="button full">
          ลงทะเบียนเต็นท์รถ
        </button>
      </form>
    </AuthLayoutCard>
  );
}

export default AdvertiserRegisterForm;
