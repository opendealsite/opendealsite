import React from 'react';
import Link from 'next/link';
import { THEME_CONFIG } from '@/lib/constants';

export const FooterInfo: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card py-6 mt-10">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/favicon.ico" alt="Logo" className="w-8 h-8 object-contain mb-2" />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {THEME_CONFIG.BRAND_NAME}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 max-w-md text-center md:text-left">
              Find the best deals from across the web, curated by the community. 
              We may earn a commission when you click on links to various merchants on this site.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
