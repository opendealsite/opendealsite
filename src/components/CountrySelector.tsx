'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SUPPORTED_COUNTRIES } from '@/lib/constants';

interface CountrySelectorProps {
  currentCountry: string;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({ currentCountry }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    if (!pathname) return;
    
    const segments = pathname.split('/');
    // segments[0] is empty, segments[1] is the country
    if (segments.length >= 2) {
      segments[1] = newCountry;
      const newPath = segments.join('/');
      // Preserve search params
      const search = typeof window !== 'undefined' ? window.location.search : '';
      router.push(newPath + search);
    } else {
      // Fallback for root or unexpected paths
      router.push(`/${newCountry}`);
    }
  };

  if (!mounted) {
    return (
      <div className="h-9 w-16 bg-white/10 dark:bg-muted rounded animate-pulse" />
    );
  }

  return (
    <select
      value={currentCountry}
      onChange={handleCountryChange}
      className="rounded-md border border-white/20 bg-white/10 dark:border-border dark:bg-muted h-9 px-3 text-sm text-white dark:text-foreground focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:border-primary dark:focus:ring-primary transition-all uppercase"
      aria-label="Select country"
    >
      {Object.entries(SUPPORTED_COUNTRIES as Record<string, string>).map(([key, value]) => (
        <option key={value} value={value} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          {key}
        </option>
      ))}
    </select>
  );
};
