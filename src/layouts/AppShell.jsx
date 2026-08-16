import React from 'react';
import Logo from '../components/common/Logo';

export function AppShell({ role, name, tabs, activeTab, onTab, onLogout, children }) {
  return (
    <div className="app-shell">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <Logo />
        <div className="role-chip">{role}</div>
        <nav>
          {tabs.map((item) => (
            <button
              key={item.id}
              className={activeTab === item.id ? 'active' : ''}
              onClick={() => onTab(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-user">
          <div className="user-avatar">{name ? name[0] : 'U'}</div>
          <div>
            <strong>{name}</strong>
            <small>ดูโปรไฟล์</small>
          </div>
          <button type="button" onClick={onLogout} title="ออกจากระบบ">
            ↪
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="app-main">
        <header className="app-header">
          <Logo compact />
          <div>
            <span className="status-dot" /> ระบบต้นแบบ
          </div>
          <button type="button" onClick={onLogout}>
            ออกจากระบบ
          </button>
        </header>

        {children}
      </div>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="bottom-nav">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={activeTab === item.id ? 'active' : ''}
            onClick={() => onTab(item.id)}
          >
            <span>{item.icon}</span>
            <small>{item.label}</small>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default AppShell;
