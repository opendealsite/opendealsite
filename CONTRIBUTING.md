# Contributing to OpenDealSite

First off, thank you for considering contributing to OpenDealSite! It's people like you that make this project great.

## 🎯 Project Vision

OpenDealSite aims to be a flexible, open-source platform for community-driven deal sharing. Our goals:

- **Easy to fork**: Customize without hassle
- **Easy to contribute**: Clear patterns and documentation
- **Easy to maintain**: Clean code and good test coverage
- **Easy to deploy**: Works on any platform

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/opendealsite.git
cd opendealsite

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/opendealsite.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

## 📝 Development Workflow

### Code Style

We use TypeScript, ESLint, and Prettier. The CI will check your code automatically.

```bash
# Format code
npm run format:write

# Check formatting
npm run format:check

# Lint
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run typecheck
```

### File Organization

- **Server Components**: Default for all components in `src/components/`
- **Client Components**: Only when necessary, marked with `'use client'`
- **API Logic**: Keep in `src/lib/api.ts`
- **Types**: Define in `src/types.ts`
- **Utils**: Pure functions in `src/lib/utils.ts`

### Configuration Changes

When adding/changing configuration:

1. Update `config.default.json` (base template)
2. Update `src/env.js` if adding environment variables
3. Update `.env.example` with the new variable
4. Document in README.md

Example:
```json
// config.default.json
{
  "NEW_FEATURE": {
    "ENABLED": false,
    "OPTION": "default"
  }
}
```

### Component Guidelines

#### Server Components (Preferred)

```typescript
// src/components/MyComponent.tsx
import type { Deal } from '@/types';

export const MyComponent = ({ deal }: { deal: Deal }) => {
  // Server-side logic, no useState or useEffect
  return <div>{deal.title}</div>;
};
```

#### Client Components (When Needed)

```typescript
// src/components/MyInteractiveComponent.tsx
'use client';

import { useState } from 'react';

export const MyInteractiveComponent = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add dark mode toggle
fix: resolve country detection issue
docs: update API documentation
style: format code with prettier
refactor: simplify deal card logic
test: add unit tests for utils
chore: update dependencies
```

Examples:
- ✅ `feat: add support for UK country code`
- ✅ `fix: resolve caching issue in API layer`
- ❌ `Update stuff`
- ❌ `Fixed bug`

## 🧪 Testing

Before submitting:

```bash
# Run all checks
npm run check

# Build the project
npm run build

# Test in dev mode
npm run dev
```

Visit `http://localhost:3000` and verify your changes work.

## 📤 Submitting Changes

### 1. Keep Your Fork Updated

```bash
git fetch upstream
git rebase upstream/main
```

### 2. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 3. Create Pull Request

1. Go to GitHub and click "New Pull Request"
2. Select your fork and branch
3. Fill out the PR template:
   - **What**: Describe the change
   - **Why**: Explain the motivation
   - **How**: Detail the implementation
   - **Testing**: How you tested it

### 4. PR Guidelines

- Keep PRs focused (one feature/fix per PR)
- Update documentation if needed
- Add/update tests when applicable
- Ensure CI passes
- Respond to review feedback

## 🎨 Adding New Features

### Small Features
Just open a PR with your implementation.

### Large Features
1. Open an issue first to discuss the approach
2. Get feedback from maintainers
3. Implement with incremental PRs if possible

## 🐛 Reporting Bugs

### Before Reporting
1. Check existing issues
2. Try the latest version
3. Verify it's not a configuration issue

### Bug Report Template

```markdown
**Describe the bug**
Clear description of what's wrong

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g. macOS 14]
- Node version: [e.g. 18.17.0]
- Browser: [e.g. Chrome 120]

**Additional context**
Any other info
```

## 🔄 Keeping Your Fork in Sync

### Method 1: Rebase (Recommended)

```bash
git fetch upstream
git checkout main
git rebase upstream/main
git push origin main --force-with-lease
```

### Method 2: Merge

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## 💡 Feature Requests

Open an issue with:
- **Problem**: What problem does this solve?
- **Solution**: Proposed solution
- **Alternatives**: Other approaches considered
- **Additional context**: Screenshots, examples, etc.

## 🎓 Learning Resources

New to the stack? Check these out:
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [T3 Stack](https://create.t3.gg/)

## 🏗️ Architecture Decisions

When making significant changes:
1. Consider backward compatibility
2. Think about fork-friendliness
3. Minimize breaking changes
4. Document migrations if needed

### Configuration Philosophy
- **Override-friendly**: Config files use layering
- **Environment-aware**: Support different deployment scenarios
- **Type-safe**: Use TypeScript and Zod for validation

### Component Philosophy
- **Server-first**: Default to Server Components
- **Client when needed**: Only add `'use client'` if necessary
- **Composable**: Build small, reusable pieces

## ❓ Questions?

- 💬 [GitHub Discussions](https://github.com/OWNER/opendealsite/discussions)
- 🐛 [Issue Tracker](https://github.com/OWNER/opendealsite/issues)

## 📜 Code of Conduct

Be respectful, inclusive, and professional. We're all here to build something great together.

---

Thank you for contributing! 🎉
