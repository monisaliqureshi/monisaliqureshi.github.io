np# Portfolio Next.js - Monis Ali

Modern AI Engineer portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- **pnpm** (recommended) or npm
- Supabase account

### Installation

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Install dependencies
pnpm install

# Copy environment variables
copy .env.local.example .env.local
# Add your Supabase credentials to .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run SQL files in SQL Editor (in order):
   - `supabase/schema.sql`
   - `supabase/seed.sql`
   - `supabase/seed-projects-certs.sql`
3. Create admin user in Authentication > Users

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 📁 Project Structure

```
├── app/                      # Next.js app directory
│   ├── api/                 # API routes (backend)
│   ├── admin/               # Admin dashboard
│   ├── home/                # Portfolio page
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── sections/            # Page sections
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/                     # Utilities
│   ├── supabase.ts         # Supabase client
│   └── api.ts              # Data fetching
└── supabase/               # Database schema & seeds
```

## 🔐 Admin Access

Login at `/admin/login` with your Supabase credentials to manage all content:
- ✅ Greeting & Profile
- ✅ Skills
- ✅ Experience
- ✅ Projects
- ✅ Education
- ✅ Certifications
- ✅ Contact Info
- ✅ Social Media Links

## 🌐 URLs

- **Portfolio**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## 📚 Documentation

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Data Fetching**: SWR
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Package Manager**: pnpm

## ✨ Features

- ✅ Same UI/Design from original portfolio
- ✅ Full-stack with Next.js 14
- ✅ TypeScript for type safety
- ✅ Supabase backend & auth
- ✅ Admin dashboard (CRUD operations)
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Production ready

## 📝 License

MIT
