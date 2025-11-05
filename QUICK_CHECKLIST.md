# 🎯 Quick Setup Checklist

## Before You Start
- [ ] Supabase project created
- [ ] `.env.local` file has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

---

## Step 1: Get Service Role Key (2 minutes)
- [ ] Visit: https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/settings/api
- [ ] Copy the **service_role** key
- [ ] Paste in `.env.local` as `SUPABASE_SERVICE_ROLE_KEY=...`

---

## Step 2: Run Database Migrations (5 minutes)
- [ ] Visit: https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/sql/new
- [ ] Run `supabase/schema.sql`
- [ ] Run `supabase/seed.sql`
- [ ] Run `supabase/seed-projects-certs.sql`
- [ ] Run `supabase/verify.sql` to check

---

## Step 3: Create Admin User (1 minute)
- [ ] Visit: https://supabase.com/dashboard/project/hpsxdwnigbbuqyzdxapk/auth/users
- [ ] Click "Add user" → "Create new user"
- [ ] Enter email & password
- [ ] Click "Create user"

---

## Step 4: Restart Server (1 minute)
- [ ] Stop current server (Ctrl+C)
- [ ] Run `npm run dev`
- [ ] Server starts without errors

---

## Step 5: Test Admin Dashboard (5 minutes)
- [ ] Visit http://localhost:3000/admin/login
- [ ] Login with your credentials
- [ ] Test Greeting section (update title)
- [ ] Test Skills section (add/edit/delete)
- [ ] Test Experience section (add/edit/delete)
- [ ] Test Projects section (add/edit/delete)
- [ ] Test Education section (add/edit/delete)
- [ ] Test Certifications section (add/edit/delete)
- [ ] Test Contact section (update info)
- [ ] Test Settings section (toggle splash screen)

---

## ✅ Success Criteria
- [ ] No 500 errors in console
- [ ] Can update greeting without errors
- [ ] Can add/edit/delete items in all sections
- [ ] Changes persist after page refresh
- [ ] Frontend displays updated data

---

## 📚 Documentation
- Detailed setup: `SUPABASE_SETUP.md`
- What was fixed: `RLS_FIX_COMPLETE.md`
- Database info: `DATABASE_FIX_SUMMARY.md`
- Migration guide: `supabase/MIGRATION.md`

---

**Total Time:** ~15 minutes  
**Difficulty:** Easy ✨
