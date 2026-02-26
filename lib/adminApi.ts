import { getSupabaseClient } from './supabase';
// Central CMS API service for YouthStartup
import { Post, Page, Navigation, Footer, FeaturedContent } from '../src/types/admin';

// --- Helpers ---

/**
 * Generates a URL-friendly slug from a string.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Autosaves a draft of a post.
 * For now, this just updates the post in the database if it's a draft.
 */
export async function autosaveDraft(post: Partial<Post> & { id: string }) {
  if (post.status !== 'draft') return;
  return updatePost(post.id, post);
}

// --- Posts Management ---

export async function getAdminPosts(): Promise<Post[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    return null;
  }

  return data;
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id: string, post: Partial<Post>) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: string) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw error;
}

// --- Image Upload ---

export async function uploadImage(file: File): Promise<string> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// --- Pages Management ---

export async function getPages(): Promise<Page[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }

  return data || [];
}

export async function createPage(page: Omit<Page, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { data, error } = await supabase
    .from('pages')
    .insert([page])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePage(id: string, page: Partial<Page>) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { data, error } = await supabase
    .from('pages')
    .update(page)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePage(id: string) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { error } = await supabase.from('pages').delete().eq('id', id);
  if (error) throw error;
}

// --- Navigation Management ---

export async function getNavigation(): Promise<Navigation | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('site_navigation')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching navigation:', error);
    return null;
  }

  return data;
}

export async function updateNavigation(data: Partial<Navigation>) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { data: updatedData, error } = await supabase
    .from('site_navigation')
    .upsert(data)
    .select()
    .single();

  if (error) throw error;
  return updatedData;
}

// --- Footer Management ---

export async function getFooter(): Promise<Footer | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('site_footer')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching footer:', error);
    return null;
  }

  return data;
}

export async function updateFooter(data: Partial<Footer>) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { data: updatedData, error } = await supabase
    .from('site_footer')
    .upsert(data)
    .select()
    .single();

  if (error) throw error;
  return updatedData;
}

// --- Featured Content Management ---

export async function getFeatured(): Promise<FeaturedContent | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('featured_content')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching featured content:', error);
    return null;
  }

  return data;
}

export async function updateFeatured(data: Partial<FeaturedContent>) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { data: updatedData, error } = await supabase
    .from('featured_content')
    .upsert(data)
    .select()
    .single();

  if (error) throw error;
  return updatedData;
}

// --- Legacy / Additional Functions (to avoid breaking existing code) ---

export async function getDashboardStats() {
  const supabase = getSupabaseClient();
  if (!supabase) return { posts: 0, startups: 0, submissions: 0, featuredStartups: 0 };

  try {
    const { count: postsCount } = await supabase.from('posts').select('*', { count: 'exact', head: true });
    return {
      posts: postsCount || 0,
      startups: 0, // Placeholder
      submissions: 0, // Placeholder
      featuredStartups: 0 // Placeholder
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return { posts: 0, startups: 0, submissions: 0, featuredStartups: 0 };
  }
}

export async function getImages() {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase.storage.from('media').list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) return [];

    return data.map((file) => {
      const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(file.name);
      return {
        id: file.id,
        name: file.name,
        url: publicUrlData.publicUrl,
        type: file.metadata?.mimetype || 'image/jpeg',
        size: file.metadata?.size || 0,
        createdAt: file.created_at,
      };
    });
  } catch (error) {
    return [];
  }
}

export { getAdminPosts as getPosts };
