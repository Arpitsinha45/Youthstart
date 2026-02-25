import { supabase } from './supabase';
import { Story, Startup, Submission, MediaItem } from '../types';
import { Post } from './api';

// --- Dashboard Stats ---
export async function getDashboardStats() {
  try {
    const { count: postsCount } = await supabase.from('posts').select('*', { count: 'exact', head: true });
    
    // Check if startups table exists by trying to select
    let startupsCount = 0;
    let featuredStartupsCount = 0;
    try {
      const { count } = await supabase.from('startups').select('*', { count: 'exact', head: true });
      startupsCount = count || 0;
      
      const { count: featured } = await supabase.from('startups').select('*', { count: 'exact', head: true }).eq('featured', true);
      featuredStartupsCount = featured || 0;
    } catch (e) {
      console.warn('Startups table might not exist yet');
    }

    // Check if submissions table exists
    let submissionsCount = 0;
    try {
      const { count } = await supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      submissionsCount = count || 0;
    } catch (e) {
      console.warn('Submissions table might not exist yet');
    }

    return {
      posts: postsCount || 0,
      startups: startupsCount,
      submissions: submissionsCount,
      featuredStartups: featuredStartupsCount
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      posts: 0,
      startups: 0,
      submissions: 0,
      featuredStartups: 0
    };
  }
}

// --- Posts Management ---
export async function createPost(post: Omit<Story, 'id' | 'publishedAt' | 'readTime'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      cover: post.featuredImage,
      category: post.category,
      featured: post.featured || false,
      author: post.author,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id: string, post: Partial<Story>) {
  const updates: any = {};
  if (post.title) updates.title = post.title;
  if (post.slug) updates.slug = post.slug;
  if (post.content) updates.content = post.content;
  if (post.excerpt) updates.excerpt = post.excerpt;
  if (post.featuredImage) updates.cover = post.featuredImage;
  if (post.category) updates.category = post.category;
  if (post.featured !== undefined) updates.featured = post.featured;
  if (post.author) updates.author = post.author;

  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: string) {
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw error;
}

// --- Startups Management ---
export async function getStartups(): Promise<Startup[]> {
  try {
    const { data, error } = await supabase
      .from('startups')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching startups (table might not exist):', error);
      return [];
    }

    return data.map((s: any) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      logo: s.logo,
      website: s.website,
      founder: s.founder,
      category: s.category,
      stage: s.stage,
      featured: s.featured,
      createdAt: s.created_at,
      approved: s.approved
    }));
  } catch (error) {
    console.warn('Startups table likely missing');
    return [];
  }
}

export async function updateStartup(id: string, updates: Partial<Startup>) {
  const dbUpdates: any = {};
  if (updates.name) dbUpdates.name = updates.name;
  if (updates.description) dbUpdates.description = updates.description;
  if (updates.logo) dbUpdates.logo = updates.logo;
  if (updates.website) dbUpdates.website = updates.website;
  if (updates.founder) dbUpdates.founder = updates.founder;
  if (updates.category) dbUpdates.category = updates.category;
  if (updates.stage) dbUpdates.stage = updates.stage;
  if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
  if (updates.approved !== undefined) dbUpdates.approved = updates.approved;

  const { data, error } = await supabase
    .from('startups')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteStartup(id: string) {
  const { error } = await supabase.from('startups').delete().eq('id', id);
  if (error) throw error;
}

// --- Submissions Management ---
export async function getSubmissions(): Promise<Submission[]> {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching submissions (table might not exist):', error);
      return [];
    }

    return data.map((s: any) => ({
      id: s.id,
      startupName: s.startup_name,
      description: s.description,
      founderName: s.founder_name,
      email: s.email,
      website: s.website,
      category: s.category,
      status: s.status,
      submittedAt: s.created_at
    }));
  } catch (error) {
    console.warn('Submissions table likely missing');
    return [];
  }
}

export async function updateSubmissionStatus(id: string, status: 'approved' | 'rejected') {
  const { data, error } = await supabase
    .from('submissions')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function approveSubmission(submission: Submission) {
  // 1. Update submission status
  await updateSubmissionStatus(submission.id, 'approved');

  // 2. Create new startup entry
  const { data, error } = await supabase
    .from('startups')
    .insert([{
      name: submission.startupName,
      description: submission.description,
      founder: submission.founderName,
      website: submission.website,
      category: submission.category,
      approved: true,
      featured: false,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// --- Media Management ---
export async function uploadImage(file: File): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function getImages(): Promise<MediaItem[]> {
  try {
    const { data, error } = await supabase.storage.from('images').list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) {
      console.warn('Error fetching images (bucket might not exist):', error);
      return [];
    }

    return data.map((file) => {
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(file.name);
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
    console.warn('Images bucket likely missing');
    return [];
  }
}
