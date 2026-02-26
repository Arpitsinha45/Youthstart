export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Post {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  category_id?: string;
  status: 'draft' | 'published' | 'scheduled';
  featured: boolean;
  author_id: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Navigation {
  id: string;
  links: { label: string; url: string }[];
  updated_at: string;
}

export interface Footer {
  id: string;
  content: any;
  updated_at: string;
}

export interface FeaturedContent {
  id: string;
  post_ids: string[];
  updated_at: string;
}
