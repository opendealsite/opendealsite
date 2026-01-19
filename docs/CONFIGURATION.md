# Configuration Guide

OpenDealSite uses a flexible configuration system designed for easy forking and customization while keeping upstream merges simple.

## Configuration Layers

The app uses multiple configuration layers (in order of precedence):

1. **Runtime Environment Variables** (highest priority)
2. **`config.local.json`** (gitignored, for local development)
3. **`config.default.json`** (version controlled, base template)

## Files

### `config.default.json`
**Purpose**: Version-controlled base configuration that ships with the repo.

**When to edit**: When adding new features that require configuration options.

**Example**:
```json
{
  "DEAL_API_BASE": "http://localhost:3000/api",
  "THEME_CONFIG": {
    "BRAND_NAME": "DealSite",
    "SHOW_MERCHANT_LOGO": true,
    "STYLE_DEAL_CARD": "default"
  },
  "SUPPORTED_COUNTRIES": {
    "US": "us",
    "CA": "ca"
  }
}
```

### `config.local.json` (Optional)
**Purpose**: Local overrides for development. Gitignored.

**When to use**: Testing configuration changes without modifying the default.

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
- Environment-specific URLs
- Feature flags for specific deployments

**Example**:
```env
# Required
DEAL_API_TOKEN=your_secret_token_here

# Optional overrides
NEXT_PUBLIC_BRAND_NAME=CustomBrandName
NEXT_PUBLIC_STYLE_DEAL_CARD=minimal
```

## Environment Variables

### Server-Side (Private)
These are only available on the server and are validated by `src/env.js`:

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `DEAL_API_TOKEN` | string | Yes | API authentication token |
| `NODE_ENV` | enum | Auto | development/test/production |

### Client-Side (Public)
These are exposed to the browser (must be prefixed with `NEXT_PUBLIC_`):

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NEXT_PUBLIC_BRAND_NAME` | string | "DealSite" | Site branding name |
| `NEXT_PUBLIC_STYLE_DEAL_CARD` | string | "default" | Deal card style variant |

## Usage in Code

### Loading Configuration

```typescript
// src/lib/constants.ts
import defaultConfig from '../../config.default.json';

export const CONFIG = {
  ...defaultConfig,
  THEME_CONFIG: {
    ...defaultConfig.THEME_CONFIG,
    BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME || defaultConfig.THEME_CONFIG.BRAND_NAME,
  }
};
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
       "SHOW_MERCHANT_LOGO": true
     }
   }
   ```
3. Commit your changes
4. Deploy with your environment variables

**Pulling updates**: Your config changes are in version control, so you can easily merge upstream changes.

### Scenario 2: Multiple Environments

Use environment variables for environment-specific overrides:

**Production** (`.env.production`):
```env
NEXT_PUBLIC_BRAND_NAME=DealSite
DEAL_API_TOKEN=prod_token_here
```

**Staging** (`.env.staging`):
```env
NEXT_PUBLIC_BRAND_NAME=DealSite Staging
DEAL_API_TOKEN=staging_token_here
```

### Scenario 3: Local Development

Create `config.local.json` for testing:
```json
{
  "DEAL_API_BASE": "http://localhost:3001/api",
  "THEME_CONFIG": {
    "BRAND_NAME": "Dev Site"
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

### 2. Update `src/lib/constants.ts` (if needed)
```typescript
export const NEW_FEATURE = {
  ...defaultConfig.NEW_FEATURE,
  ENABLED: process.env.NEXT_PUBLIC_NEW_FEATURE_ENABLED === 'true' 
    || defaultConfig.NEW_FEATURE.ENABLED,
};
```

### 3. Update `src/env.js` (if adding env vars)
```typescript
client: {
  NEXT_PUBLIC_NEW_FEATURE_ENABLED: z.boolean().optional(),
},
runtimeEnv: {
  NEXT_PUBLIC_NEW_FEATURE_ENABLED: process.env.NEXT_PUBLIC_NEW_FEATURE_ENABLED,
},
```

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
  -e NEXT_PUBLIC_BRAND_NAME=MyDeals \
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
  NEXT_PUBLIC_BRAND_NAME: "MyDeals"
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
