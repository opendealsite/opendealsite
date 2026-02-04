import React, { Suspense } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { DealsFeed } from '@/components/DealsFeed';
import { FooterInfo } from '@/components/custom/FooterInfo';
import type { Deal } from '@/types';

interface ErrorLayoutProps {
  country: string;
  title: string;
  message: string;
  deals: Deal[];
  showReset?: boolean;
  onReset?: () => void;
}

export function ErrorLayout({ country, title, message, deals, showReset, onReset }: ErrorLayoutProps) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
       <div className='border-b border-border'>
          <Suspense fallback={<div className="h-16 bg-primary dark:bg-card" />}>
            <Header country={country} />
          </Suspense>
       </div>
       
       <main className="container mx-auto flex flex-1 flex-col gap-8 px-4 py-6">
         {/* Hero Section */}
         <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
           <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
           <p className="text-xl text-muted-foreground max-w-lg">{message}</p>
           
           <div className="w-full max-w-lg mt-8">
             <Suspense fallback={<div className="w-full h-12 bg-muted rounded-full" />}>
               <SearchBar 
                 country={country} 
                 className="relative w-full flex text-lg" 
               />
             </Suspense>
           </div>
           
           {showReset && onReset && (
             <button 
               onClick={onReset}
               className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
             >
               Try Again
             </button>
           )}
         </div>

         {/* Hot Deals List */}
         <div className="mt-8">
           <DealsFeed 
             deals={deals} 
             country={country}
             hottest={24}
             pageTitle="Hottest Deals (24h)"
             pageDescription="Don't miss out on these trending offers."
           />
         </div>
       </main>

       <FooterInfo country={country} />
    </div>
  );
}
