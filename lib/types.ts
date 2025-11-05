export interface About {
  id: string
  name: string
  tagline: string
  bio: string | null
  profile_image_url: string | null
  resume_url: string | null
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  youtube_url: string | null
  instagram_url: string | null
  facebook_url: string | null
  google_url: string | null
}

export interface HomeSection {
  id: string
  title: string
  description: string | null
  icon_url: string | null
  order_index: number
  skills: Skill[]
  section_items: SectionItem[]
  degrees: Degree[]
  certifications: Certification[]
  experiences: Experience[]
  projects: Project[] // Added projects to HomeSection
}

export interface Skill {
  id: string
  section_id: string
  skill_name: string
  skill_icon_url: string | null
  order_index: number
}

export interface SectionItem {
  id: string
  section_id: string
  content: string
  order_index: number
}

export interface Degree {
  id: string
  institution_name: string
  institution_logo_url: string | null
  degree_name: string
  field_of_study: string | null
  start_year: number
  end_year: number | null
  description: string | null
  website_url: string | null
  order_index: number
  degree_items: DegreeItem[]
}

export interface DegreeItem {
  id: string
  degree_id: string
  content: string
  order_index: number
}

export interface Certification {
  id: string
  title: string
  issuer: string
  issuer_logo_url: string | null
  issue_date: string | null
  expiry_date: string | null
  credential_id: string | null
  credential_url: string | null
  description: string | null
  order_index: number
}

export interface Experience {
  id: string
  title: string
  company_name: string
  company_logo_url: string | null
  location: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string | null
  experience_type: "work" | "internship" | "volunteer"
  order_index: number
  experience_items: ExperienceItem[]
}

export interface ExperienceItem {
  id: string
  experience_id: string
  content: string
  order_index: number
}

export interface Project {
  id: number
  title: string
  description: string
  image_url: string | null
  demo_url: string | null
  code_url: string | null
  created_date: string
  order_index: number
  project_technologies?: ProjectTechnology[]
}

export interface ProjectTechnology {
  id: number
  project_id: number
  technology_name: string
  technology_icon_url: string | null
  order_index: number
}

export interface Contact {
  id: number
  profile_image_url: string | null
  heading: string
  description: string
  resume_url: string | null
  blog_url: string | null
  blog_description: string | null
  social_links?: SocialLink[]
}

export interface SocialLink {
  id: number
  contact_id: number
  platform: string
  url: string
  icon_name: string
  display_order: number
}

export interface OpenSource {
  id: number
  github_username: string
  total_stars: number
  total_commits: number
  total_prs: number
  total_issues: number
  total_contributions: number
  current_streak: number
  longest_streak: number
  grade: string
  profile_image_url: string | null
  contribution_graph_url: string | null
  languages?: Language[]
  contributed_organizations?: ContributedOrganization[]
}

export interface Language {
  id: number
  open_source_id: number
  name: string
  percentage: number
  color: string
  display_order: number
}

export interface ContributedOrganization {
  id: number
  open_source_id: number
  name: string
  logo_url: string
  url: string | null
  display_order: number
}

export interface GitHubAchievement {
  id: number
  badge_name: string
  badge_description: string | null
  badge_image_url: string
  verification_link: string | null
  unlocked_date: string | null
  display_order: number
}

export interface ProfessionalCertification {
  id: number
  cert_name: string
  cert_description: string | null
  cert_image_url: string
  verification_link: string | null
  issued_date: string | null
  issuer: string
  display_order: number
}
