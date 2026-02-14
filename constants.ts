
import { Story, TrendingStartup, FundingNews } from './types';

export const LATEST_STORIES: Story[] = [
  {
    id: '1',
    title: 'The Art of the Pivot: How a Failed Food App Became India’s Leading Agri-Tech Disruptor',
    slug: 'art-of-the-pivot',
    category: 'Founder Stories',
    excerpt: 'Witness the journey of GreenYield, a startup that navigated the brink of bankruptcy to revolutionize supply chains for 50,000 farmers.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
    author: 'Editorial Team',
    publishedAt: 'Oct 24, 2024',
    readTime: '8 min',
    published: true,
    sponsored: false
  },
  {
    id: '2',
    title: 'Why Bengaluru is Losing Its Crown as the Solo Capital of Indian Startups',
    slug: 'bengaluru-losing-crown',
    category: 'Tech',
    excerpt: 'The rise of Tier-2 cities like Indore and Pune is creating a distributed ecosystem that might just be the future of Indian tech.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1200',
    author: 'Rohit Verma',
    publishedAt: 'Oct 22, 2024',
    readTime: '5 min',
    published: true,
    sponsored: false
  },
  {
    id: '3',
    title: 'From Dorm Room to $10M: The Inside Story of India’s Youngest EdTech Exit',
    slug: 'dorm-room-to-exit',
    category: 'Student Startups',
    excerpt: 'Two 19-year-olds from IIT Delhi just sold their micro-learning platform for a record-breaking sum. Here is how they did it.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    author: 'Ananya S.',
    publishedAt: 'Oct 20, 2024',
    readTime: '12 min',
    published: true,
    sponsored: false
  }
];

export const FEATURED_STORY: Story | null = LATEST_STORIES[0];

export const CENTER_SECONDARY_STORIES: Story[] = [
  {
    id: '4',
    title: 'The Invisible Workforce: How Gig Economy Platforms are Rewriting Labor Laws',
    slug: 'invisible-workforce',
    category: 'Strategy',
    excerpt: 'As platforms scale, the tension between flexibility and stability reaches a boiling point in India’s metro cities.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200',
    author: 'Vikram Mehta',
    publishedAt: 'Oct 18, 2024',
    readTime: '10 min',
    published: true,
    sponsored: false
  },
  {
    id: '5',
    title: 'Sustainable Luxury: The Fashion Founders Betting on Bamboo and Hemp',
    slug: 'sustainable-luxury',
    category: 'Side Hustles',
    excerpt: 'High-end consumers are finally ready to pay a premium for carbon-neutral wardrobes. A look at the designers leading the charge.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    author: 'Maya Kapur',
    publishedAt: 'Oct 15, 2024',
    readTime: '7 min',
    published: true,
    sponsored: false
  }
];

export const TRENDING_STARTUPS: TrendingStartup[] = [
  { id: '1', rank: 1, name: 'Z-Power', description: 'Next-gen solid-state batteries for affordable EVs.' },
  { id: '2', rank: 2, name: 'LearnLoop', description: 'AI tutor that adapts to regional Indian dialects.' },
  { id: '3', rank: 3, name: 'AgriScan', description: 'Hyper-local satellite imagery for small-hold farmers.' },
  { id: '4', rank: 4, name: 'QuickHealth', description: 'Instant diagnostic kits for Tier-3 villages.' },
  { id: '5', rank: 5, name: 'CodeCraft', description: 'No-code platform for local shopkeepers to go digital.' }
];

export const FUNDING_NEWS: FundingNews | null = {
  id: 'f1',
  startup: 'SolarGrid',
  stage: 'Series A',
  investor: 'Sequoia India & Accel',
  amount: '₹120 Crore'
};

export const MORE_STORIES: Story[] = [
  {
    id: '6',
    title: 'Building for the Next Billion: Why Localization is No Longer Optional',
    slug: 'building-next-billion',
    category: 'Tech',
    excerpt: 'Startups that ignore regional languages are leaving billions on the table. The shift towards Bharat-first design.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200',
    author: 'Editorial',
    publishedAt: 'Oct 12, 2024',
    readTime: '6 min',
    published: true,
    sponsored: false
  },
  {
    id: '7',
    title: 'The Mental Health Crisis in Indian High-Stakes Founding',
    slug: 'mental-health-crisis',
    category: 'Founder Stories',
    excerpt: 'Underneath the glamour of funding rounds lies a silent epidemic of burnout. Founders open up about the toll of 100-hour weeks.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    author: 'Dr. Amit Shah',
    publishedAt: 'Oct 10, 2024',
    readTime: '15 min',
    published: true,
    sponsored: false
  },
  {
    id: '8',
    title: 'Zero-Waste Kitchens: The New Profitable Frontier in Cloud Kitchens',
    slug: 'zero-waste-kitchens',
    category: 'Side Hustles',
    excerpt: 'How data-driven inventory management is helping small cloud kitchens eliminate waste and double their margins.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200',
    author: 'Sara Khan',
    publishedAt: 'Oct 08, 2024',
    readTime: '5 min',
    published: true,
    sponsored: false
  }
];
