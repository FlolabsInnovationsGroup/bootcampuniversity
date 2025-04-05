import React from 'react';
import logoImage from '@/app/logo.png';

export function Logo() {
  return (
    <img
      src={logoImage.src}
      alt="Innovation Bootcamp University Logo"
      width={32}
      height={32}
      style={{
        width: '32px',
        height: '32px',
        objectFit: 'contain',
        display: 'block',
        filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))'
      }}
      className="transition-all duration-300 hover:filter-none"
    />
  );
} 