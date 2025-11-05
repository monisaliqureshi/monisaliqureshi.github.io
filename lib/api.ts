import { supabase } from './supabase'

// Greeting
export const getGreeting = async () => {
  const { data, error } = await supabase
    .from('greeting')
    .select('*')
    .single()
  
  if (error) throw error
  return data
}

// Social Media
export const getSocialMedia = async () => {
  const { data, error } = await supabase
    .from('social_media')
    .select('*')
  
  if (error) throw error
  return data
}

// Skills
export const getSkills = async () => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true })
  
  if (error) throw error
  return data
}

// Experiences
export const getExperiences = async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('order_index', { ascending: true })
  
  if (error) throw error
  return data
}

// Projects
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })
  
  if (error) throw error
  return data
}

// Education
export const getEducation = async () => {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('order_index', { ascending: true })
  
  if (error) throw error
  return data
}

// Certifications
export const getCertifications = async () => {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('order_index', { ascending: true })
  
  if (error) throw error
  return data
}

// Contact
export const getContact = async () => {
  const { data, error } = await supabase
    .from('contact')
    .select('*')
    .single()
  
  if (error) throw error
  return data
}
