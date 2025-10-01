// src/lib/types.ts

// Type definitions for Supabase tables based on the project summary
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
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          loyalty_points: number | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          loyalty_points?: number | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          loyalty_points?: number | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          dimensions: Json | null
          materials: string[] | null
          category_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          dimensions?: Json | null
          materials?: string[] | null
          category_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          dimensions?: Json | null
          materials?: string[] | null
          category_id?: string | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          parent_id: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          parent_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          parent_id?: string | null
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          is_primary: boolean
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          is_primary?: boolean
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          is_primary?: boolean
        }
      }
      lookbook_galleries: {
        Row: {
          id: string
          title: string
          description: string | null
          cover_image_url: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          cover_image_url?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          cover_image_url?: string | null
        }
      }
      lookbook_hotspots: {
        Row: {
          id: string
          gallery_id: string
          product_id: string
          coordinates: Json
        }
        Insert: {
          id?: string
          gallery_id: string
          product_id: string
          coordinates: Json
        }
        Update: {
          id?: string
          gallery_id?: string
          product_id?: string
          coordinates?: Json
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          rating: number
          comment: string | null
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          rating: number
          comment?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
          rating?: number
          comment?: string | null
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          product_id: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
        }
      }
      loyalty_points_log: {
        Row: {
          id: string
          user_id: string
          points_awarded: number
          reason: string
          related_entity_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          points_awarded: number
          reason: string
          related_entity_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          points_awarded?: number
          reason?: string
          related_entity_id?: string | null
        }
      }
      user_generated_content: {
        Row: {
          id: string
          user_id: string
          image_url: string
          approved: boolean
        }
        Insert: {
          id?: string
          user_id: string
          image_url: string
          approved?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          image_url?: string
          approved?: boolean
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          author_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}