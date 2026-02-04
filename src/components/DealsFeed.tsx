'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Deal } from '@/types';
import { DealCard } from './DealCard';
import { ViewToggle } from './ViewToggle';
import { getCookie, setCookie } from '@/lib/utils';
import Link from 'next/link';
import { fetchDealsAction } from '@/app/actions';

interface DealsFeedProps {
  deals: Deal[];
  country: string;
  pageTitle: string;
  pageDescription: string;
  query?: string;
  hottest?: number;
}

export const DealsFeed: React.FC<DealsFeedProps> = ({ 
  deals: initialDeals, 
  country, 
  pageTitle, 
  pageDescription,
  query,
  hottest
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mounted, setMounted] = useState(false);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [offset, setOffset] = useState(initialDeals.length);
  const [hasMore, setHasMore] = useState(initialDeals.length === 20);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false); // Prevent race conditions

  const loadMore = useCallback(async () => {
    // Use ref to prevent race conditions
    if (loadingRef.current || !hasMore) return;
    
    loadingRef.current = true;
    setIsLoading(true);
    const limit = 20;
    
    try {
      const newDeals = await fetchDealsAction({
        query,
        hottest,
        offset,
        limit,
        country
      });

      if (newDeals.length < limit) {
        setHasMore(false);
      }

      if (newDeals.length > 0) {
        setDeals(prev => [...prev, ...newDeals]);
        setOffset(prev => prev + newDeals.length);
      }
    } catch (error) {
      console.error("Failed to load more deals:", error);
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [hasMore, query, hottest, offset, country]);

  // Reset local state when initial deals or search criteria change
  useEffect(() => {
    setDeals(initialDeals);
    setOffset(initialDeals.length);
    setHasMore(initialDeals.length === 20); // Reset hasMore based on new initial deals
    loadingRef.current = false;
    setIsLoading(false);
  }, [initialDeals, query, hottest]);

  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !loadingRef.current) {
          loadMore();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Trigger 100px before the element enters viewport
      }
    );

    const currentLoader = loaderRef.current;
    let timeoutId: number | undefined;
    if (currentLoader) {
      observer.observe(currentLoader);
      
      const triggerVisibleLoader = () => {
        if (!currentLoader || loadingRef.current) return;
        const rect = currentLoader.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          loadMore();
        }
      };

      timeoutId = window.setTimeout(triggerVisibleLoader, 100);
      triggerVisibleLoader();
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
      observer.disconnect();
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [loadMore, mounted]);

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
        <>
          <div className={viewMode === 'grid' ? "grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6" : "flex flex-col gap-4"}>
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} variant={viewMode} country={country} />
            ))}
          </div>
          
          {/* Loading Indicator / Observer Target */}
          <div ref={loaderRef} className="py-10 flex justify-center">
            {isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span>Loading more deals...</span>
              </div>
            ) : !hasMore && deals.length > 0 ? (
              <p className="text-muted-foreground italic">You've reached the end of the feed.</p>
            ) : null}
          </div>
        </>
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
