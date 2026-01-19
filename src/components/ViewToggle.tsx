'use client';

import React from 'react';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onToggle: (mode: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => {
  return (
    <div className="flex items-center bg-card border border-border rounded-lg p-1">
      <button 
        onClick={() => onToggle('grid')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'grid' 
            ? 'bg-primary text-white shadow-sm' 
            : 'text-muted-foreground hover:bg-muted'
        }`}
        aria-label="Grid view"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>
      <button 
        onClick={() => onToggle('list')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'list' 
            ? 'bg-primary text-white shadow-sm' 
            : 'text-muted-foreground hover:bg-muted'
        }`}
        aria-label="List view"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
};
