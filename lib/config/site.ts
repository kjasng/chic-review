export const siteConfig = {
  name: 'Chic Review',
  description:
    'A modern fullstack application built with Next.js 15, TypeScript, and TanStack Query',
  url: 'http://localhost:3000',
  ogImage: '/og.jpg',
  links: {
    twitter: 'https://twitter.com/',
    github: 'https://github.com/',
  },
  authors: [
    {
      name: 'Chic Review Team',
      url: 'http://localhost:3000',
    },
  ],
  creator: 'Chic Review Team',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'TailwindCSS',
    'Prisma',
    'NextAuth',
    'TanStack Query',
  ],

  // Navigation
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
  ],

  // Footer links
  footerNav: [
    {
      title: 'Company',
      items: [
        {
          title: 'About',
          href: '/about',
        },
        {
          title: 'Privacy',
          href: '/privacy',
        },
        {
          title: 'Terms',
          href: '/terms',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help Center',
          href: '/help',
        },
        {
          title: 'Contact',
          href: '/contact',
        },
      ],
    },
  ],
}

export type SiteConfig = typeof siteConfig
