import React from 'react';
import Logo from '../common/Logo';

export function AuthLayoutCard({ title, subtitle, onBack, children }) {
  return (
    <div className="auth-page">
      <button className="back-button" onClick={onBack}>
        ← กลับหน้าหลัก
      </button>
      <div className="auth-card">
        <Logo />
        <div className="auth-heading">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayoutCard;
