'use client';

import React, { useState, useEffect } from 'react';
import type { Deal } from '@/types';
import { DealCard } from './DealCard';
import { ViewToggle } from './ViewToggle';
import { getCookie, setCookie } from '@/lib/utils';
import Link from 'next/link';

interface DealsFeedProps {
  deals: Deal[];
  country: string;
  pageTitle: string;
  pageDescription: string;
}

export const DealsFeed: React.FC<DealsFeedProps> = ({ 
  deals, 
  country, 
  pageTitle, 
  pageDescription 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getCookie('view_mode');
    if (saved === 'list' || saved === 'grid') {
      setViewMode(saved);
    }
  }, []);

  const handleViewToggle = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    setCookie('view_mode', mode);
  };

  if (!mounted) {
    return (
      <div className="flex-1">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{pageTitle}</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.slice(0, 6).map((deal) => (
            <div key={deal.id} className="h-80 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl flex items-center gap-3">
              {pageTitle}
              <span className="text-lg font-normal text-muted-foreground uppercase tracking-wider bg-muted px-2 py-1 rounded-md">
                {country}
              </span>
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {pageDescription}
            </p>
          </div>
          
          <ViewToggle viewMode={viewMode} onToggle={handleViewToggle} />
        </div>
      </div>

      {/* Content Feed */}
      {deals.length > 0 ? (
        <div className={viewMode === 'grid' ? "grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6" : "flex flex-col gap-4"}>
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} variant={viewMode} country={country} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold mb-2">No deals found</h2>
          <p className="text-muted-foreground mb-6">Try adjusting your filters or check back later.</p>
          <Link href={`/${country}`} className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};
