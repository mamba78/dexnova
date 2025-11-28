// lib/supabaseClient.ts
'use client';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

let client: ReturnType<typeof createBrowserSupabaseClient<Database>> | null = null;

export const getSupabaseClient = () => {
  if (!client) {
    client = createBrowserSupabaseClient<Database>({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    });
  }
  return client;
};