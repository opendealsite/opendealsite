import React from 'react';

export const SidebarSquareAd: React.FC = () => {
  return (
    <div className="w-full justify-center">
      <div className="mb-6 w-full bg-muted rounded flex items-center justify-center text-muted-foreground py-4">
        Text Advertisement
      </div>
      <div className="h-[250px] w-full bg-muted rounded flex items-center justify-center text-muted-foreground">
        Advertisement (300x250)
      </div>
    </div>
  );
};

export const SidebarStickyAd: React.FC = () => {
  return (
    <div className="sticky top-24 w-full flex justify-center">
      <div className="h-[400px] w-full bg-muted rounded flex items-center justify-center text-muted-foreground text-center p-4">
        Vertical Banner Ad<br/>(300x600)
      </div>
    </div>
  );
};
