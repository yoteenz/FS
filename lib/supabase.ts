import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can generate these from your Supabase project)
export interface WigCustomization {
  id?: string
  cap_size: string
  length: string
  density: string
  lace: string
  texture: string
  color: string
  hairline: string
  styling: string
  add_ons: string[]
  base_price: number
  total_price: number
  created_at?: string
  updated_at?: string
}

export interface WigOption {
  id: string
  category: string
  name: string
  price: number
  image_url: string
  description?: string
  is_premium?: boolean
}

// API functions for wig customization
export const wigApi = {
  // Get all wig options by category
  async getWigOptions(category: string): Promise<WigOption[]> {
    const { data, error } = await supabase
      .from('wig_options')
      .select('*')
      .eq('category', category)
      .order('price', { ascending: true })

    if (error) {
      console.error('Error fetching wig options:', error)
      return []
    }

    return data || []
  },

  // Save wig customization
  async saveCustomization(customization: WigCustomization): Promise<WigCustomization | null> {
    const { data, error } = await supabase
      .from('wig_customizations')
      .insert([customization])
      .select()
      .single()

    if (error) {
      console.error('Error saving customization:', error)
      return null
    }

    return data
  },

  // Get saved customizations
  async getCustomizations(): Promise<WigCustomization[]> {
    const { data, error } = await supabase
      .from('wig_customizations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching customizations:', error)
      return []
    }

    return data || []
  },

  // Update customization
  async updateCustomization(id: string, updates: Partial<WigCustomization>): Promise<WigCustomization | null> {
    const { data, error } = await supabase
      .from('wig_customizations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating customization:', error)
      return null
    }

    return data
  },

  // Delete customization
  async deleteCustomization(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('wig_customizations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting customization:', error)
      return false
    }

    return true
  }
}
