import defaultConfig from '../../config.default.json';
import { type ThemeConfig } from '../types';

// Determine which config to use based on APP_CONFIG_FILE env var
// Defaults to config.default.json if not set
const configFileName = process.env.APP_CONFIG_FILE || 'config.default.json';

// Dynamically load the specified config file (server-side only)
let baseConfig = JSON.parse(JSON.stringify(defaultConfig));

/**
 * Simple deep merge to combine default config with custom overrides
 */
function deepMerge(target: any, source: any) {
  if (!source) return target;
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

if (typeof window === 'undefined' && configFileName !== 'config.default.json') {
  try {
    const path = require('path');
    const fs = require('fs');
    const configPath = path.join(process.cwd(), configFileName);
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const customConfig = JSON.parse(configContent);
    
    // Merge custom config into default config
    baseConfig = deepMerge(baseConfig, customConfig);
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

// Log configuration on startup (server-side only)
if (typeof window === 'undefined') {
  console.log('--- App Config Loaded ---');
  console.log(`File: ${configFileName} merged with defaults`);
  console.log(JSON.stringify(CONFIG, null, 2));
  console.log('-------------------------');
}

// Re-export specific sections for convenience if needed, matching original constants.ts structure
export const DEAL_API_BASE = process.env.DEAL_API_BASE || CONFIG.DEAL_API_BASE;
export const THEME_CONFIG = CONFIG.THEME_CONFIG as ThemeConfig;
export const DEAL_API_ENDPOINTS = CONFIG.DEAL_API_ENDPOINTS;
export const SUPPORTED_COUNTRIES = CONFIG.SUPPORTED_COUNTRIES;
export const ADS_CONFIG = CONFIG.ADS_CONFIG;

