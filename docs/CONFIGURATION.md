# Configuration Guide

OpenDealSite uses a flexible configuration system designed for easy forking and customization while keeping upstream merges simple.

## Configuration Layers

The app uses multiple configuration layers (in order of precedence):

1. **Individual Environment Variables** (e.g., `DEAL_API_BASE`, highest priority)
2. **Custom Config File** (specified via `APP_CONFIG_FILE`, e.g., `config.local.json`). This file is **deeply merged** with the default config.
3. **`config.default.json`** (version controlled, base template, lowest priority)

## Files

### `APP_CONFIG_FILE`
**Purpose**: Environment variable to specify which configuration file to load.

**Usage**:
- If not set, the app defaults to `config.default.json`.
- Set `APP_CONFIG_FILE="config.local.json"` to use local overrides.
- In production, you might set `APP_CONFIG_FILE="config.production.json"`.

### `config.default.json`
**Purpose**: Version-controlled base configuration that ships with the repo.

**When to edit**: When adding new features that require configuration options.

**Example**:
```json
{
  "DEAL_API_BASE": "http://localhost:3000/api",
  "THEME_CONFIG": {
    "BRAND_NAME": "DealSite",
    "BRAND_LOGO": "#file:favicon.ico",
    "SHOW_MERCHANT_LOGO": true,
    "STYLE_DEAL_CARD": "default",
    "COLORS": {
      "light": {
        "primary": "#dc2626",
        "primary-foreground": "#ffffff",
        "secondary": "#0f766e",
        "secondary-foreground": "#ffffff"
      },
      "dark": {
        "primary": "#dc2626",
        "primary-foreground": "#ffffff",
        "secondary": "#0d9488",
        "secondary-foreground": "#f1f5f9"
      }
    }
  },
  "ADS_CONFIG": {
    "SIDEBAR_TEXT_AD": {
      "CONTENT": "Text Advertisement",
      "HEIGHT_CLASS": "h-[40px]"
    },
    "SIDEBAR_SQUARE_AD": {
      "CONTENT": "Advertisement (300x250)",
      "HEIGHT_CLASS": "h-[250px]"
    }
  },
  "SUPPORTED_COUNTRIES": {
    "US": "us",
    "CA": "ca"
  },
  "AFFILIATE_PROVIDERS": {
    "FALLBACK": "https://redirect.viglink.com/?key=YOUR_KEY&u=URL_PLACE_HOLDER",
    "WRAPPER": {
      "homedepot.com": "https://homedepot.sjv.io/...?u=URL_PLACE_HOLDER"
    },
    "APPENDER": {
      "amazon.com": "tag=your-tag-20"
    }
  }
}
```

## Affiliate Link System

OpenDealSite automatically converts original deal links into affiliate links based on the `AFFILIATE_PROVIDERS` configuration:

- **WRAPPER**: Used for redirectors or networks that wrap the entire URL. Use `URL_PLACE_HOLDER` where the original link should be inserted (encoded).
- **APPENDER**: Used for simple query parameter additions (like Amazon tags).
- **FALLBACK**: A global wrapper used if no specific merchant domain is matched (e.g., VigLink).

The system normalizes domains (e.g., handles `www.` and specific cases like `woot.com` subdomains) before matching.

## Theme Configuration

OpenDealSite supports advanced branding via `THEME_CONFIG`. 

- **BRAND_NAME**: The display name of the site.
- **BRAND_LOGO**: Optional logo reference. Defaults to `/favicon.ico` 
- **COLORS**: Supports dynamic CSS variable injection for `light` and `dark` modes.
  - All standard Tailwind colors are supported: `primary`, `secondary`, `accent`, `background`, `foreground`, `card`, `muted`, `border`, `ring`.
  - Include `-foreground` variants (e.g., `primary-foreground`) to define text color on top of colored backgrounds.

Example override in `config.local.json`:
```json
{
  "THEME_CONFIG": {
    "COLORS": {
      "light": {
        "primary": "#0000ff"
      }
    }
  }
}
```

## Advertising Configuration

Sidebar advertisements can be configured via `ADS_CONFIG`.

- **SIDEBAR_TEXT_AD**: Small text-based advertisement.
- **SIDEBAR_SQUARE_AD**: Standard square ad unit.
- **SIDEBAR_STICKY_AD**: Large skyscraper/sticky ad unit.

Each ad unit supports:
- **CONTENT**: HTML/Text content for the ad.
- **HEIGHT_CLASS**: Tailwind height class (e.g., `h-[250px]`) to reserve space.

### `config.local.json` (Optional)
**Purpose**: Local overrides for development. Gitignored.

**When to use**: Testing configuration changes without modifying the default. Because of **deep merging**, you only need to include the keys you want to change.

**Example**:
```json
{
  "THEME_CONFIG": {
    "BRAND_NAME": "My Custom Deals"
  }
}
```

Create this file locally:
```bash
cp config.default.json config.local.json
# Edit config.local.json with your overrides
```

### `.env` / `.env.local`
**Purpose**: Environment-specific settings and secrets.

**When to use**: 
- API keys and tokens
- Specifying which config file to use
- Overriding the API base URL

**Example**:
```env
# Required
DEAL_API_TOKEN=your_secret_token_here

# Optional overrides
DEAL_API_BASE=https://api.example.com
APP_CONFIG_FILE=config.production.json
```

## Environment Variables

