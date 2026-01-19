// src/components/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { THEME_CONFIG } from '../lib/constants';
import { ThemeToggle } from './ThemeToggle';
import { CountrySelector } from './CountrySelector';

interface HeaderProps {
  country: string;
}

export const Header: React.FC<HeaderProps> = ({ country }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/${country}?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent dark:border-border bg-primary dark:bg-card shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex-none">
          <Link href={`/${country}`} className="flex items-center gap-2 font-bold text-xl tracking-tight text-white dark:text-primary transition-colors">
            <span>{THEME_CONFIG.BRAND_NAME}</span>
          </Link>
        </div>

        {/* Center: Nav (hidden on mobile) */}
        <nav className="hidden md:flex flex-1 justify-center gap-8 items-center">
          <Link href={`/${country}`} className="text-sm font-medium text-white/90 hover:text-white dark:text-foreground dark:hover:text-primary transition-colors">
            Latest
          </Link>
          <Link href={`/${country}?hottest=24`} className="text-sm font-medium text-white/90 hover:text-white dark:text-foreground dark:hover:text-primary transition-colors flex items-center gap-1">
            <span>Hot</span>
            <span className="text-xs">🔥</span>
          </Link>
          <Link href="/about" className="text-sm font-medium text-white/90 hover:text-white dark:text-foreground dark:hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        {/* Right Side: Search, Country, Theme Toggle */}
        <div className="flex-none flex items-center gap-3">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex relative w-48">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-4 pr-10 rounded-full border border-white/20 bg-white/10 dark:border-border dark:bg-muted text-sm text-white dark:text-foreground placeholder:text-white/60 dark:placeholder:text-muted-foreground focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:border-primary dark:focus:ring-primary transition-all"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white dark:text-muted-foreground dark:hover:text-foreground"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </form>

          {/* Country Selector */}
          <CountrySelector currentCountry={country} />

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
