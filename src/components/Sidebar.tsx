// src/components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import type { Deal } from '../types';
import { SidebarSquareAd, SidebarStickyAd, SidebarTextAd } from './ads/SidebarAds';

interface SidebarProps {
  country: string;
  trendingDeals?: Deal[];
}

export const Sidebar: React.FC<SidebarProps> = ({ country, trendingDeals = [] }) => {
  const MAX_HOT_VALUE = 800;

  return (
    <aside className="w-full lg:w-96 shrink-0">
      <div className="lg:sticky lg:top-6 flex flex-col gap-6">

        <SidebarTextAd />
        
        {/* Ad Space 1 */}
        <SidebarSquareAd />

        {/* Trending Deals Widget */}
        {trendingDeals.length > 0 && (
          <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/50">
              <h3 className="font-bold text-foreground">Trending Now</h3>
            </div>
            <div className="divide-y divide-border">
              {trendingDeals.slice(0, 8).map(deal => {
                const progressPercentage = Math.min((deal.hotValue / MAX_HOT_VALUE) * 100, 100);
                
                return (
                  <Link 
                    href={`/${country}/deal/${deal.slug || 'deal'}/${deal.id}`} 
                    key={deal.id} 
                    className="flex gap-3 p-3 hover:bg-muted transition-colors"
                  >
                    {deal.imageLink ? (
                      <img 
                        src={deal.imageLink} 
                        alt="" 
                        className="w-16 h-16 object-cover rounded bg-muted shrink-0" 
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center rounded bg-muted shrink-0 text-muted-foreground/30">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-snug mb-auto">
                        {deal.title}
                      </h4>
                      
                      <div className="mt-2">
                        <div className="flex items-end justify-between gap-2 mb-1">
                          {deal.dealPrice != null && (
                            <span className="text-red-600 dark:text-red-400 font-bold text-sm leading-none">
                              ${deal.dealPrice.toFixed(0)}
                            </span>
                          )}
                          <span className="text-xs font-bold text-red-600 dark:text-red-400 ml-auto leading-none">
                            {deal.hotValue}°
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-linear-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${progressPercentage}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="p-3 bg-muted/50 text-center">
              <Link href={`/${country}?hottest=24`} className="text-sm font-medium text-primary hover:underline">
                View All Hot Deals
              </Link>
            </div>
          </div>
        )}

        {/* Ad Space 2 */}
        <SidebarStickyAd />

      </div>
    </aside>
  );
};
