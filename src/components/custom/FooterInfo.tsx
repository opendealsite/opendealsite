import React from 'react';
import Link from 'next/link';
import { THEME_CONFIG } from '@/lib/constants';

interface FooterInfoProps {
  country?: string;
}

export const FooterInfo: React.FC<FooterInfoProps> = ({ country }) => {
  const buildTag = process.env.NEXT_PUBLIC_BUILD_TAG || 'local';
  return (
    <footer className="border-t border-transparent dark:border-border bg-primary dark:bg-card py-6 mt-10 transition-colors duration-200">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              src={`${THEME_CONFIG.BRAND_LOGO}`}
              alt={`${THEME_CONFIG.BRAND_NAME} logo`}
              className="h-10 object-contain"
            />
            <p className="text-sm text-white dark:text-foreground">
              &copy; {new Date().getFullYear()} {THEME_CONFIG.BRAND_NAME}. All rights reserved.
            </p>
            <p className="text-xs text-white/80 dark:text-foreground/70 max-w-md text-center md:text-left">
              Find the best deals from across the web, curated by the community. 
              We may earn a commission when you click on links to various merchants on this site.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium items-center">
            {country && (
              <Link href={`/${country}/feeds`} className="text-white/90 hover:text-white dark:text-foreground dark:hover:text-primary transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.797 1.456-3.248 3.252-3.248 1.795.001 3.251 1.452 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.063-8.71-7.127-15.774-15.839-15.82zm0-8.18v4.83c10.555.069 19.108 8.622 19.177 19.172h4.823c-.07-13.213-10.783-23.924-24-24.002z"/></svg>
                RSS Feed
              </Link>
            )}
            <Link href="/privacy" className="text-white/90 hover:text-white dark:text-foreground dark:hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/90 hover:text-white dark:text-foreground dark:hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="text-white/90 hover:text-white dark:text-foreground dark:hover:text-primary transition-colors">
              About Us
            </Link>
            <p className="text-xs text-white/80 dark:text-foreground/70 whitespace-nowrap">
              Powered by <a href="https://github.com/opendealsite/opendealsite" className="text-primary underline">OpenDealSite</a> {buildTag}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
