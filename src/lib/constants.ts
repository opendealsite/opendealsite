import defaultConfig from '../../config.default.json';

// In T3/Next.js, we should use src/env.js for environment variables.
// For now, this mimics the "override" requirement.

export const CONFIG = {
  ...defaultConfig,
  THEME_CONFIG: {
    ...defaultConfig.THEME_CONFIG,
    BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME || defaultConfig.THEME_CONFIG.BRAND_NAME,
    STYLE_DEAL_CARD: process.env.NEXT_PUBLIC_STYLE_DEAL_CARD || defaultConfig.THEME_CONFIG.STYLE_DEAL_CARD,
  }
};

// Re-export specific sections for convenience if needed, matching original constants.ts structure
export const DEAL_API_BASE = process.env.DEAL_API_BASE || defaultConfig.DEAL_API_BASE;
export const THEME_CONFIG = CONFIG.THEME_CONFIG;
export const ROUTES = CONFIG.ROUTES;
export const SUPPORTED_COUNTRIES = CONFIG.SUPPORTED_COUNTRIES;

