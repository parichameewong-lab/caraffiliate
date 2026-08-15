import React from 'react';

export function IconBox({ children }) {
  return (
    <span className="icon-box" aria-hidden="true">
      {children}
    </span>
  );
}

export default IconBox;
