import defaultConfig from '../../config.default.json';

// Determine which config to use based on APP_CONFIG_FILE env var
// Defaults to config.default.json if not set
const configFileName = process.env.APP_CONFIG_FILE || 'config.default.json';

// Dynamically load the specified config file (server-side only)
let baseConfig = defaultConfig;
if (typeof window === 'undefined' && configFileName !== 'config.default.json') {
  try {
    const path = require('path');
    const fs = require('fs');
    const configPath = path.join(process.cwd(), configFileName);
    const configContent = fs.readFileSync(configPath, 'utf-8');
    baseConfig = JSON.parse(configContent);
  } catch (error) {
    console.warn(`Warning: Could not load config file "${configFileName}". Falling back to config.default.json.`);
    console.warn(error);
  }
}

export const CONFIG = {
  ...baseConfig,
  DEAL_API_ENDPOINTS: {
    ...baseConfig.DEAL_API_ENDPOINTS,
  },
  THEME_CONFIG: {
    ...baseConfig.THEME_CONFIG
  }
};

// Re-export specific sections for convenience if needed, matching original constants.ts structure
export const DEAL_API_BASE = process.env.DEAL_API_BASE || baseConfig.DEAL_API_BASE;
export const THEME_CONFIG = CONFIG.THEME_CONFIG;
export const DEAL_API_ENDPOINTS = CONFIG.DEAL_API_ENDPOINTS;
export const SUPPORTED_COUNTRIES = CONFIG.SUPPORTED_COUNTRIES;

