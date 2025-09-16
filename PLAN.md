# Chic Review - Hanoi Accommodation Review Platform

## Table of Contents

1. [Project Overview](#project-overview)
2. [Core Features](#core-features)
3. [Technology Stack](#technology-stack)
4. [Database Schema](#database-schema)
5. [Roles and Permissions](#roles-and-permissions)
6. [Rewards System](#rewards-system)
7. [Development Plan](#development-plan)
8. [UI/UX Guidelines](#uiux-guidelines)
9. [API Architecture](#api-architecture)
10. [Future Enhancements](#future-enhancements)

---

## Project Overview

### Purpose
**Chic Review** is a trusted accommodation review platform designed specifically for young people in Hanoi. The platform enables users to discover, review, and share experiences about homestays, hostels, and hotels while earning rewards for their contributions.

### Target Users
- **Primary**: Young professionals and students (18-35) seeking accommodation in Hanoi
- **Secondary**: Travelers looking for verified local recommendations

### Key Values
- **Transparency**: Authentic, verified reviews from real users
- **Community**: Building a supportive network of reviewers
- **Rewards**: Incentivizing quality contributions with valuable rewards
- **Trust**: Ensuring reliable information through moderation
- **Accessibility**: Mobile-first, Vietnamese-friendly interface

### Unique Value Proposition
Chic Review aggregates reviews from multiple trusted platforms (Facebook, Google, Agoda, Booking.com) providing comprehensive insights in one place. Active reviewers are rewarded with educational resources, study materials, and exclusive courses - creating a knowledge-sharing ecosystem while solving accommodation discovery problems through data aggregation.

---

## Core Features

### 1. Authentication & User Management
- **User Registration/Login** with email verification
- **Social Authentication** (Google, Facebook)
- **Profile Management** with avatar, bio, preferences
- **Password Reset** with secure email flow
- **Two-factor Authentication** (optional)

### 2. Accommodation Listings (Platform-Owned)
- **Property Types**: Homestays, Hostels, Hotels, Apartments
- **Management**: All properties owned and managed by the platform
- **Detailed Information**:
  - Location with map integration
  - Price ranges (daily/monthly)
  - Amenities (WiFi, AC, Kitchen, etc.)
  - House rules and policies
  - Photo galleries
  - Contact information
  - Basic property metadata
- **Admin Controls**:
  - Add/Edit/Remove listings
  - Update availability and pricing
  - Manage property photos
  - Feature properties on homepage

### 3. Review System (Dual-Source)
- **Crawled Reviews** (External Sources):
  - Facebook Reviews & Ratings
  - Google Reviews & Maps
  - Agoda Reviews
  - Booking.com Reviews
  - Automated crawling schedules
  - Review deduplication
  - Language processing (Vietnamese/English)
- **User-Generated Reviews** (Platform Native):
  - Direct reviews from registered users
  - Multi-criteria ratings (cleanliness, location, value, etc.)
  - Photo uploads with reviews (max 5 photos)
  - Minimum 50 words requirement
  - Helpful votes system
- **Combined Display Features**:
  - Aggregated rating from all sources
  - Platform source indicators (icons showing origin)
  - Sentiment analysis across all reviews
  - Timeline view mixing both types
  - Filter by source type
  - Total review count from all platforms

### 4. Rewards & Points System
- **Points Earning**:
  - Write detailed review: 50 points
  - Upload photos: 10 points per photo
  - Review gets helpful votes: 5 points per vote
  - Monthly active reviewer bonus: 100 points
  - Verify stay with booking proof: 30 points
- **Rewards Catalog**:
  - Study materials (500 points)
  - Online course vouchers (1000 points)
  - Premium membership (2000 points)
  - E-books and resources (300 points)
- **Points Dashboard** showing balance and history
- **Leaderboard** for top reviewers

### 5. Search & Discovery
- **Smart Search** with autocomplete
- **Filters**:
  - Price range slider
  - Location/District
  - Property type
  - Amenities checklist
  - Rating threshold
  - Availability dates
- **Sort Options**: Price, Rating, Newest, Most Reviewed
- **Map View** with cluster markers
- **Saved Searches** with notifications

### 6. Homepage Features
- **Hero Section** with search bar
- **Featured Accommodations** (curated)
- **Recent Reviews** carousel
- **Top Reviewers** showcase
- **Districts Guide** with area insights
- **Seasonal Recommendations**
- **Platform Statistics** (reviews, users, properties)

### 7. User Dashboard
- **My Reviews** management
- **Points Balance** and history
- **Saved Properties** list
- **Booking History** (future feature)
- **Notifications** center
- **Settings** and preferences
- **Rewards Redemption** interface

### 8. Admin Dashboard
- **Property Management** (Platform-Owned):
  - Add/Edit/Remove all listings
  - Update pricing and availability
  - Manage property photos and details
  - Feature properties on homepage
- **User Management**:
  - View/Edit/Ban users
  - Adjust points balances
  - View user activity history
- **Review Management**:
  - Moderate user-generated reviews
  - Monitor crawled review quality
  - Handle flagged content
- **Crawl Management**:
  - Schedule and monitor crawl jobs
  - View crawling statistics
  - Handle failed crawls
- **Analytics**:
  - User engagement metrics
  - Review statistics (both sources)
  - Points distribution
  - Platform growth charts
- **Rewards Management**:
  - Add/Edit rewards catalog
  - Process redemptions
  - Track inventory

---

## Technology Stack

### Frontend
- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: React 19.1.1
- **Styling**:
  - TailwindCSS 3.x
  - shadcn/ui components
  - Radix UI primitives
- **State Management**:
  - TanStack Query 5.x (server state)
  - Zustand (client state) - if needed
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Maps**: Mapbox/Google Maps integration

### Backend
- **API Routes**: Next.js API Routes
- **Authentication**: NextAuth.js v5
- **Database ORM**: Prisma 5.x
- **Validation**: Zod schemas
- **File Upload**: Uploadthing/S3
- **Email**: Resend/SendGrid
- **Rate Limiting**: Upstash
- **Caching**: Redis

### Data Crawling & Aggregation
- **Web Scraping**: Puppeteer/Playwright
- **API Integration**: Platform APIs where available
- **Queue System**: BullMQ/Redis for job processing
- **Scheduling**: Node-cron for automated crawling
- **Data Processing**:
  - Cheerio for HTML parsing
  - Natural for NLP processing
  - Translation API for Vietnamese/English

### Database
- **Primary**: MongoDB (current setup)
- **Caching**: Redis
- **File Storage**: AWS S3/Cloudinary
- **Search**: MongoDB Atlas Search

### DevOps & Infrastructure
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel/Railway
- **Monitoring**: Sentry
- **Analytics**: Vercel Analytics
- **CDN**: Cloudflare

### Development Tools
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky, lint-staged
- **Testing**: Jest, React Testing Library
- **API Testing**: Postman/Insomnia
- **Documentation**: JSDoc, Storybook (optional)

---

## Database Schema

### Collections (MongoDB)

```javascript
// Users Collection
{
  _id: ObjectId,
  email: string,
  name: string,
  password: string (hashed),
  role: "USER" | "ADMIN",
  avatar: string,
  bio: string,
  points: number,
  totalReviews: number,
  hasVerifiedStay: boolean,  // Has completed at least one verified stay
  preferences: {
    language: string,
    notifications: boolean,
    newsletter: boolean
  },
  createdAt: Date,
  updatedAt: Date
}

// Accommodations Collection
{
  _id: ObjectId,
  name: string,
  type: "HOMESTAY" | "HOSTEL" | "HOTEL" | "APARTMENT",
  slug: string,
  description: string,
  address: {
    street: string,
    district: string,
    city: string,
    coordinates: { lat: number, lng: number }
  },
  pricing: {
    daily: number,
    monthly: number,
    currency: string
  },
  amenities: string[],
  images: string[],
  rules: string[],
  capacity: number,
  rooms: number,
  bathrooms: number,
  featured: boolean,
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE",
  stats: {
    rating: number,
    reviewCount: number,
    viewCount: number
  },
  managedBy: ObjectId,  // Admin who last updated
  createdAt: Date,
  updatedAt: Date
}

// Reviews Collection (Aggregated + User-Generated)
{
  _id: ObjectId,
  accommodationId: ObjectId,
  source: "FACEBOOK" | "GOOGLE" | "AGODA" | "BOOKING" | "PLATFORM",
  sourceReviewId: string,  // Original ID from source platform
  sourceUrl: string,       // Link to original review
  userId: ObjectId,         // null for crawled reviews
  reviewerName: string,
  reviewerAvatar: string,
  rating: {
    overall: number,
    cleanliness: number,     // if available from source
    location: number,         // if available from source
    value: number,           // if available from source
    communication: number,   // if available from source
    amenities: number       // if available from source
  },
  title: string,
  content: string,
  language: "VI" | "EN" | "OTHER",
  translatedContent: string,  // Auto-translated version
  images: string[],
  reviewDate: Date,
  crawledAt: Date,
  verified: boolean,
  helpful: number,
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE",
  status: "ACTIVE" | "HIDDEN" | "FLAGGED",
  metadata: {
    likes: number,           // From source platform
    replies: number,         // From source platform
    responseFromOwner: string
  },
  createdAt: Date,
  updatedAt: Date
}

// CrawlJobs Collection
{
  _id: ObjectId,
  platform: "FACEBOOK" | "GOOGLE" | "AGODA" | "BOOKING",
  accommodationId: ObjectId,
  url: string,
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED",
  lastCrawled: Date,
  nextScheduled: Date,
  reviewsFound: number,
  reviewsNew: number,
  reviewsUpdated: number,
  errorLog: string[],
  createdAt: Date,
  updatedAt: Date
}

// Points Collection
{
  _id: ObjectId,
  userId: ObjectId,
  action: string,
  points: number,
  description: string,
  reference: {
    type: "REVIEW" | "PHOTO" | "VOTE" | "BONUS" | "REDEMPTION",
    id: ObjectId
  },
  balance: number,
  createdAt: Date
}

// Rewards Collection
{
  _id: ObjectId,
  name: string,
  description: string,
  category: "COURSE" | "EBOOK" | "MATERIAL" | "MEMBERSHIP",
  pointsCost: number,
  image: string,
  available: boolean,
  stock: number,
  deliveryType: "DIGITAL" | "PHYSICAL",
  redemptions: number,
  createdAt: Date,
  updatedAt: Date
}

// Redemptions Collection
{
  _id: ObjectId,
  userId: ObjectId,
  rewardId: ObjectId,
  pointsSpent: number,
  status: "PENDING" | "APPROVED" | "DELIVERED" | "CANCELLED",
  deliveryInfo: object,
  notes: string,
  processedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Roles and Permissions

### User Roles

#### 1. Guest (Unauthenticated)
- View accommodations
- Read all reviews (crawled & user-generated)
- Search and filter properties
- View rewards catalog
- View platform statistics

#### 2. User (Authenticated)
- All Guest permissions
- Write reviews for properties
- Upload photos with reviews
- Earn points for contributions
- Redeem rewards from catalog
- Save favorite properties
- Manage profile settings
- Vote on review helpfulness
- View personal points history
- Track redemption status

#### 3. Admin
- All User permissions
- **Property Management**:
  - Add/Edit/Remove all properties
  - Update pricing and availability
  - Manage property photos
  - Feature properties on homepage
- **User Management**:
  - View/Edit/Ban users
  - Adjust user points
  - Reset passwords
- **Review Management**:
  - Approve/Reject/Edit reviews
  - Flag/Hide inappropriate content
  - Manage crawling schedules
  - View crawl job status
- **Rewards Management**:
  - Add/Edit rewards catalog
  - Process redemptions
  - Track inventory
- **Platform Configuration**:
  - System settings
  - Analytics dashboard
  - Platform statistics

### Permission Matrix

| Feature | Guest | User | Admin |
|---------|-------|------|-------|
| View Content | ✅ | ✅ | ✅ |
| Write Reviews | ❌ | ✅ | ✅ |
| Earn Points | ❌ | ✅ | ✅ |
| Redeem Rewards | ❌ | ✅ | ✅ |
| Manage Properties | ❌ | ❌ | ✅ |
| Moderate Content | ❌ | ❌ | ✅ |
| Admin Panel | ❌ | ❌ | ✅ |
| User Management | ❌ | ❌ | ✅ |
| Crawl Management | ❌ | ❌ | ✅ |

---

## Rewards System

### Points Economy

#### Earning Mechanisms
1. **Content Creation**
   - Detailed review (200+ words): 50 points
   - Quick review (50-200 words): 25 points
   - Photo upload: 10 points each (max 50/review)
   - Video review: 100 points

2. **Quality Indicators**
   - Verified stay: +30 points
   - Helpful votes received: 5 points each
   - Review of the month: 200 bonus points
   - Complete all rating criteria: +20 points

3. **Engagement**
   - Daily login streak: 5 points/day
   - Share review on social: 15 points
   - Refer new user: 100 points
   - First review bonus: 100 points

4. **Milestones**
   - 10 reviews: 200 bonus points
   - 25 reviews: 500 bonus points
   - 50 reviews: 1000 bonus points
   - Top reviewer of month: 500 points

### Rewards Catalog

#### Educational Resources (Primary Focus)
- **Study Materials** (300-500 points)
  - PDF guides and templates
  - Cheat sheets and summaries
  - Practice exams

- **Online Courses** (1000-2000 points)
  - Skill development courses
  - Language learning access
  - Professional certificates

- **E-books** (200-400 points)
  - Academic textbooks
  - Self-help books
  - Industry guides

#### Platform Benefits
- **Premium Features** (1500 points/month)
  - Ad-free browsing
  - Advanced search filters
  - Priority support

- **Exclusive Access** (800 points)
  - Early property listings
  - Beta features
  - VIP events

### Anti-Gaming Measures
- Minimum word count for reviews
- Photo authenticity verification
- Rate limiting on actions
- Quality score threshold
- Manual review for suspicious activity

---

## Development Plan

### Phase 1: Foundation & Authentication (Week 1-2) ✅ COMPLETED

#### Setup & Configuration ✅
- [x] Initialize Next.js 15 project with TypeScript
- [x] Configure MongoDB connection
- [x] Set up Prisma with MongoDB adapter
- [x] Configure NextAuth.js v5
- [x] Set up environment variables

#### Authentication Implementation ✅
- [x] Create auth schemas in Prisma
- [x] Implement registration flow
- [x] Add email/password login
- [x] Add Google OAuth (configured)
- [x] Create password reset flow (API ready)
- [x] Add email verification (structure ready)
- [x] Set up protected routes
- [x] Create auth middleware

#### Database Foundation ✅
- [x] Design user schema with points system
- [x] Create auth-related collections
- [x] Set up MongoDB indexes (ready to push)
- [x] Implement user CRUD operations
- [x] Add role-based access (USER/ADMIN)

### Phase 2: Data Crawling Infrastructure (Week 3-4)

#### Crawling System Setup
- [ ] Set up Puppeteer/Playwright for web scraping
- [ ] Create crawling job queue with BullMQ
- [ ] Implement Redis for job management
- [ ] Set up cron jobs for scheduled crawling
- [ ] Create error handling and retry logic

#### Platform Crawlers
- [ ] Facebook Reviews crawler
- [ ] Google Reviews/Maps crawler
- [ ] Agoda Reviews crawler
- [ ] Booking.com Reviews crawler
- [ ] Data normalization pipeline
- [ ] Deduplication system

### Phase 3: Core Listings & Review Display (Week 5-6)

#### Accommodation System
- [ ] Create accommodation schema
- [ ] Import initial property data
- [ ] Build listing pages
- [ ] Create property detail views
- [ ] Implement search functionality

#### Review Aggregation Display
- [ ] Design aggregated review UI
- [ ] Create review display components
- [ ] Build platform source indicators
- [ ] Implement sentiment visualization
- [ ] Add review filtering by source
- [ ] Create review timeline view

### Phase 4: Points & Rewards (Week 7-8)

#### Points System
- [ ] Create points tracking schema
- [ ] Implement earning logic
- [ ] Build points dashboard
- [ ] Add transaction history
- [ ] Create leaderboard

#### Rewards Platform
- [ ] Design rewards schema
- [ ] Build rewards catalog
- [ ] Implement redemption flow
- [ ] Add inventory management
- [ ] Create delivery system

### Phase 5: Search & Discovery (Week 9)

#### Search Implementation
- [ ] Set up MongoDB text search
- [ ] Build search interface
- [ ] Add autocomplete
- [ ] Implement filters
- [ ] Create sort options
- [ ] Add pagination

#### Advanced Features
- [ ] Map integration
- [ ] Location-based search
- [ ] Saved searches
- [ ] Search analytics

### Phase 6: User Experience (Week 10)

#### User Dashboard
- [ ] Create dashboard layout
- [ ] Build profile management
- [ ] Add notification system
- [ ] Implement saved properties
- [ ] Create review management

#### Homepage & Navigation
- [ ] Design homepage sections
- [ ] Add featured content
- [ ] Create navigation menu
- [ ] Build footer
- [ ] Add breadcrumbs

### Phase 7: Admin & Moderation (Week 11)

#### Admin Dashboard
- [ ] Create admin layout
- [ ] Build user management
- [ ] Add content moderation
- [ ] Implement analytics
- [ ] Create reports

#### Moderation Tools
- [ ] Review approval queue
- [ ] Content flagging system
- [ ] User verification
- [ ] Automated moderation rules

### Phase 8: Optimization & Polish (Week 12)

#### Performance
- [ ] Implement caching strategy
- [ ] Add lazy loading
- [ ] Optimize images
- [ ] Bundle optimization
- [ ] Database query optimization

#### User Experience
- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Create 404/500 pages
- [ ] Add tooltips and help
- [ ] Improve accessibility

### Phase 9: Testing & Deployment (Week 13-14)

#### Testing
- [ ] Unit tests for utilities
- [ ] Integration tests for API
- [ ] Component testing
- [ ] E2E testing setup
- [ ] Performance testing

#### Deployment
- [ ] Docker configuration
- [ ] CI/CD pipeline
- [ ] Production environment
- [ ] Monitoring setup
- [ ] Backup strategy

---

## UI/UX Guidelines

### Design Principles
1. **Mobile-First**: Optimize for mobile devices primarily
2. **Vietnamese-Friendly**: Support Vietnamese language and cultural context
3. **Clean & Modern**: Minimalist design with clear hierarchy
4. **Accessible**: WCAG 2.1 AA compliance
5. **Fast**: Instant feedback and quick load times

### Visual Design
- **Color Palette**:
  - Primary: #ECA829 (Golden)
  - Secondary: #1F2937 (Dark Gray)
  - Accent: #10B981 (Green for success)
  - Background: #FFFFFF / #F9FAFB
  - Text: #111827 / #6B7280

- **Typography**:
  - Headings: Inter/Plus Jakarta Sans
  - Body: System fonts
  - Vietnamese support required

- **Components**:
  - Card-based layouts
  - Consistent spacing (8px grid)
  - Subtle shadows and borders
  - Smooth transitions

### User Experience
- **Onboarding**: Simple 3-step process
- **Search**: Prominent and always accessible
- **Reviews**: Easy to read and write
- **Points**: Clear visibility of balance
- **Mobile**: Bottom navigation for key actions

### Localization
- Vietnamese as primary language
- Date/time in local format
- Currency in VND
- Local phone number format
- District-based navigation

---

## API Architecture

### RESTful Endpoints

#### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/verify-email
```

#### Users
```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/:id
DELETE /api/users/:id (admin)
GET    /api/users/:id/reviews
GET    /api/users/:id/points
```

#### Accommodations
```
GET    /api/accommodations
POST   /api/accommodations
GET    /api/accommodations/:id
PUT    /api/accommodations/:id
DELETE /api/accommodations/:id
GET    /api/accommodations/search
```

#### Reviews
```
GET    /api/reviews                    # Get aggregated reviews
GET    /api/reviews/crawled            # Get only crawled reviews
GET    /api/reviews/platform           # Get only platform reviews
POST   /api/reviews                    # Create new platform review
GET    /api/reviews/:id
PUT    /api/reviews/:id
DELETE /api/reviews/:id
POST   /api/reviews/:id/helpful
POST   /api/reviews/:id/report
```

#### Crawling Management
```
POST   /api/crawl/job                  # Create new crawl job
GET    /api/crawl/jobs                 # List all crawl jobs
GET    /api/crawl/jobs/:id            # Get job status
POST   /api/crawl/execute/:platform   # Trigger manual crawl
GET    /api/crawl/stats               # Crawling statistics
```

#### Points & Rewards
```
GET    /api/points/balance
GET    /api/points/history
POST   /api/points/earn
GET    /api/rewards
GET    /api/rewards/:id
POST   /api/rewards/redeem
GET    /api/redemptions
```

### Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

### Error Handling
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "field": "field_name"
  }
}
```

---

## Future Enhancements

### Short Term (3-6 months)
1. **Mobile App**: React Native implementation
2. **Advanced Search**: AI-powered recommendations
3. **Social Features**:
   - Follow other reviewers
   - Share lists
   - Comment on reviews
4. **Booking Integration**: Direct booking capability
5. **Verified Stays**: Integration with booking platforms
6. **Multi-language**: English support

### Medium Term (6-12 months)
1. **Expansion**: Other cities in Vietnam
2. **Partner Program**: Property owner tools
3. **API Platform**: Public API for partners
4. **Advanced Analytics**: Business intelligence
5. **Chatbot Support**: AI customer service
6. **Video Reviews**: Video upload capability

### Long Term (12+ months)
1. **Blockchain Rewards**: Tokenized points system
2. **AR Features**: Virtual property tours
3. **AI Moderation**: Automated content review
4. **Marketplace**: Student services marketplace
5. **Community Events**: Meetups and networking
6. **Education Platform**: Full LMS integration

---

## Success Metrics

### Key Performance Indicators (KPIs)

#### User Metrics
- Monthly Active Users (MAU): 10,000+
- User Retention (30-day): >40%
- Average Reviews per User: 3+
- User Satisfaction (NPS): >50

#### Content Metrics
- Total Properties Listed: 1,000+
- Reviews per Property: 5+ average
- Review Quality Score: >80%
- Photo Upload Rate: 60%

#### Engagement Metrics
- Daily Active Users (DAU): 2,000+
- Average Session Duration: >5 minutes
- Points Redemption Rate: 30%
- Social Share Rate: 20%

#### Business Metrics
- Cost per Acquisition: <$5
- Lifetime Value (LTV): >$50
- Redemption Cost: <$2/user
- Platform Growth: 20% MoM

### Technical Metrics
- Page Load Time: <2 seconds
- API Response Time: <200ms
- Uptime: 99.9%
- Error Rate: <0.1%

---

## Risk Mitigation

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Database scaling | Performance degradation | MongoDB sharding, caching layer |
| Review fraud | Trust erosion | Verification system, ML detection |
| Point gaming | Economic imbalance | Rate limiting, manual review |
| Data breach | User trust loss | Security audits, encryption |

### Business Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Low user adoption | Platform failure | Marketing, referral program |
| Content quality | User dissatisfaction | Moderation, incentives |
| Reward costs | Unsustainable economics | Dynamic pricing, partnerships |
| Competition | Market share loss | Unique features, community focus |

---

## Notes & Decisions

### Technical Decisions
- **MongoDB over PostgreSQL**: Better for flexible schema and geographic queries
- **NextAuth.js v5**: Latest version with improved TypeScript support
- **Prisma ORM**: Type safety and excellent MongoDB support
- **TanStack Query**: Superior caching and synchronization

### Business Decisions
- **Points over Cash**: Educational rewards align with target audience
- **Manual Moderation**: Quality over quantity initially
- **Hanoi Focus**: Prove model before expansion
- **Mobile-First**: Young users primarily on mobile

### Development Priorities
1. **Authentication**: Foundation for all features
2. **Basic Reviews**: Core value proposition
3. **Points System**: Differentiation factor
4. **Search**: User discovery mechanism
5. **Admin Tools**: Operational necessity

---

## Project Status

### Current State
- ✅ Project initialized with Next.js 15
- ✅ MongoDB configured with Prisma
- ✅ Authentication system complete (NextAuth.js v5)
- ✅ User management with roles (USER/ADMIN)
- ✅ Protected routes and middleware
- ✅ Basic UI components ready
- ✅ Rewards UI components created
- ✅ Search & filter components built
- ✅ Admin dashboard skeleton ready
- 🚧 Platform-native review system (Phase 2)
- 📋 Points calculation logic
- 📋 Data crawling system (moved to post-MVP)

### Next Steps - Phase 2 Priority
1. Create review submission form
2. Build review API endpoints
3. Implement points calculation logic
4. Add review display components
5. Create review moderation system
6. Test review workflow end-to-end
7. Add photo upload for reviews

### Blockers
- None currently

---

_Last Updated: 2025-01-16_
_Project: Chic Review - Hanoi Accommodation Review Platform_
_Version: 3.0_
_Status: Authentication Implementation + Data Crawling Architecture Planning_