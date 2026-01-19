export const getMerchantLogoUrl = (domain: string): string | null => {
  if (!domain) return null;

  return `https://ico.faviconkit.net/favicon/${domain}?sz=64`;
};
