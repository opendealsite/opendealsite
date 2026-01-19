export interface Deal {
  id: string;
  title: string;
  dealPrice?: number | null;
  regPrice?: number | null;
  savedAmount?: number | null;
  percentOff?: number | null;
  imageLink: string;
  origDealLink: string;
  origDealDomain: string;
  hotValue: number;
  dateCreated: string;
  sourcePostLink?: string;
  description?: string;
  country: string | null;
  sourceSiteDomain?: string;
  sourcePostId?: string;
}

export type DealResponse = Deal[];

export interface EngageRequest {
  dealId: string;
  action: 'upvote' | 'click' | 'claim';
  userAgent?: string;
}

export interface EngageResponse {
  success: boolean;
  newHotValue: number;
}
