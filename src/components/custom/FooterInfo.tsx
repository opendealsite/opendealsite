import React from 'react';
import Link from 'next/link';
import { THEME_CONFIG } from '@/lib/constants';

export const FooterInfo: React.FC = () => {
  const buildTag = process.env.NEXT_PUBLIC_BUILD_TAG || 'local';
  return (
    <footer className="border-t border-border bg-card py-6 mt-10">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              src={`${THEME_CONFIG.BRAND_LOGO}`}
              alt={`${THEME_CONFIG.BRAND_NAME} logo`}
              className="h-10 object-contain"
            />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {THEME_CONFIG.BRAND_NAME}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 max-w-md text-center md:text-left">
              Find the best deals from across the web, curated by the community. 
              We may earn a commission when you click on links to various merchants on this site.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium items-center">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <p className="text-xs text-muted-foreground/70 whitespace-nowrap">
              Powered by <a href="https://github.com/opendealsite/opendealsite" className="text-primary underline">OpenDealSite</a> {buildTag}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
