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
