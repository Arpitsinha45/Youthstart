
import { Story, TrendingStartup, FundingNews, Author } from './types';

export const AUTHORS: Author[] = [
  {
    id: 'editorial',
    name: 'YouthStartup Editorial',
    role: 'Editorial Team',
    bio: 'The collective voice of YouthStartup.in, dedicated to bringing you the most accurate and inspiring stories from the global startup ecosystem.',
    avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=200',
    social: { website: 'https://youthstartup.in' }
  },
  {
    id: 'tech-desk',
    name: 'Tech Desk',
    role: 'Technology Analyst',
    bio: 'Deep-diving into the latest technological shifts, from AI breakthroughs to infrastructure evolution.',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'founder-stories',
    name: 'Founder Stories',
    role: 'Storyteller',
    bio: 'Capturing the raw, unfiltered journeys of entrepreneurs who are building the future.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  }
];

export const LATEST_STORIES: Story[] = [
  {
    id: '1',
    title: "How Young Founders Are Building AI Startups Without Funding",
    slug: 'young-founders-ai-no-funding',
    category: 'Startups',
    excerpt: 'A new wave of entrepreneurs is leveraging low-code AI tools to build profitable ventures without traditional VC backing.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000',
    author: 'YouthStartup Editorial',
    authorId: 'editorial',
    publishedAt: 'Feb 20, 2026',
    readTime: '12 min',
    published: true,
    sponsored: false,
    featured: true
  },
  {
    id: '2',
    title: 'Top 10 AI Productivity Tools for Early-Stage Builders in 2026',
    slug: 'top-10-ai-tools-2026',
    category: 'AI Tools',
    excerpt: 'From automated research to autonomous coding agents, these tools are redefining the startup stack.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    author: 'Tech Desk',
    authorId: 'tech-desk',
    publishedAt: 'Feb 19, 2026',
    readTime: '6 min',
    published: true,
    sponsored: false,
    featured: true
  },
  {
    id: '3',
    title: 'SolarGrid Secures $15M Series A to Decentralize Energy in Tier-2 Cities',
    slug: 'solargrid-funding-news',
    category: 'Funding',
    excerpt: 'The startup aims to provide affordable solar solutions to small businesses across regional India.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=1200',
    author: 'Business Desk',
    publishedAt: 'Feb 18, 2026',
    readTime: '5 min',
    published: true,
    sponsored: false,
    featured: true
  },
  {
    id: '4',
    title: 'The Rise of the Solopreneur: Building a $1M Business with Zero Employees',
    slug: 'solopreneur-rise-1m-business',
    category: 'Creator Economy',
    excerpt: 'How the creator economy is enabling individuals to build high-margin businesses using automation.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200',
    author: 'Founder Stories',
    authorId: 'founder-stories',
    publishedAt: 'Feb 17, 2026',
    readTime: '8 min',
    published: true,
    sponsored: false
  },
  {
    id: '5',
    title: 'Why SaaS is Moving Towards "Vertical AI" in 2026',
    slug: 'vertical-ai-saas-2026',
    category: 'Tech',
    excerpt: 'General AI is being replaced by highly specialized agents tailored for specific industries.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    author: 'Tech Desk',
    authorId: 'tech-desk',
    publishedAt: 'Feb 16, 2026',
    readTime: '7 min',
    published: true,
    sponsored: false
  },
  {
    id: '6',
    title: '5 Startup Ideas for the Post-AGI Economy',
    slug: 'startup-ideas-post-agi',
    category: 'Startup Ideas',
    excerpt: 'As automation reaches new heights, human-centric services are becoming the new luxury.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    author: 'Idea Lab',
    publishedAt: 'Feb 15, 2026',
    readTime: '10 min',
    published: true,
    sponsored: false
  },
  {
    id: '7',
    title: 'The Case Study of "Lumina": From 0 to 100k Users in 3 Months',
    slug: 'lumina-case-study',
    category: 'Case Studies',
    excerpt: 'A deep dive into the viral growth mechanics of the latest AI design tool.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    author: 'Growth Desk',
    publishedAt: 'Feb 14, 2026',
    readTime: '15 min',
    published: true,
    sponsored: false
  },
  {
    id: '8',
    title: 'The Ultimate Guide to Raising Your First Angel Round',
    slug: 'angel-round-guide',
    category: 'Guides',
    excerpt: 'Everything you need to know about valuation, term sheets, and finding the right investors.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1200',
    author: 'Investment Desk',
    publishedAt: 'Feb 13, 2026',
    readTime: '20 min',
    published: true,
    sponsored: false
  },
  {
    id: '10',
    title: 'The Future of Work: Why Remote-First Startups are Winning the Talent War',
    slug: 'future-of-work-remote-first',
    category: 'Business',
    excerpt: 'How distributed teams are outperforming their office-bound counterparts in 2026.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    author: 'Workplace Desk',
    publishedAt: 'Feb 11, 2026',
    readTime: '9 min',
    published: true,
    sponsored: false
  },
  {
    id: '12',
    title: 'The Future of Quantum Computing in Startup Innovation',
    slug: 'quantum-computing-innovation',
    category: 'Tech',
    excerpt: 'Exploring how quantum computing is set to revolutionize various industries and create new startup opportunities.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1639322537228-fef322876778?auto=format&fit=crop&q=80&w=1200',
    author: 'Tech Desk',
    authorId: 'tech-desk',
    publishedAt: 'Feb 09, 2026',
    readTime: '14 min',
    published: true,
    sponsored: false
  },
  {
    id: '13',
    title: 'Sustainable Startups: Eco-Friendly Innovations Gaining Traction',
    slug: 'sustainable-startups-eco-friendly',
    category: 'Business',
    excerpt: 'A look into startups that are making a positive environmental impact while achieving business success.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1200',
    author: 'YouthStartup Editorial',
    authorId: 'editorial',
    publishedAt: 'Feb 08, 2026',
    readTime: '10 min',
    published: true,
    sponsored: false
  },
  {
    id: '14',
    title: 'The Impact of Web3 on the Creator Economy: New Monetization Models',
    slug: 'web3-creator-economy',
    category: 'Creator Economy',
    excerpt: 'How blockchain and decentralization are empowering creators with new ways to monetize their content and engage with fans.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1642673321558-f2979679199d?auto=format&fit=crop&q=80&w=1200',
    author: 'Creator Desk',
    publishedAt: 'Feb 07, 2026',
    readTime: '13 min',
    published: true,
    sponsored: false
  }
];

export const FEATURED_STORY: Story | null = LATEST_STORIES[0];

export const CATEGORIES = [
  'Startups', 'AI Tools', 'Business', 'Tech', 'Creator Economy'
];

export const SIDEBAR_MENU = [
  { label: 'Trending', id: 'trending' },
  { label: 'AI News', id: 'ai-news' },
  { label: 'Founder Stories', id: 'founder-stories' },
  { label: 'Funding Updates', id: 'funding-updates' },
  { label: 'Startup Ideas', id: 'startup-ideas' }
];

export const TRENDING_AI_TOOLS = [
  { name: 'Agentic.ai', growth: '+120%', category: 'Coding' },
  { name: 'Lumina', growth: '+85%', category: 'Design' },
  { name: 'FlowState', growth: '+60%', category: 'Productivity' },
  { name: 'Synthetix', growth: '+45%', category: 'Video' }
];
