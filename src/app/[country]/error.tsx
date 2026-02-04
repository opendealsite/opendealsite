'use client';

import React, { useEffect, useState } from 'react';
import { ErrorLayout } from '@/components/ErrorLayout';
import { fetchDealsAction } from '@/app/actions';
import type { Deal } from '@/types';
import { useParams } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const country = (params?.country as string) || 'us';
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    console.error("Application Error:", error);

    // Fetch deals
    fetchDealsAction({
      country,
      hottest: 24,
      offset: 0,
      limit: 20
    }).then(setDeals).catch(err => console.error("Failed to load deals", err));
  }, [country, error]);

  return (
    <ErrorLayout
      country={country}
      title="Something Went Wrong"
      message="We apologize for the inconvenience. Please try again later."
      deals={deals}
      showReset={true}
      onReset={reset}
    />
  );
}
