# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 15 fullstack application using the App Router, TypeScript, Tailwind CSS, shadcn/ui components, and Jotai for state management. The project uses Yarn as the package manager and enforces strict code quality standards through ESLint, Prettier, and Husky git hooks.

**Repository**: https://github.com/kjasng/chic-review.git

## Development Commands

### Core Development
- `yarn dev` - Start development server on http://localhost:3000
- `yarn build` - Build the application for production
- `yarn start` - Start the production server (requires build first)

### Code Quality
- `yarn lint` - Run ESLint to check for code issues
- `yarn prettier` - Format all files using Prettier
- `npx prettier --check .` - Check if files are properly formatted
- `npx eslint . --fix` - Auto-fix ESLint issues where possible

### Package Management
- Use `yarn` (not npm) - enforced by package.json engines configuration
- `yarn install` - Install dependencies
- `yarn add <package>` - Add a production dependency
- `yarn add -D <package>` - Add a development dependency

### shadcn/ui Components
- `npx shadcn@latest add <component-name>` - Add new shadcn/ui components
- `npx shadcn@latest add <component1> <component2>` - Add multiple components at once
- Available components: https://ui.shadcn.com/docs/components

## Architecture & Structure

### Next.js App Router Structure
- **Next.js Version**: 15.5.2 with React 19.1.1
- **App Directory**: Uses Next.js App Router (`/app` directory)
- **File-based Routing**: Routes are defined by folder structure in `/app`
- **Layout System**: `layout.tsx` files define nested layouts
- **Server Components**: Components are Server Components by default
- **Root Layout**: `app/layout.tsx` - defines the base HTML structure

### Key Directories & Files
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - shadcn/ui components
- `lib/` - Utility functions (includes `utils.ts` with `cn()` helper)
- `hooks/` - Custom React hooks (includes `use-toast.ts`)
- `public/` - Static assets served from root

### State Management Architecture
- **Jotai**: Atomic state management library
- **Pattern**: Create atoms in separate files, use `useAtom`, `useAtomValue`, `useSetAtom`
- **Location**: Store atoms in `lib/atoms/` or `hooks/` directories

### TypeScript Configuration
- **Path Aliases**: 
  - `@/*` maps to project root
  - `@components/*` maps to `./components/*`
  - `@/lib/*` maps to `./lib/*`
  - `@/hooks/*` maps to `./hooks/*`
- **Strict Mode**: Enabled with full TypeScript checking
- **Next.js Plugin**: Integrated for optimal TypeScript support

### Styling Architecture
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **shadcn/ui**: Component library with "New York" style and custom golden theme
- **CSS Variables**: Comprehensive design system with light/dark mode support
- **Layer System**: Uses `@layer base` for design tokens and component styles
- **Design Tokens**: All colors, spacing, and other design decisions use CSS custom properties
- **Custom Brand Colors**: 
  - Primary: `#eca829` (golden yellow)
  - Text: `#000000` (black)
  - Background: `#ffffff` (white)
- **Typography**: Inter font family with full weight range (100-900)

### Component System
- **shadcn/ui Components**: Pre-built, accessible components based on Radix UI primitives
- **Styling**: Uses `class-variance-authority` (cva) for component variants
- **Utilities**: `cn()` function combines `clsx` and `tailwind-merge` for conditional classes
- **Icons**: Lucide React icon library

## Installed shadcn/ui Components

### Form & Input Components
- **Button**: `@/components/ui/button`
- **Input**: `@/components/ui/input`
- **Label**: `@/components/ui/label`
- **Textarea**: `@/components/ui/textarea`
- **Select**: `@/components/ui/select`
- **Checkbox**: `@/components/ui/checkbox`
- **Radio Group**: `@/components/ui/radio-group`
- **Switch**: `@/components/ui/switch`
- **Form**: `@/components/ui/form` (with react-hook-form + zod integration)

### Layout & Display Components
- **Card**: `@/components/ui/card`
- **Avatar**: `@/components/ui/avatar`
- **Badge**: `@/components/ui/badge`
- **Table**: `@/components/ui/table`
- **Tabs**: `@/components/ui/tabs`

