import React, { useState } from 'react';
import AuthLayoutCard from './AuthLayoutCard';

export function LoginForm({ agents, advertisers, includeAdmin, onBack, onAgent, onAdvertiser, onAdmin }) {
  const [role, setRole] = useState('agent');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '').trim();

    setErrorMsg('');

    if (role === 'admin') {
      if (email === 'admin@clubrod.com' && password === 'admin1234') {
        return onAdmin();
      }
      return setErrorMsg('อีเมลหรือรหัสผ่านผู้ดูแลระบบไม่ถูกต้อง');
    }

    if (role === 'agent') {
      const match = agents.find((a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password);
      if (!match) return setErrorMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      if (match.status !== 'approved') return setErrorMsg('บัญชีของคุณอยู่ระหว่างรอแอดมินตรวจสอบอนุมัติ');
      return onAgent(match);
    }

    if (role === 'advertiser') {
      const match = advertisers.find((a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password);
      if (!match) return setErrorMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      if (match.status !== 'approved') return setErrorMsg('บัญชีเต็นท์รถของคุณอยู่ระหว่างรอตรวจสอบ');
      return onAdvertiser(match);
    }
  };

  return (
    <AuthLayoutCard title="ยินดีต้อนรับกลับ" subtitle="เข้าสู่ระบบ CLUBROD" onBack={onBack}>
      <div className="role-switch">
        <button
          type="button"
          className={role === 'agent' ? 'active' : ''}
          onClick={() => setRole('agent')}
        >
          นายหน้า
        </button>
        <button
          type="button"
          className={role === 'advertiser' ? 'active' : ''}
          onClick={() => setRole('advertiser')}
        >
          Advertiser
        </button>
        {includeAdmin && (
          <button
            type="button"
            className={role === 'admin' ? 'active' : ''}
            onClick={() => setRole('admin')}
          >
            แอดมิน
          </button>
        )}
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {errorMsg && <div className="error-banner">{errorMsg}</div>}
        <label>
          <span>อีเมล</span>
          <input
            type="email"
            name="email"
            required
            placeholder={
              role === 'admin'
                ? 'admin@clubrod.com'
                : role === 'agent'
                ? 'agent@clubrod.com'
                : 'dealer@clubrod.com'
            }
          />
        </label>
        <label>
          <span>รหัสผ่าน</span>
          <input type="password" name="password" required placeholder="••••••••" />
        </label>
        <button type="submit" className="button full">
          เข้าสู่ระบบ
        </button>
      </form>
    </AuthLayoutCard>
  );
}

export default LoginForm;
