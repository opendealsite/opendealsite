import React from 'react';
import { ADS_CONFIG } from '@/lib/constants';

export const SidebarTextAd: React.FC = () => {
  return (
    <div className="w-full justify-center">
      <div className={`${ADS_CONFIG.SIDEBAR_TEXT_AD.HEIGHT_CLASS} w-full bg-muted rounded flex items-center justify-center text-muted-foreground`}>
        <div dangerouslySetInnerHTML={{ __html: ADS_CONFIG.SIDEBAR_TEXT_AD.CONTENT }} />
      </div>
    </div>
  );
};
export const SidebarSquareAd: React.FC = () => {
  return (
    <div className="w-full justify-center">
      <div className={`${ADS_CONFIG.SIDEBAR_SQUARE_AD.HEIGHT_CLASS} w-full bg-muted rounded flex items-center justify-center text-muted-foreground`}>
        <div dangerouslySetInnerHTML={{ __html: ADS_CONFIG.SIDEBAR_SQUARE_AD.CONTENT }} />
      </div>
    </div>
  );
};

export const SidebarStickyAd: React.FC = () => {
  return (
    <div className="sticky top-24 w-full flex justify-center">
      <div 
        className={`${ADS_CONFIG.SIDEBAR_STICKY_AD.HEIGHT_CLASS} w-full bg-muted rounded flex items-center justify-center text-muted-foreground text-center p-4`}
        dangerouslySetInnerHTML={{ __html: ADS_CONFIG.SIDEBAR_STICKY_AD.CONTENT }}
      />
    </div>
  );
};
