import React from 'react';

export function Logo({ compact = false }) {
  return (
    <div className="logo-lockup clubrod-logo" aria-label="CLUBROD ชุมชนคนรถมือสอง">
      <span className="logo-mark">
        <span>C</span>
      </span>
      {!compact && (
        <span className="logo-word">
          CLUB<span>ROD</span>
          <small>ชุมชนคนรถมือสอง</small>
        </span>
      )}
    </div>
  );
}

export default Logo;
