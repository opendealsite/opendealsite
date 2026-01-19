# OpenDealSite

> An open-source, community-driven deal finder platform built with Next.js and the T3 Stack.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🚀 Features

- 🌍 **Multi-country Support**: Automatic country detection via Cloudflare headers
- ⚡ **Server-Side Rendering**: Fast initial page loads with Next.js App Router
- 🔄 **Smart Caching**: 10-minute cache TTL for optimal performance
- 🎨 **Customizable UI**: Easy theming via configuration files
- 🔍 **Search & Filter**: Find deals by keyword or view hottest deals
- 📱 **Responsive Design**: Works seamlessly on all devices

## 📋 Prerequisites

- Node.js 18+ 
- npm 11+
- A deals API backend (or use the included mock server)

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/opendealsite.git
cd opendealsite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and customize it:

```bash
cp .env.example .env
```

Edit `.env` and set your values:

```env
DEAL_API_TOKEN="your_api_token_here"
```

### 4. Customize Configuration (Optional)

The project uses a configuration system that's easy to override:

1. **Default Config**: `config.default.json` contains base settings
2. **Environment Override**: Set environment variables to override defaults
3. **Custom Config**: Create `config.local.json` (gitignored) for local development

Example environment overrides:

```env
NEXT_PUBLIC_BRAND_NAME="MyDealsHub"
NEXT_PUBLIC_STYLE_DEAL_CARD="minimal"
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
opendealsite/
├── config.default.json       # Base configuration (version controlled)
├── config.local.json          # Local overrides (gitignored)
├── src/
│   ├── app/
│   │   ├── [country]/        # Country-specific routes
│   │   │   └── page.tsx      # Main deals feed
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   │   ├── DealCard.tsx      # Deal display component (Server)
│   │   ├── Header.tsx        # Navigation header (Client)
│   │   └── ExternalDealLink.tsx  # Interactive link (Client)
│   ├── lib/
│   │   ├── api.ts            # API client with caching
│   │   ├── constants.ts      # Configuration loader
│   │   └── utils.ts          # Helper functions
│   ├── proxy.ts              # Country detection middleware
│   ├── types.ts              # TypeScript interfaces
│   └── env.js                # Environment validation (T3)
└── COPILOT_INSTRUCTIONS.md   # AI assistant guidelines
```

## 🌐 Routing

- **Home**: `/{country}` - Latest deals
- **Search**: `/{country}?q=keyword` - Search results
- **Hot Deals**: `/{country}?hottest=24` - Trending deals (last 24 hours)
- **Country Detection**: `/` - Redirects to `/{country}` based on Cloudflare header

Supported countries: `us`, `ca` (configurable in `config.default.json`)

## 🎨 Customization

See [docs/CONFIGURATION.md](docs/CONFIGURATION.md) for detailed configuration guide.

### Quick Theming

Edit `config.default.json`:

```json
{
  "THEME_CONFIG": {
    "BRAND_NAME": "YourBrandName",
    "SHOW_MERCHANT_LOGO": true,
    "STYLE_DEAL_CARD": "default"
  }
}
```

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📊 API Integration

The app expects a REST API with the following endpoints:

### GET `/api/deals`
Query params: `country`, `offset`, `limit`, `query` (optional)

Response:
```json
[
  {
    "id": "123",
    "title": "Product Name",
    "dealPrice": 19.99,
    "regPrice": 39.99,
    "percentOff": 50,
    "imageLink": "https://...",
    "origDealLink": "https://...",
    "origDealDomain": "example.com",
    "hotValue": 150,
    "dateCreated": "2026-01-18T00:00:00Z"
  }
]
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Docker

```bash
# Build
docker build -t opendealsite .

# Run
docker run -p 3000:3000 -e DEAL_API_TOKEN=your_token opendealsite
```

## 📝 Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `DEAL_API_TOKEN` | Yes | API authentication token | - |
| `NEXT_PUBLIC_BRAND_NAME` | No | Site branding | "DealSite" |
| `NEXT_PUBLIC_STYLE_DEAL_CARD` | No | Card style variant | "default" |
| `NODE_ENV` | Auto | Environment mode | "development" |

## 📚 Documentation

- [Configuration Guide](docs/CONFIGURATION.md) - Detailed configuration options
- [Copilot Instructions](COPILOT_INSTRUCTIONS.md) - Guidelines for AI assistants
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

## 🙏 Acknowledgments

- Built with [T3 Stack](https://create.t3.gg/)
- Inspired by community deal-sharing platforms
- Original React prototype by Google AI Studio

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 💬 Support

- 🐛 [Report a Bug](https://github.com/yourusername/opendealsite/issues)
- 💡 [Request a Feature](https://github.com/yourusername/opendealsite/issues)
- 💬 [Discussions](https://github.com/yourusername/opendealsite/discussions)

---

Made with ❤️ by the open-source community
