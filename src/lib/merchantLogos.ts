export const getMerchantLogoUrl = (domain: string): string | null => {
  if (!domain) return null;

  // Extract last 2 sections of domain (e.g., shop.asus.com -> asus.com)
  const parts = domain.split('.');
  const simplifiedDomain = parts.length > 1 ? parts.slice(-2).join('.') : domain;

  return `https://ico.faviconkit.net/favicon/${simplifiedDomain}?sz=64`;
};
