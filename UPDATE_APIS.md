// Script to find and replace supabase imports in all API routes
// This is just documentation of what needs to be done

/*
Files to update:
- app/api/social-media/route.ts
- app/api/social-media/[id]/route.ts
- app/api/projects/route.ts
- app/api/projects/[id]/route.ts
- app/api/education/route.ts
- app/api/education/[id]/route.ts
- app/api/certifications/route.ts
- app/api/certifications/[id]/route.ts
- app/api/experiences/[id]/route.ts

In each file:
1. Replace: import { supabase } from '@/lib/supabase'
   With: import { supabaseAdmin } from '@/lib/supabase-admin'

2. Replace all: await supabase
   With: await supabaseAdmin
*/
