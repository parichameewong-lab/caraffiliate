import React, { useState } from 'react';
import Logo from '../components/common/Logo';

export function Header({ onRegister, onAdvertiserRegister, onLogin, onMobileLogin }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="public-header market-header container">
      <Logo />
      <nav className="desktop-nav">
        <a href="#cars">รถทั้งหมด</a>
        <a href="#buying">วิธีซื้อรถ</a>
        <button className="button small marketplace-cta" onClick={onAdvertiserRegister}>
          ลงขายรถกับเรา
        </button>
      </nav>

      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label="เปิดเมนูหลัก"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span aria-hidden="true">☰</span>เมนู
      </button>

      {mobileOpen && (
        <nav id="mobile-main-menu" className="mobile-main-menu" aria-label="เมนูหลักบนมือถือ">
          <a href="#cars" onClick={() => setMobileOpen(false)}>
            รถทั้งหมด
          </a>
          <a href="#buying" onClick={() => setMobileOpen(false)}>
            วิธีซื้อรถ
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onAdvertiserRegister();
            }}
          >
            ลงขายรถกับเรา
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onRegister();
            }}
          >
            สมัครนายหน้า
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onMobileLogin();
            }}
          >
            เข้าสู่ระบบ
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
