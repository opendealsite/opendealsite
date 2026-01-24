// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { THEME_CONFIG } from '../lib/constants';
import { ThemeToggle } from './ThemeToggle';
import { CountrySelector } from './CountrySelector';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  country: string;
}

export const Header: React.FC<HeaderProps> = ({ country }) => {
  const altText = `${THEME_CONFIG.BRAND_NAME} logo`;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent dark:border-border bg-primary dark:bg-card shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex-none">
          <Link href={`/${country}`} className="flex items-center gap-2 font-bold text-xl tracking-tight text-white dark:text-primary transition-colors">
            <img src={`${THEME_CONFIG.BRAND_LOGO}`} alt={altText} className="h-10 object-contain" />
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
          <SearchBar country={country} />

          {/* Country Selector */}
          <CountrySelector currentCountry={country} />

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
