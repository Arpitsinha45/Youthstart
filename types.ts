
// Fix: Complete User type and export missing Story, TrendingStartup, and FundingNews interfaces
export interface User {
  id: string;
  email: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  authorId?: string; // Optional for backward compatibility or simple cases
  publishedAt: string;
  readTime: string;
  published: boolean;
  sponsored: boolean;
  featured?: boolean;
}

export interface TrendingStartup {
  id: string;
  rank: number;
  name: string;
  description: string;
}

export interface FundingNews {
  id: string;
  startup: string;
  stage: string;
  investor: string;
  amount: string;
}
