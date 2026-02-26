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
  featured_image?: string;
  category_id?: string;
  author_id: string;
  is_featured: boolean;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  og_image?: string;
  tags?: string[]; // Array of tag IDs or names
}
