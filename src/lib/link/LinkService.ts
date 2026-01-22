import { CONFIG } from '../constants';
import { getAppenderLink } from "./AppenderLinkService";
import { getWrapperLink } from "./WrapperLinkService";

/**
 * Fetches merchant affiliate configuration from the application config.
 * 
 * @param domain The domain to look up
 * @returns An object containing the provider type and affiliate info (template or tags)
 */
const fetchMerchantFromConfig = (domain: string) => {
  const providers = CONFIG.AFFILIATE_PROVIDERS;
  if (!providers) return null;

  // Search in WRAPPER (e.g., Home Depot, Best Buy)
  if (providers.WRAPPER) {
    const wrapper = providers.WRAPPER as Record<string, string>;
    const matched = Object.keys(wrapper).find(d => domain === d || domain.endsWith(`.${d}`));
    if (matched) {
      return {
        type: 'WRAPPER' as const,
        affiliatedInfo: wrapper[matched] as string
      };
    }
  }

  // Search in APPENDER (e.g., Amazon, eBay)
  if (providers.APPENDER) {
    const appender = providers.APPENDER as Record<string, string>;
    const matched = Object.keys(appender).find(d => domain === d || domain.endsWith(`.${d}`));
    if (matched) {
      return {
        type: 'APPENDER' as const,
        affiliatedInfo: appender[matched] as string
      };
    }
  }

  return null;
};

/**
 * Converts a direct deal link into an affiliated link.
 * Logic is driven by the centralized config file.
 * 
 * @param link The original deal link
 * @returns The affiliated link, or original link if no provider matches
 */
export const getAffiliateLink = (link: string): string => {
  if (!link) return link;

  try {
    const url = new URL(link);
    let domain = url.hostname.replace(/^www\./, "");

    // Specific domain normalization (e.g. sub.woot.com -> woot.com)
    if (["woot.com"].some((d) => domain.includes(d))) {
      const domainParts = domain.split(".");
      domain = domainParts.slice(-2).join(".");
    }

    const merchant = fetchMerchantFromConfig(domain);
    
    // Apply fallback if no specific merchant is matched
    if (!merchant) {
      const fallback = (CONFIG.AFFILIATE_PROVIDERS as any)?.FALLBACK;
      if (fallback) {
        return getWrapperLink(link, fallback);
      }
      return link;
    }

    switch (merchant.type) {
      case 'WRAPPER':
        return getWrapperLink(link, merchant.affiliatedInfo);
      case 'APPENDER':
        return getAppenderLink(link, merchant.affiliatedInfo);
      default:
        return link;
    }
  } catch (error) {
    console.error(`Failed to generate affiliate link for ${link}:`, error);
    return link;
  }
};
