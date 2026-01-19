import React, { Suspense } from 'react';
import { api } from '@/lib/api';
import type { Deal } from '@/types';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { DealsFeed } from '@/components/DealsFeed';
import { FooterInfo } from '@/components/custom/FooterInfo';

// Type for Next.js 15+ Params (Async) or prior (Sync)
type Props = {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { country } = await params;
  const resolvedSearchParams = await searchParams;
  
  const query = resolvedSearchParams?.q as string | undefined;
  const hours = resolvedSearchParams?.hottest 
    ? parseInt(resolvedSearchParams.hottest as string) 
    : undefined;
  
  // Decide which data fetch method to use based on URL state
  let deals: Deal[] = [];
  let pageTitle = "Latest Drops";
  let pageDescription = "Latest hot deals";

  try {
    if (query) {
      deals = await api.getDeals(query, 0, 20, country);
      pageTitle = `Results for "${query}"`;
      pageDescription = `Search results for deals matching "${query}"`;
    } else if (hours) {
      deals = await api.getHotDeals(hours, 20, country);
      pageTitle = "Hottest Deals";
      pageDescription = `Hottest deals from the last ${hours} hours.`;
    } else {
      deals = await api.getDeals(null, 0, 20, country);
    }
  } catch (error) {
    console.error("Failed to fetch deals:", error);
    deals = [];
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Suspense fallback={<header className="h-16 border-b border-border bg-background" />}>
        <Header country={country} />
      </Suspense>
      
      <main className="container mx-auto px-4 py-6 flex-1 flex flex-col lg:flex-row gap-8">
         <DealsFeed 
            deals={deals} 
            country={country} 
            pageTitle={pageTitle} 
            pageDescription={pageDescription} 
         />

         {/* Sidebar */}
         <Sidebar country={country} trendingDeals={deals} />
      </main>

      <FooterInfo />
    </div>
  );
}

