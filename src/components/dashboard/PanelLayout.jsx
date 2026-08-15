import React from 'react';

export function PanelLayout({ title, subtitle, children }) {
  return (
    <>
      <div className="page-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <section className="panel standalone">{children}</section>
    </>
  );
}

export default PanelLayout;
