import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Admin Client
 * 
 * This client uses the service role key (if available) to bypass Row Level Security (RLS).
 * Used in API routes for admin operations (create, update, delete).
 * 
 * Falls back to anon key if service role key is not set.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
