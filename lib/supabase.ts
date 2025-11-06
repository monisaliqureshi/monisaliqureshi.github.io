import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      greeting: {
        Row: {
          id: string
          title: string
          title2: string
          nickname: string
          full_name: string
          subtitle: string
          resume_link: string
          mail: string
          updated_at: string
        }
      }
      social_media: {
        Row: {
          id: string
          platform: string
          url: string
          updated_at: string
        }
      }
      skills: {
        Row: {
          id: string
          title: string
          filename: string
          skills_list: string[]
          software_skills: any[]
          order_index: number
          updated_at: string
        }
      }
      experiences: {
        Row: {
          id: string
          title: string
          company: string
          company_url: string
          logo_path: string
          duration: string
          location: string
          descriptions: string[]
          color: string
          order_index: number
          updated_at: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          url: string
          descriptions: string[]
          languages: any[]
          order_index: number
          updated_at: string
        }
      }
      education: {
        Row: {
          id: string
          title: string
          subtitle: string
          logo_path: string
          alt_name: string
          duration: string
          descriptions: string[]
          website_link: string
          order_index: number
          updated_at: string
        }
      }
      certifications: {
        Row: {
          id: string
          title: string
          subtitle: string
          logo_path: string
          certificate_link: string
          alt_name: string
          color_code: string
          order_index: number
          updated_at: string
        }
      }
      contact: {
        Row: {
          id: string
          title: string
          profile_image_path: string
          description: string
          blog_title: string
          blog_subtitle: string
          blog_link: string
          updated_at: string
        }
      }
    }
  }
}
