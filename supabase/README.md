# 🗄️ Database Setup Files

## Quick Start (3 Steps)

### 1. Open Supabase SQL Editor
Visit: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new

### 2. Run SQL Files in Order
Copy and paste each file content, then click "Run"

```
1. schema.sql              → Creates all tables
2. seed.sql                → Populates initial data
3. seed-projects-certs.sql → Adds projects & certifications
```

### 3. Verify Setup
Run `verify.sql` to check all tables have data.

---

## 📁 Files Explained

| File | Purpose | When to Use |
|------|---------|-------------|
| `schema.sql` | Create all database tables & policies | First time setup, or after major schema changes |
| `seed.sql` | Insert initial data (greeting, skills, experience, etc.) | First time setup, or to reset to default data |
| `seed-projects-certs.sql` | Insert projects & certifications | After running seed.sql |
| `verify.sql` | Check row counts in all tables | After migrations to verify data |
| `complete-setup.sql` | Reference for full setup process | For understanding the complete flow |
| `MIGRATION.md` | Detailed migration guide | Step-by-step instructions with troubleshooting |

---

## 🔄 Common Scenarios

### First Time Setup
```sql
-- Run these in order:
1. schema.sql
2. seed.sql  
3. seed-projects-certs.sql
4. verify.sql (to check)
```

### Reset All Data
```sql
-- Run these in order:
1. seed.sql (has TRUNCATE to clear data)
2. seed-projects-certs.sql
3. verify.sql (to check)
```

### Update Schema Only
```sql
-- Be careful! This drops all tables
1. schema.sql
2. seed.sql
3. seed-projects-certs.sql
```

---

## ✅ Expected Row Counts

After running all migrations:

| Table | Expected Rows |
|-------|---------------|
| greeting | 1 (exactly) |
| contact | 1 (exactly) |
| settings | 1 (exactly) |
| social_media | ~7 |
| skills | ~4 |
| experiences | Varies (your work history) |
| education | ~2 |
| projects | Varies (your projects) |
| certifications | Varies (your certs) |

---

## 🔐 Next Steps

After database setup:

1. **Create Admin User**
   - Go to: Auth → Users → "Add user"
   - Create with email & password

2. **Test Admin Dashboard**
   - Visit: http://localhost:3000/admin/login
   - Login with your credentials
   - Test all CRUD operations

---

## 📚 Documentation

- **Detailed Guide:** See `MIGRATION.md`
- **Fix Summary:** See `../DATABASE_FIX_SUMMARY.md`
- **Project Setup:** See `../SETUP.md`

---

## 🆘 Troubleshooting

**Error: "relation does not exist"**
→ Run `schema.sql` first

**Error: "Cannot coerce result to single JSON object"**
→ Table is empty, run `seed.sql`

**Error: "duplicate key value"**  
→ Data already exists, check if you need to TRUNCATE first

**Tables have no data:**
→ Run `seed.sql` and `seed-projects-certs.sql`

---

## 🎯 Quick Reference

**Supabase Dashboard:**
- SQL Editor: `/sql/new`
- Auth Users: `/auth/users`
- Table Editor: `/editor`
- API Docs: `/api`

**Project ID:** Extract from your NEXT_PUBLIC_SUPABASE_URL in `.env.local`
