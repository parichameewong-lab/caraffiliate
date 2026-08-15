import React, { useState } from 'react';
import AuthLayoutCard from './AuthLayoutCard';
import { generateId } from '../../utils/formatters';

export function AgentRegisterForm({ onBack, onComplete }) {
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const line = String(formData.get('line') || '').trim();
    const province = String(formData.get('province') || '').trim();
    const password = String(formData.get('password') || '').trim();

    if (!name || !email || !phone || !password) {
      return setErrorMsg('กรุณากรอกข้อมูลสำคัญให้ครบถ้วน');
    }

    const newAgent = {
      id: `agent-${generateId()}`,
      name,
      email,
      phone,
      line,
      province,
      password,
      status: 'pending',
      code: `CC-${name.substring(0, 4).toUpperCase()}`,
    };

    onComplete(newAgent);
  };

  return (
    <AuthLayoutCard
      title="สมัครเป็นนายหน้า"
      subtitle="เริ่มต้นฟรี รอทีมงานตรวจสอบก่อนสร้างลิงก์"
      onBack={onBack}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {errorMsg && <div className="error-banner">{errorMsg}</div>}
        <label>
          <span>ชื่อ-นามสกุล</span>
          <input type="text" name="name" required placeholder="สมชาย มั่นใจ" />
        </label>
        <label>
          <span>อีเมล</span>
          <input type="email" name="email" required placeholder="yourname@email.com" />
        </label>
        <label>
          <span>เบอร์โทรศัพท์</span>
          <input type="tel" name="phone" required placeholder="0812345678" />
        </label>
        <label>
          <span>Line ID</span>
          <input type="text" name="line" placeholder="line_id" />
        </label>
        <label>
          <span>จังหวัด</span>
          <input type="text" name="province" placeholder="กรุงเทพมหานคร" />
        </label>
        <label>
          <span>รหัสผ่าน</span>
          <input type="password" name="password" required placeholder="อย่างน้อย 6 ตัวอักษร" />
        </label>
        <button type="submit" className="button full">
          ส่งใบสมัครนายหน้า
        </button>
      </form>
    </AuthLayoutCard>
  );
}

export default AgentRegisterForm;