### Modal & Overlay Components
- **Dialog**: `@/components/ui/dialog`
- **Sheet**: `@/components/ui/sheet`
- **Alert Dialog**: `@/components/ui/alert-dialog`
- **Popover**: `@/components/ui/popover`
- **Dropdown Menu**: `@/components/ui/dropdown-menu`

### Feedback Components
- **Toast**: `@/components/ui/toast` + `@/components/ui/toaster` + `@/hooks/use-toast`

## Code Standards & Quality

### Prettier Configuration
- No semicolons (`"semi": false`)
- Single quotes for JS/TS (`"singleQuote": true`)
- Single quotes for JSX (`"jsxSingleQuote": true`)
- Trailing commas (`"trailingComma": "all"`)
- 80 character line width
- 2 spaces for indentation

### ESLint Configuration
- Extends `next/core-web-vitals` for Next.js best practices
- Automatically checks for accessibility issues
- Enforces React hooks rules

### Git Workflow
- **Repository**: https://github.com/kjasng/chic-review.git
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Enforces conventional commit messages
- **Conventional Commits**: Required format with types: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test, translation, security, changeset

### Environment Requirements
- **Node.js**: Version >=18.x (currently supports 22.x)
- **Package Manager**: Yarn required (npm usage blocked)
- **TypeScript**: Version 5.x

## Development Patterns

### Component Creation
- Use Server Components by default
- Add `"use client"` directive only when client-side features needed
- Import shadcn/ui components: `import { Button } from "@/components/ui/button"`
- Use `cn()` utility for conditional styling: `cn("base-styles", condition && "conditional-styles")`

### State Management with Jotai
- Create atoms: `export const counterAtom = atom(0)`
- Use in components: `const [count, setCount] = useAtom(counterAtom)`
- Read-only: `const count = useAtomValue(counterAtom)`
- Write-only: `const setCount = useSetAtom(counterAtom)`

### Form Handling
- Use shadcn/ui Form component with react-hook-form and zod
- Pattern: Define schema → create form → use FormField components

### Styling Patterns
- Use Tailwind utility classes primarily
- Use shadcn/ui design tokens: `bg-background`, `text-foreground`, etc.
- Custom brand colors available as:
  - `bg-golden`, `text-golden`, `border-golden` for the primary golden color
  - `bg-primary`, `text-primary` for shadcn/ui primary (also golden)
  - `bg-black`, `text-black` for pure black
  - `bg-white`, `text-white` for pure white
- Dark mode: automatically handled via CSS variables and `dark:` prefix
- Typography: Use `font-sans` (default) for Inter font family
- Custom utilities in `globals.css` using `@layer utilities`

### File Organization
- Components: Co-locate with related files in feature directories
- UI Components: Keep in `components/ui/` (managed by shadcn/ui)
- Utilities: Place in `lib/` directory
- Hooks: Place in `hooks/` directory
- Use TypeScript path aliases for clean imports

## Build & Deployment

### Production Build
```bash
yarn build
yarn start
```

### Development
```bash
yarn dev  # http://localhost:3000
```

### Bundle Analysis
- Automatic code splitting
- Tree shaking enabled
- Image optimization via `next/image`
- Font optimization (Inter via `next/font/google`)

## Key Dependencies

### Core Framework
- **Next.js**: 15.5.2 (App Router)
- **React**: 19.1.1
- **TypeScript**: 5.x

### UI & Styling
- **Tailwind CSS**: 3.3.0+ with custom configuration
- **shadcn/ui**: Component library with Radix UI primitives
- **Lucide React**: Icon library
- **tailwindcss-animate**: Animation utilities

### State Management
- **Jotai**: 2.14.0 - Atomic state management

### Forms & Validation
- **react-hook-form**: 7.62.0
- **zod**: 4.1.5 - Schema validation
- **@hookform/resolvers**: 5.2.1 - Form validation resolvers

### Development Tools
- **ESLint**: Code linting with Next.js config
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Commitlint**: Conventional commit enforcement
