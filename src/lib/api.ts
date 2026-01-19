import type { Deal, DealResponse, EngageResponse } from '../types';
import { DEAL_API_BASE } from './constants';
import { env } from "@/env";

const CACHE_TTL = 600; // 10 minutes in seconds

type FetchOptions = RequestInit & {
  tags?: string[];
  revalidate?: number;
};

async function fetchWithCache<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { tags, revalidate = CACHE_TTL, headers, ...rest } = options;
  
  // Server-side fetch in Next.js automatically handles caching
  // We set next.revalidate to control freshness
  const res = await fetch(`${DEAL_API_BASE}${endpoint}`, {
    ...rest,
    headers: {
      ...headers,
      'Authorization': `Bearer ${env.DEAL_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: {
      revalidate,
      tags
    }
  });

  if (!res.ok) {
     // In a real app we might throw a better error or handle 404s
     // For migration, we keep it simple
     throw new Error(`API request to ${endpoint} failed: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  getDeals: async (query?: string | null, offset = 0, limit = 20, country = 'us') => {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      country
    });
    if (query) params.append('query', query);
    
    return fetchWithCache<DealResponse>(`/deals?${params.toString()}`, { tags: ['deals'] });
  },

  getHotDeals: async (hours = 24, limit = 20, country = 'us') => {
    return fetchWithCache<DealResponse>(`/hot?hours=${hours}&limit=${limit}&country=${country}`, { tags: ['deals', 'hot'] });
  },

  getDealById: async (id: string) => {
    return fetchWithCache<Deal>(`/deal/${id}`, { tags: [`deal-${id}`] });
  },

  engage: async (dealId: string, action: 'upvote' | 'click') => {
    const res = await fetch(`${DEAL_API_BASE}/engage`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.DEAL_API_TOKEN}`
      },
      body: JSON.stringify({ dealId, action }),
      cache: 'no-store' // Mutations should not be cached
    });
    if (!res.ok) throw new Error('Engagement failed');
    return await res.json() as EngageResponse;
  },
};

