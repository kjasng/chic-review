# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

```bash
yarn dev          # Start development server with Turbo (http://localhost:3000)
yarn build        # Build for production
yarn start        # Start production server (requires build first)
yarn lint         # Run ESLint checks
yarn lint:fix     # Auto-fix ESLint issues
yarn prettier     # Format all files with Prettier
yarn prettier:check  # Check formatting without modifying
yarn typecheck    # TypeScript type checking
yarn validate     # Run all checks (typecheck + lint + prettier + test)
```

### Testing

```bash
yarn test         # Run tests with Jest
yarn test:watch   # Run tests in watch mode
yarn test:coverage  # Generate coverage report
```

### Database Management (Prisma + MongoDB)

```bash
yarn db:generate  # Generate Prisma client
yarn db:migrate   # Run migrations (development)
yarn db:migrate:prod  # Run migrations (production)
yarn db:push      # Push schema changes directly
yarn db:seed      # Seed database with initial data
yarn db:studio    # Open Prisma Studio GUI
```

### Docker Operations

```bash
yarn docker:up    # Start containers in detached mode
yarn docker:down  # Stop all containers
yarn docker:build # Build Docker images
yarn docker:logs  # Follow container logs
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
- **API Routes**: Located in `/app/api/` directory

### Key Directories

```
app/
├── (auth)/          # Auth group routes (login, register)
├── (dashboard)/     # Protected dashboard routes
├── api/            # API endpoints
├── providers.tsx   # React Query provider setup
└── layout.tsx      # Root layout

components/
├── ui/             # shadcn/ui components (managed by shadcn CLI)
├── forms/          # Form components (login, register)
├── cards/          # Card components
├── homepage/       # Homepage sections
├── search/         # Search components
└── error-pages/    # Error page components

lib/
├── auth/           # NextAuth.js configuration
├── config/         # Environment and site configuration
├── db/             # Prisma client and queries
├── queries/        # Database query functions
├── validations/    # Zod schemas
└── utils.ts        # Utility functions including cn()

prisma/
├── schema.prisma   # MongoDB schema definition
└── seed.ts         # Database seeding script
```

### TypeScript Path Aliases

- `@/*` - Project root
- `@/components/*` - Components directory
- `@/lib/*` - Library/utilities
- `@/hooks/*` - Custom hooks
- `@/types/*` - Type definitions
- `@/app/*` - App directory

### Database Architecture

- **Database**: MongoDB (migrated from PostgreSQL)
- **ORM**: Prisma with MongoDB adapter
- **Models**: User, Account, Session, Post, VerificationToken
- **Authentication**: NextAuth.js v5 (beta) with Prisma adapter

### Authentication System

- **NextAuth.js v5 Beta** with multiple providers:
  - Credentials (email/password with bcrypt)
  - Google OAuth
  - GitHub OAuth
- **Session Strategy**: JWT with role-based access
- **Middleware**: Protected routes configured in `middleware.ts`

### State Management & Data Fetching

- **React Query** (TanStack Query v5) for server state
- **React Hook Form** (v7.62.0) with **Zod** (v4.1.5) validation
- Custom hooks in `/hooks` directory

### Styling System

- **Tailwind CSS** with custom configuration
- **shadcn/ui** components using Radix UI primitives
- **CSS Variables** for design tokens (light/dark mode support)
- **Utility function**: `cn()` for conditional classes (combines clsx + tailwind-merge)

### Form Handling

- **react-hook-form** with **zod** validation
- Use shadcn/ui Form components with integrated validation
- Validation schemas in `/lib/validations/`

## Code Standards

### Prettier Configuration

- No semicolons
- Double quotes for all strings
- Trailing commas
- 80 character line width
- 2 spaces indentation
- Import sorting with @trivago/prettier-plugin-sort-imports

### ESLint

- Extends `next/core-web-vitals`
- TypeScript recommended rules
- React and JSX accessibility rules
- Enforces type imports
- Unused vars with underscore prefix ignored

### Git Workflow

- **Husky** git hooks for pre-commit checks
- **Commitlint** enforces conventional commits
- **lint-staged** runs on staged files
- Commit format: `type(scope): message`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Environment Configuration

- **Node.js**: >=18.x required
- **Package Manager**: Yarn (enforced)
- **TypeScript**: 5.x
- **Build Output**: Standalone mode for containerization

## Installed shadcn/ui Components

- **Form inputs**: button, input, label, textarea, select, checkbox, radio-group, switch, form
- **Layout**: card, avatar, badge, table, tabs
- **Overlays**: dialog, sheet, alert-dialog, popover, dropdown-menu
- **Feedback**: toast (with use-toast hook), toaster

## Testing Setup

- **Jest** with React Testing Library
- Configuration in `jest.config.js`
- Test files in `/tests` directory
- Setup file: `/tests/setup.ts`