### Server-Side (Private)
These are only available on the server and are used in `src/lib/constants.ts` or `src/env.js`:

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `DEAL_API_TOKEN` | string | Yes | API authentication token (Validated in `src/env.js`) |
| `DEAL_API_BASE` | string | No | Base URL for the Deals API |
| `APP_CONFIG_FILE`| string | No | Path to the config file (relative to root) |
| `NODE_ENV` | enum | Auto | development/test/production |

### Client-Side (Public)
Currently, all thematic configuration is managed via the JSON configuration file specified by `APP_CONFIG_FILE`. We recommend using the JSON config for branding consistency across server and client components.

## Usage in Code

### Loading Configuration

```typescript
// src/lib/constants.ts
import defaultConfig from '../../config.default.json';

// Determine which config to use based on APP_CONFIG_FILE env var
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
    console.warn(`Warning: Could not load config file "${configFileName}".`);
    baseConfig = defaultConfig;
  }
}

export const CONFIG = {
  ...baseConfig,
  // ... nested expansion
};

export const DEAL_API_BASE = process.env.DEAL_API_BASE || baseConfig.DEAL_API_BASE;
```

### Using Configuration

```typescript
import { THEME_CONFIG, SUPPORTED_COUNTRIES } from '@/lib/constants';

// Use in components
const brandName = THEME_CONFIG.BRAND_NAME;
const countries = Object.values(SUPPORTED_COUNTRIES);
```

### Accessing Environment Variables

```typescript
import { env } from '@/env';

// Server-side only (validated)
const apiToken = env.DEAL_API_TOKEN;

// Client-side (use constants.ts instead for consistency)
const brandName = THEME_CONFIG.BRAND_NAME;
```

## Customization Scenarios

### Scenario 1: Fork for Your Own Site

1. Fork the repository
2. Edit `config.default.json` with your branding:
   ```json
   {
     "THEME_CONFIG": {
       "BRAND_NAME": "YourDealsHub",
       "BRAND_LOGO": "https://cdn.yoursite.com/yourdeals/logo.png",
       "SHOW_MERCHANT_LOGO": true
     }
   }
   ```
3. Commit your changes
4. Deploy with your environment variables

**Pulling updates**: Your config changes are in version control, so you can easily merge upstream changes.

### Scenario 2: Multiple Environments

Use `APP_CONFIG_FILE` to point to environment-specific configuration files:

**Production** (`.env.production`):
```env
APP_CONFIG_FILE="config.production.json"
DEAL_API_TOKEN=prod_token_here
```

**Staging** (`.env.staging`):
```env
APP_CONFIG_FILE="config.staging.json"
DEAL_API_TOKEN=staging_token_here
```

### Scenario 3: Local Development

Create `config.local.json` for testing:
```json
{
  "DEAL_API_BASE": "http://localhost:3001/api",
  "THEME_CONFIG": {
    "BRAND_NAME": "Dev Site",
    "BRAND_LOGO": "/favicon.ico"
  }
}
```

This file is gitignored, so it won't interfere with your commits or upstream merges.

## Adding New Configuration

When adding a new feature that needs configuration:

### 1. Update `config.default.json`
```json
{
  "NEW_FEATURE": {
    "ENABLED": false,
    "OPTION_A": "default_value"
  }
}
```

### 2. Update code to use the config
```typescript
import { CONFIG } from '@/lib/constants';

if (CONFIG.NEW_FEATURE.ENABLED) {
  // do something
}
```

### 3. Override for specific environments
Create a new config file (e.g., `config.prod.json`) and set `APP_CONFIG_FILE="config.prod.json"`.

### 4. Update `.env.example`
```env
# New Feature Configuration
NEXT_PUBLIC_NEW_FEATURE_ENABLED=false
```

### 5. Document in README.md

Add to the environment variables table.

## Best Practices

### ✅ Do
- Use `config.default.json` for non-sensitive defaults
- Use environment variables for secrets and environment-specific values
- Use `config.local.json` for temporary local overrides
- Document all configuration options
- Provide sensible defaults

### ❌ Don't
- Put secrets in `config.default.json` (it's version controlled)
- Hardcode configuration in components
- Use `config.local.json` for production (it's gitignored)
- Create deeply nested configuration structures

## Deployment Platforms

### Vercel
Set environment variables in the Vercel dashboard under Settings → Environment Variables.

### Docker
Pass environment variables via Docker:
```bash
docker run -p 3000:3000 \
  -e DEAL_API_TOKEN=your_token \
  -e APP_CONFIG_FILE=config.prod.json \
  opendealsite
```

### Kubernetes
Use ConfigMaps and Secrets:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: opendealsite-config
data:
  APP_CONFIG_FILE: "config.prod.json"
---
apiVersion: v1
kind: Secret
metadata:
  name: opendealsite-secrets
data:
  DEAL_API_TOKEN: base64_encoded_token
```

## Troubleshooting

### Config not loading
- Check environment variable names (client vars must start with `NEXT_PUBLIC_`)
- Verify `.env` file location (should be in project root)
- Restart dev server after changing `.env`

### Type errors
- Run `npm run typecheck`
- Ensure `src/env.js` schema matches your variables
- Check TypeScript errors in `src/lib/constants.ts`

### Production build issues
- Set `SKIP_ENV_VALIDATION=1` only for debugging
- Ensure all required env vars are set in production
- Check build logs for validation errors

## Support

Questions about configuration? Open an issue or discussion on GitHub!
