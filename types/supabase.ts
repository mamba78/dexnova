// types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      watchlist: {
        Row: {
          id: number
          wallet: string
          token_address: string
          chain: string
          created_at: string
        }
        Insert: {
          id?: number
          wallet: string
          token_address: string
          chain: string
          created_at?: string
        }
      }
      // add more tables later
    }
  }
}