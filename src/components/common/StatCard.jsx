import React from 'react';

export function StatCard({ label, value, note, icon, orange = false }) {
  return (
    <article className="stat-card">
      <div className={orange ? 'stat-icon orange-bg' : 'stat-icon'}>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small className={orange ? 'orange-text' : 'green-text'}>{note}</small>
    </article>
  );
}

export default StatCard;
