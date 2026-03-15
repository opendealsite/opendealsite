// src/components/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { THEME_CONFIG } from '../lib/constants';
import { ThemeToggle } from './ThemeToggle';
import { CountrySelector } from './CountrySelector';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  country: string;
}

const navLinkClass =
  'text-sm font-medium text-white/90 hover:text-white dark:text-foreground dark:hover:text-primary transition-colors';

const mobileNavLinkClass =
  'block px-4 py-3 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 dark:text-foreground dark:hover:text-primary dark:hover:bg-muted transition-colors';

export const Header: React.FC<HeaderProps> = ({ country }) => {
  const altText = `${THEME_CONFIG.BRAND_NAME} logo`;
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent dark:border-border bg-primary dark:bg-card shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex-none">
          <Link href={`/${country}`} onClick={closeMenu} className="flex items-center gap-2 font-bold text-xl tracking-tight text-white dark:text-primary transition-colors">
            <img src={`${THEME_CONFIG.BRAND_LOGO}`} alt={altText} className="h-10 object-contain" />
            <span>{THEME_CONFIG.BRAND_NAME}</span>
          </Link>
        </div>

        {/* Center: Nav (hidden on mobile) */}
        <nav className="hidden md:flex flex-1 justify-center gap-6 items-center">
          <Link href={`/${country}`} className={navLinkClass}>
            Latest
          </Link>
          <Link href={`/${country}?hottest=6`} className={`${navLinkClass} flex items-center gap-1`}>
            <span>🔥</span><span>6h</span>
          </Link>
          <Link href={`/${country}?hottest=12`} className={`${navLinkClass} flex items-center gap-1`}>
            <span>🔥</span><span>12h</span>
          </Link>
          <Link href={`/${country}?hottest=24`} className={`${navLinkClass} flex items-center gap-1`}>
            <span>🔥</span><span>24h</span>
          </Link>
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
        </nav>

        {/* Right Side: Search, Country, Theme Toggle, Hamburger */}
        <div className="flex-none flex items-center gap-3">
          {/* Search Bar */}
          <SearchBar country={country} />

          {/* Country Selector */}
          <CountrySelector currentCountry={country} />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={`block h-0.5 w-5 bg-white dark:bg-foreground transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-white dark:bg-foreground transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-white dark:bg-foreground transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-white/10 dark:border-border bg-primary dark:bg-card">
          {/* Mobile Search */}
          <div className="px-4 py-3">
            <SearchBar country={country} className="flex relative w-full" />
          </div>
          <Link href={`/${country}`} onClick={closeMenu} className={mobileNavLinkClass}>
            Latest
          </Link>
          <Link href={`/${country}?hottest=6`} onClick={closeMenu} className={mobileNavLinkClass}>
            🔥 Hottest 6h
          </Link>
          <Link href={`/${country}?hottest=12`} onClick={closeMenu} className={mobileNavLinkClass}>
            🔥 Hottest 12h
          </Link>
          <Link href={`/${country}?hottest=24`} onClick={closeMenu} className={mobileNavLinkClass}>
            🔥 Hottest 24h
          </Link>
          <Link href="/about" onClick={closeMenu} className={mobileNavLinkClass}>
            About
          </Link>
        </nav>
      )}
    </header>
  );
};
