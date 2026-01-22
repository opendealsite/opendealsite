// src/components/ExternalDealLink.tsx
'use client';

import React from 'react';
import { engageAction } from '@/app/actions';

interface ExternalDealLinkProps {
  href: string;
  dealId?: string;
  className?: string;
  children: React.ReactNode;
}

export const ExternalDealLink: React.FC<ExternalDealLinkProps> = ({ href, dealId, className, children }) => {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (dealId) {
      // Trigger engagement asynchronously - don't block navigation
      engageAction(dealId, 'click').catch(err => console.error('Engage failed:', err));
    }
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
