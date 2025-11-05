# 🔑 Getting Your Supabase Service Role Key

## What is the Service Role Key?

The **Service Role Key** is a special API key that bypasses Row Level Security (RLS) policies. It's needed for:
- Admin API routes (create, update, delete operations)
- Server-side operations that need full database access

⚠️ **IMPORTANT**: This key is SECRET! Never expose it in client-side code or commit it to public repositories.

---

## Step 1: Get Your Service Role Key

1. **Go to Supabase Dashboard**  
   https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/settings/api

2. **Find "Project API keys" section**

3. **Copy the `service_role` key** (NOT the `anon` key)
   - It starts with `eyJ...`
   - It's marked as `secret` 🔒

4. **Paste it into your `.env.local` file**:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...your_actual_key_here
   ```

---

## Step 2: Run Database Migrations

Open Supabase SQL Editor:  
https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/sql/new

Run these files in order:

### 1️⃣ `schema.sql` - Create Tables
```sql
-- Copy entire content of supabase/schema.sql
-- Paste in SQL Editor
-- Click "Run"
```

### 2️⃣ `seed.sql` - Insert Initial Data
```sql
-- Copy entire content of supabase/seed.sql
-- Paste in SQL Editor
-- Click "Run"
```

### 3️⃣ `seed-projects-certs.sql` - Add Projects & Certifications
```sql
-- Copy entire content of supabase/seed-projects-certs.sql
-- Paste in SQL Editor  
-- Click "Run"
```

### 4️⃣ `verify.sql` - Check Everything Works
```sql
-- Copy entire content of supabase/verify.sql
-- Paste in SQL Editor
-- Click "Run"
-- You should see row counts for all tables
```

---

## Step 3: Create Admin User

1. **Go to Authentication**  
   https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/auth/users

2. **Click "Add user" → "Create new user"**

3. **Enter:**
   - Email: your@email.com
   - Password: YourSecurePassword123!
   - ✅ Auto Confirm User

4. **Click "Create user"**

---

## Step 4: Restart Dev Server

```bash
# Stop the current server (Ctrl+C in terminal)
npm run dev
```

---

## Step 5: Test Admin Dashboard

1. **Visit:** http://localhost:3000/admin/login

2. **Login** with the email & password you created

3. **Test each section:**
   - ✅ Greeting
   - ✅ Skills  
   - ✅ Experience
   - ✅ Projects
   - ✅ Education
   - ✅ Certifications
   - ✅ Contact
   - ✅ Settings

All CRUD operations should work perfectly now! 🎉

---

## ✅ Checklist

- [ ] Service Role Key added to `.env.local`
- [ ] `schema.sql` executed in Supabase
- [ ] `seed.sql` executed in Supabase
- [ ] `seed-projects-certs.sql` executed in Supabase
- [ ] `verify.sql` shows correct row counts
- [ ] Admin user created in Supabase Auth
- [ ] Dev server restarted
- [ ] Successfully logged into `/admin/login`
- [ ] All admin sections working

---

## 🐛 Troubleshooting

**Error: "row-level security policy"**
→ Service role key not set correctly in `.env.local`

**Error: "Cannot coerce result to single JSON object"**
→ Table is empty, run `seed.sql`

**Login doesn't work**
→ User not created or wrong credentials

**Changes not reflected**
→ Restart dev server after updating `.env.local`

---

## 📚 Quick Links

- **API Keys**: https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/settings/api
- **SQL Editor**: https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/sql/new
- **Auth Users**: https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/auth/users
- **Table Editor**: https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/editor

---

Happy coding! 🚀
