'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface SupabaseContextType {
  supabase: null;
  session: null;
}

const SupabaseContext = createContext<SupabaseContextType>({
  supabase: null,
  session: null,
});

export function SupabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SupabaseContext.Provider value={{ supabase: null, session: null }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => useContext(SupabaseContext);
