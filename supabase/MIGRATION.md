# Database Migration Guide

## 🔄 Complete Database Reset & Setup

Follow these steps in **Supabase SQL Editor** to set up your database properly.

### Step 1: Open Supabase SQL Editor
Visit: https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/sql/new

---

## 📋 Run These SQL Commands in Order:

### 1️⃣ First: Run `schema.sql`
This creates all tables with proper constraints.

**Location:** `supabase/schema.sql`

**What it does:**
- Drops any existing tables (fresh start)
- Creates 9 tables: greeting, social_media, skills, experiences, projects, education, certifications, contact, settings
- Adds unique constraints to ensure greeting/contact/settings have only 1 row each
- Sets up Row Level Security (RLS) policies
- Creates indexes for performance
- Adds triggers for auto-updating timestamps

---

### 2️⃣ Second: Run `seed.sql`
This populates initial data from your portfolio.

**Location:** `supabase/seed.sql`

**What it does:**
- Clears any existing data (TRUNCATE)
- Inserts greeting (1 row)
- Inserts social media links (7 rows)
- Inserts skills (4 sections)
- Inserts experiences (work history)
- Inserts education (2 entries)
- Inserts contact info (1 row)
- Inserts settings (1 row)

---

### 3️⃣ Third: Run `seed-projects-certs.sql`
This adds your projects and certifications.

**Location:** `supabase/seed-projects-certs.sql`

**What it does:**
- Inserts projects (multiple entries)
- Inserts certifications (multiple entries)

---

## ✅ Verification

After running all 3 files, verify the data:

```sql
-- Check greeting (should return 1 row)
SELECT * FROM greeting;

-- Check social media (should return ~7 rows)
SELECT * FROM social_media;

-- Check skills (should return 4 rows)
SELECT * FROM skills;

-- Check experiences (should return multiple rows)
SELECT * FROM experiences;

-- Check projects (should return multiple rows)
SELECT * FROM projects;

-- Check education (should return 2 rows)
SELECT * FROM education;

-- Check certifications (should return multiple rows)
SELECT * FROM certifications;

-- Check contact (should return 1 row)
SELECT * FROM contact;

-- Check settings (should return 1 row)
SELECT * FROM settings;
```

---

## 🔐 Create Admin User

1. Go to: https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/auth/users
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email:** your email
   - **Password:** your password (min 6 characters)
4. Click **"Create user"**

---

## 🚀 Test Your Setup

1. **Visit:** http://localhost:3000/admin/login
2. **Login** with the credentials you created
3. **Navigate** to each section and test:
   - ✅ Greeting
   - ✅ Skills
   - ✅ Experience
   - ✅ Projects
   - ✅ Education
   - ✅ Certifications
   - ✅ Contact
   - ✅ Settings

All CRUD operations should work smoothly now! 🎉

---

## 🐛 Troubleshooting

### Error: "Cannot coerce the result to a single JSON object"
**Solution:** The table is empty. Make sure you ran `seed.sql`

### Error: "duplicate key value violates unique constraint"
**Solution:** You're trying to insert multiple rows into a single-row table. Use UPDATE instead of INSERT for greeting/contact/settings.

### Error: "relation does not exist"
**Solution:** Tables weren't created. Run `schema.sql` first.

---

## 📝 Database Structure

**Single Row Tables (1 entry only):**
- `greeting` - Hero section data
- `contact` - Contact section data
- `settings` - Site-wide settings

**Multi-Row Tables:**
- `social_media` - Social media links
- `skills` - Skills sections
- `experiences` - Work experience
- `projects` - Portfolio projects
- `education` - Education history
- `certifications` - Certifications & awards

All tables have UUID primary keys and auto-updating timestamps! ✨
