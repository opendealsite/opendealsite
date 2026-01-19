// src/components/ExternalDealLink.tsx
'use client';

import React from 'react';

interface ExternalDealLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const ExternalDealLink: React.FC<ExternalDealLinkProps> = ({ href, className, children }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  );
};
