// src/components/DealCard.tsx
import React from 'react';
import Link from 'next/link';
import type { Deal } from '../types';
import { formatRelativeTime } from '../lib/utils';
import { getMerchantLogoUrl } from '../lib/merchantLogos';
import { ExternalDealLink } from './ExternalDealLink';

interface DealCardProps {
  deal: Deal;
  variant?: 'grid' | 'list';
  priority?: boolean;
  country?: string;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, variant = 'grid', country = 'us' }) => {
  const merchantLogo = getMerchantLogoUrl(deal.origDealDomain);
  const isList = variant === 'list';
  
  return (
    <div className={`group relative flex bg-card hover:bg-muted/50 border border-border rounded-xl overflow-hidden transition-all duration-200 ${
      isList ? 'flex-row' : 'flex-col'
    }`}>
      
      {/* Image Section */}
      <ExternalDealLink 
        href={deal.origDealLink}
        dealId={deal.id}
        className={`relative overflow-hidden bg-gray-100 shrink-0 ${
          isList ? 'w-20 h-20 sm:w-48 sm:h-48' : 'aspect-square w-full'
        }`}
      >
        {deal.imageLink ? (
          <img
            src={deal.imageLink}
            alt={deal.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground/30">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {deal.percentOff && deal.percentOff > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
            {deal.percentOff}% OFF
          </div>
        )}
      </ExternalDealLink>

      {/* Content Section */}
      <div className={`flex flex-col flex-1 min-w-0 ${isList ? 'p-2 sm:p-4' : 'p-3 sm:p-4'}`}>
        
        {/* Meta Header */}
        <div className={`flex items-center gap-2 mb-1.5 text-muted-foreground ${isList ? 'text-[9px] sm:text-xs' : 'text-[10px] sm:text-xs'}`}>
           {merchantLogo && (
             <img src={merchantLogo} alt={deal.origDealDomain} className={`${isList ? 'w-3 h-3 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-6 sm:h-6'} object-contain`} />
           )}
           <span className="truncate">{deal.origDealDomain}</span>
           <span>•</span>
           <Link href={`/${country}/deal/${deal.slug || 'deal'}/${deal.id}`} target='_blank' className="hover:text-primary transition-colors">
             {formatRelativeTime(deal.dateCreated)}
           </Link>
        </div>

        {/* Title */}
        <h3 className={`font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors ${
          isList ? 'text-xs sm:text-lg' : 'text-sm sm:text-base'
        }`}>
          <ExternalDealLink href={deal.origDealLink} dealId={deal.id}>
            {deal.title}
          </ExternalDealLink>
        </h3>

        {/* Pricing */}
        <div className="mt-auto flex items-baseline gap-2 flex-wrap">
          {deal.dealPrice && (
             <>
               <span className={`font-bold text-red-500 ${isList ? 'text-lg sm:text-xl' : 'text-base sm:text-xl'}`}>${deal.dealPrice}</span>
               {deal.regPrice && (
                 <span className={`text-muted-foreground line-through ${isList ? 'text-[10px] sm:text-sm' : 'text-[10px] sm:text-sm'}`}>${deal.regPrice}</span>
               )}
               <span className="text-[10px] text-muted-foreground font-normal">
                 (as of {new Date(deal.dateCreated).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York' })} ET)
               </span>
             </>
          )}
        </div>

        {/* Actions & Hotness */}
        <div className={`mt-auto pt-3 border-t border-border flex ${isList ? 'flex-row items-center justify-between gap-4' : 'flex-col gap-3'}`}>
            {/* Hotness Progress Bar */}
            <div className="flex flex-col flex-1" title={`Hotness: ${deal.hotValue} / 800`}>
                <div className="flex justify-between items-end mb-1">
                    <span className="text-xs font-bold text-red-500 dark:text-red-400 flex items-center gap-1.5 leading-none">
                         <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Hot</span>
                         {deal.hotValue}°
                    </span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-linear-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${Math.min((deal.hotValue / 800) * 100, 100)}%` }} 
                    />
                </div>
            </div>

            <div className={`flex gap-1.5 ${isList ? 'shrink-0' : 'w-full'}`}>
                <button 
                    className={`${isList ? 'w-10' : 'flex-1'} flex items-center justify-center rounded-md border border-border p-1.5 transition-colors text-muted-foreground hover:bg-muted hover:text-red-600`}
                    aria-label="Upvote this deal"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                </button>
                <ExternalDealLink 
                    href={deal.origDealLink} 
                    dealId={deal.id}
                    className={`${isList ? 'px-4' : 'flex-2'} text-center rounded-md bg-primary py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap`}
                >
                    Get Deal
                </ExternalDealLink>
            </div>
        </div>
      </div>
    </div>
  );
};

