import React, { useState } from 'react';

export function ToggleSwitch({ label, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button className="toggle-row" onClick={() => setOn(!on)}>
      <span>{label}</span>
      <i className={on ? 'on' : ''}>
        <b />
      </i>
    </button>
  );
}

export default ToggleSwitch;
