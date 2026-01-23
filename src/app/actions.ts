'use server';

import { api } from '@/lib/api';

export async function engageAction(dealId: string, action: 'upvote' | 'click') {
  try {
    return await api.engage(dealId, action);
  } catch (error) {
    console.error('Failed to engage:', error);
    return { success: false, error: 'Engagement failed' };
  }
}

export async function fetchDealsAction(options: {
  query?: string;
  hottest?: number;
  offset: number;
  limit: number;
  country: string;
}) {
  const { query, hottest, offset, limit, country } = options;
  
  try {
    // Explicitly handle each mode to ensure correct API calls
    if (query && query.trim().length > 0) {
      return await api.getDeals(query, offset, limit, country);
    } else if (hottest !== undefined && hottest !== null) {
      return await api.getHotDeals(hottest, offset, limit, country);
    } else {
      // Fallback to latest deals
      return await api.getDeals(null, offset, limit, country);
    }
  } catch (error) {
    console.error('Failed to fetch deals in action:', error);
    return [];
  }
}
