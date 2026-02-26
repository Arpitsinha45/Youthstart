import { getSupabaseClient } from './supabase';
import { Story } from '../types';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover: string;
  category: string;
  featured: boolean;
  created_at: string;
  author?: string;
  excerpt?: string;
  read_time?: string;
}

export async function getPosts(): Promise<Story[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return []; // Fallback if Supabase is not configured

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return (data || []).map(mapPostToStory);
}

export async function getPostBySlug(slug: string): Promise<Story | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }

  return data ? mapPostToStory(data) : null;
}

export async function getFeaturedPosts(): Promise<Story[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }

  return (data || []).map(mapPostToStory);
}

function mapPostToStory(post: Post): Story {
  // Calculate read time if not present
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readTime = post.read_time || `${Math.ceil(wordCount / 200)} min read`;
  
  // Generate excerpt if not present
  const excerpt = post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : '');

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    excerpt: excerpt,
    content: post.content,
    featuredImage: post.cover, // Map cover to featuredImage
    author: post.author || 'YouthStartup Team', // Default author
    publishedAt: new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: readTime,
    published: true,
    sponsored: false,
    featured: post.featured
  };
}
