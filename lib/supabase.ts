import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Only initialize if we have the keys and the client doesn't exist yet
  if (supabaseUrl && supabaseAnonKey && !supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are not set. Database features will be disabled.');
  }

  return supabase;
}
