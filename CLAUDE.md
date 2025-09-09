# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

```bash
yarn dev          # Start development server with Turbo (http://localhost:3000)
yarn build        # Build for production
yarn start        # Start production server (requires build first)
yarn lint         # Run ESLint checks
yarn prettier     # Format all files with Prettier
```

### Code Quality Checks

```bash
npx eslint . --fix        # Auto-fix ESLint issues
npx prettier --check .    # Check formatting without modifying files
```

### Package Management

- **IMPORTANT**: Use `yarn` exclusively (npm is blocked via package.json engines)
- `yarn add <package>` - Add production dependency
- `yarn add -D <package>` - Add dev dependency

### shadcn/ui Components

```bash
npx shadcn@latest add <component>  # Add new UI components
```

## Project Architecture

### Next.js 15 App Router

- **Framework**: Next.js 15.5.2 with React 19.1.1
- **Routing**: File-based routing in `/app` directory
- **Components**: Server Components by default, use `"use client"` directive when needed
- **Layouts**: Nested layouts via `layout.tsx` files

### Key Directories

```
app/            # Next.js App Router pages and layouts
components/ui/  # shadcn/ui components (managed by shadcn CLI)
lib/           # Utilities including utils.ts with cn() helper
hooks/         # Custom React hooks including use-toast
```

### TypeScript Path Aliases

- `@/*` - Project root
- `@/components/*` - Components directory
- `@/lib/*` - Library/utilities
- `@/hooks/*` - Custom hooks

### State Management

- **Jotai**: Atomic state management (v2.14.0)
- Create atoms in `lib/atoms/` or `hooks/`
- Usage: `useAtom`, `useAtomValue`, `useSetAtom`

### Styling System

- **Tailwind CSS** with custom configuration
- **shadcn/ui** components using Radix UI primitives
- **Design tokens** via CSS variables (light/dark mode support)
- **Brand colors**:
  - Primary/Golden: `#eca829`
  - Use: `bg-golden`, `text-golden`, `border-golden`
- **Utility function**: `cn()` for conditional classes (combines clsx + tailwind-merge)

### Form Handling

- **react-hook-form** (v7.62.0) with **zod** (v4.1.5) validation
- Use shadcn/ui Form components with integrated validation

## Code Standards

### Prettier Configuration

- No semicolons
- Single quotes for JS/TS and JSX
- Trailing commas
- 80 character line width
- 2 spaces indentation

### ESLint

- Extends `next/core-web-vitals`
- Enforces React hooks rules and accessibility

### Git Workflow

- **Husky** git hooks for pre-commit checks
- **Commitlint** enforces conventional commits
- Commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, etc.

## Environment Requirements

- **Node.js**: >=18.x
- **Package Manager**: Yarn (required)
- **TypeScript**: 5.x

## Installed shadcn/ui Components

Form inputs: Button, Input, Label, Textarea, Select, Checkbox, Radio Group, Switch, Form
Layout: Card, Avatar, Badge, Table, Tabs
Modals: Dialog, Sheet, Alert Dialog, Popover, Dropdown Menu
Feedback: Toast (with use-toast hook)

## Important Notes

- Components are Server Components by default - only add `"use client"` when necessary
- Always check existing code patterns before implementing new features
- Use existing utilities and components from shadcn/ui
- Follow the established Prettier and ESLint configurations
