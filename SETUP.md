# Portfolio Next.js - Setup Guide

## Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

## Step 1: Install Dependencies

Using **pnpm** (recommended):
```bash
pnpm install
```

Or npm:
```bash
npm install
```

## Step 2: Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`:
   ```bash
   copy .env.local.example .env.local
   ```
3. Add your Supabase credentials to `.env.local`

## Step 3: Run Database Migrations

In Supabase SQL Editor, run these files in order:

1. `supabase/schema.sql` - Creates all tables and policies
2. `supabase/seed.sql` - Seeds initial data
3. `supabase/seed-projects-certs.sql` - Seeds projects and certifications

## Step 4: Create Admin User

In Supabase Authentication panel:
1. Go to Authentication > Users
2. Click "Add User" 
3. Create user with email/password

## Step 5: Run Development Server

```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

Visit:
- Portfolio: http://localhost:3000
- Admin: http://localhost:3000/admin/login

## API Endpoints

All CRUD operations available at `/api/`:

- `/api/greeting` - GET, PUT
- `/api/social-media` - GET, POST, PUT, DELETE
- `/api/skills` - GET, POST, PUT, DELETE
- `/api/experiences` - GET, POST, PUT, DELETE
- `/api/projects` - GET, POST, PUT, DELETE
- `/api/education` - GET, POST, PUT, DELETE
- `/api/certifications` - GET, POST, PUT, DELETE
- `/api/contact` - GET, PUT

## Deployment

```bash
pnpm build
pnpm start
```

Or with npm:
```bash
npm run build
npm start
```

## Admin Access

Login at `/admin/login` with your Supabase user credentials.

Manage:
- ✅ Greeting
- ✅ Skills
- ✅ Experience  
- ✅ Projects
- ✅ Education
- ✅ Certifications
- ✅ Contact Info
- ✅ Settings
