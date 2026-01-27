import type { Deal, DealResponse, EngageResponse } from '../types';
import { DEAL_API_BASE, DEAL_API_ENDPOINTS } from './constants';
import { env } from "@/env";
import { getAffiliateLink } from './link/LinkService';

const CACHE_TTL = 300;

/**
 * Process deals to apply affiliate links before returning to the UI
 */
const withAffiliateLinks = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(deal => ({
      ...deal,
      origDealLink: getAffiliateLink(deal.origDealLink)
    }));
  }
  if (data && typeof data === 'object' && 'origDealLink' in data) {
    return {
      ...data,
      origDealLink: getAffiliateLink(data.origDealLink)
    };
  }
  return data;
};

type FetchOptions = RequestInit & {
  tags?: string[];
  revalidate?: number;
};

async function fetchWithCache<T>(endpoint: string, queryString: string = '', options: FetchOptions = {}): Promise<T> {
  const { tags = [], revalidate = CACHE_TTL, headers, ...rest } = options;
  
  // Build URL with logic for query string separator
  const baseUrl = `${DEAL_API_BASE}${endpoint}`;
  let url = baseUrl;
  if (queryString && queryString !== '?') {
    url = baseUrl.includes('?') 
      ? `${baseUrl}&${queryString.startsWith('?') ? queryString.substring(1) : queryString}`
      : `${baseUrl}${queryString.startsWith('?') ? queryString : `?${queryString}`}`;
  }

  const fetchTags = [...tags, queryString].filter(Boolean);

  const res = await fetch(url, {
    ...rest,
    headers: {
      ...headers,
      'Authorization': `Bearer ${env.DEAL_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: {
      revalidate,
      tags: fetchTags
    }
  });

  if (!res.ok) {
     // In a real app we might throw a better error or handle 404s
     // For migration, we keep it simple
     throw new Error(`API request to ${url} failed: ${res.statusText}`);
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
    if (query) params.append('q', query);
    
    const queryString = `?${params.toString()}`;
    const deals = await fetchWithCache<DealResponse>(DEAL_API_ENDPOINTS.DEALS, queryString, { tags: ['deals'] });
    return withAffiliateLinks(deals);
  },

  getHotDeals: async (hours = 24, offset = 0, limit = 20, country = 'us') => {
    const params = new URLSearchParams({
      hottest: hours.toString(),
      offset: offset.toString(),
      limit: limit.toString(),
      country
    });
    const queryString = `?${params.toString()}`;
    const deals = await fetchWithCache<DealResponse>(DEAL_API_ENDPOINTS.DEALS, queryString, { tags: ['deals', 'hot'] });
    return withAffiliateLinks(deals);
  },

  getDealById: async (id: string, country = 'us') => {
    // The DEAL_API_ENDPOINTS.DEALS might contain query parameters (e.g., /api/deals?forSites=xxx)
    // We need to extract the base path to append the ID correctly
    const parts = DEAL_API_ENDPOINTS.DEALS.split('?');
    const basePath = parts[0];
    const extraParams = parts[1];
    
    const endpoint = `${basePath}/${id}`;
    let queryString = country ? `country=${country}` : '';
    if (extraParams) {
      queryString = queryString ? `${extraParams}&${queryString}` : extraParams;
    }

    const result = await fetchWithCache<any>(endpoint, queryString, { tags: [`deal-${id}`] });
    
    // Some APIs return a single object, others an array of one, others a wrapped object (data or deal)
    const deal = Array.isArray(result) ? result[0] : (result?.data || result?.deal || result);
    
    return withAffiliateLinks(deal);
  },

  engage: async (dealId: string, action: 'upvote' | 'click') => {
    const res = await fetch(`${DEAL_API_BASE}${DEAL_API_ENDPOINTS.DEALS_ENGAGE}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.DEAL_API_TOKEN}`
      },
      body: JSON.stringify({ id: dealId, action }),
      cache: 'no-store' // Mutations should not be cached
    });
    if (!res.ok) throw new Error('Engagement failed');
    return await res.json() as EngageResponse;
  },
};

