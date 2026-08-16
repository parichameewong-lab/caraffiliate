import React, { useState } from 'react';
import AuthLayoutCard from './AuthLayoutCard';

export function LoginForm({ agents, advertisers, includeAdmin, onBack, onAgent, onAdvertiser, onAdmin }) {
  const [role, setRole] = useState('agent');
  const [email, setEmail] = useState('agent@clubrod.com');
  const [password, setPassword] = useState('agent1234');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrorMsg('');
    if (newRole === 'agent') {
      setEmail('agent@clubrod.com');
      setPassword('agent1234');
    } else if (newRole === 'advertiser') {
      setEmail('dealer@clubrod.com');
      setPassword('dealer1234');
    } else if (newRole === 'admin') {
      setEmail('admin@clubrod.com');
      setPassword('admin1234');
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (role === 'admin') {
      if (email.trim() === 'admin@clubrod.com' && password.trim() === 'admin1234') {
        return onAdmin();
      }
      return setErrorMsg('อีเมลหรือรหัสผ่านผู้ดูแลระบบไม่ถูกต้อง');
    }

    if (role === 'agent') {
      const match = agents.find(
        (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password.trim()
      );
      if (!match) {
        // Fallback demo match for first approved agent if typing mismatch
        if (agents.length > 0) return onAgent(agents[0]);
        return setErrorMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
      return onAgent(match);
    }

    if (role === 'advertiser') {
      const match = advertisers.find(
        (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password.trim()
      );
      if (!match) {
        if (advertisers.length > 0) return onAdvertiser(advertisers[0]);
        return setErrorMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
      return onAdvertiser(match);
    }
  };

  const handleQuickLogin = (targetRole) => {
    if (targetRole === 'agent' && agents.length > 0) {
      onAgent(agents[0]);
    } else if (targetRole === 'advertiser' && advertisers.length > 0) {
      onAdvertiser(advertisers[0]);
    } else if (targetRole === 'admin') {
      onAdmin();
    }
  };

  return (
    <AuthLayoutCard title="ยินดีต้อนรับกลับ" subtitle="เข้าสู่ระบบ CLUBROD" onBack={onBack}>
      <div className="role-switch">
        <button
          type="button"
          className={role === 'agent' ? 'active' : ''}
          onClick={() => handleRoleChange('agent')}
        >
          นายหน้า
        </button>
        <button
          type="button"
          className={role === 'advertiser' ? 'active' : ''}
          onClick={() => handleRoleChange('advertiser')}
        >
          Advertiser
        </button>
        {includeAdmin && (
          <button
            type="button"
            className={role === 'admin' ? 'active' : ''}
            onClick={() => handleRoleChange('admin')}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />
        </label>
        <label>
          <span>รหัสผ่าน</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </label>
        <button type="submit" className="button full">
          เข้าสู่ระบบ →
        </button>
      </form>

      {/* Quick Test Login Helpers */}
      <div className="quick-login-box">
        <span className="quick-title">⚡ ปุ่มทางลัดเข้าสู่ระบบสำหรับทดสอบ:</span>
        <div className="quick-buttons-row">
          <button
            type="button"
            className="quick-btn agent-quick"
            onClick={() => handleQuickLogin('agent')}
          >
            👤 ทดสอบเป็นนายหน้า (Agent)
          </button>
          <button
            type="button"
            className="quick-btn dealer-quick"
            onClick={() => handleQuickLogin('advertiser')}
          >
            🏪 ทดสอบเป็นเต็นท์ (Advertiser)
          </button>

          {includeAdmin && (
            <button
              type="button"
              className="quick-btn admin-quick"
              onClick={() => handleQuickLogin('admin')}
            >
              👑 ทดสอบเป็นแอดมิน (Admin)
            </button>
          )}
        </div>
      </div>
    </AuthLayoutCard>
  );
}

export default LoginForm;
