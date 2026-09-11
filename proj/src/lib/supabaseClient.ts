import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// `supabase` is null until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set
// in a .env file (see .env.example). Forms check `isSupabaseConfigured` and show
// a friendly "not set up yet" message instead of crashing when it's missing.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null
