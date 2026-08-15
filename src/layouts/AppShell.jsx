import React from 'react';
import Logo from '../components/common/Logo';

export function AppShell({ role, name, tabs, activeTab, onTab, onLogout, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Logo />
        <div className="role-chip">{role}</div>
        <nav>
          {tabs.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${item.id === activeTab ? 'active' : ''}`}
              onClick={() => onTab(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="logout-button" onClick={onLogout}>
          ← ออกจากระบบ
        </button>
      </aside>
      <main className="main-content">
        <header className="top-bar">
          <div>
            <strong>ยินดีต้อนรับ, {name}</strong>
          </div>
        </header>
        <div className="content-container">{children}</div>
      </main>
    </div>
  );
}

export default AppShell;
