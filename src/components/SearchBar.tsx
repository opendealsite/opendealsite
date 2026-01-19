// src/components/SearchBar.tsx
'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  country: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ country }) => {
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
  );
};
