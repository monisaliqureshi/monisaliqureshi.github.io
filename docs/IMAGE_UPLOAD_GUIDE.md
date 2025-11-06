# Image Upload System - Complete Guide

## 🎯 Overview

The portfolio now supports **local image uploads** for logos and thumbnails. 3. **Images are saved to:**
   ```
   public/assests/images/1699876543_your-image.png
   ``` and only the **filename** is stored in the database.

---

## 📁 File Structure

```
public/assests/images/
├── .gitkeep
├── 1699876543_google-logo.png
├── 1699876544_aws-cert.png
└── ... (your uploaded images)
```

---

## 🗄️ Database Schema Changes

### Updated Tables

| Table | Field Name | Type | Description |
|-------|------------|------|-------------|
| **experiences** | `logo_filename` | TEXT | Company logo filename (e.g., "google.png") |
| **projects** | `thumbnail_filename` | TEXT | Project screenshot filename (e.g., "chatbot.jpg") |
| **education** | `logo_filename` | TEXT | Institute logo filename (e.g., "mit.png") |
| **certifications** | `logo_filename` | TEXT | Certification logo filename (e.g., "aws-cert.png") |

### Removed Fields
- ❌ `experiences.color` - No longer needed
- ❌ `certifications.color_code` - No longer needed
- ❌ All `_url` and `_path` variants replaced with `_filename`

---

## 🚀 How to Use

### 1️⃣ **Upload via Admin Dashboard**

1. Go to Admin Dashboard → Experience/Projects/Education/Certifications
2. Click **"Upload Image"** button
3. Select an image file (JPG, PNG, SVG, WebP)
4. Image uploads automatically and filename is saved
5. Preview appears - click X to remove if needed

### 2️⃣ **Manual Filename Entry**

You can also manually type the filename if the image already exists in `src/assests/images/`:
```
google-logo.png
project-screenshot.jpg
university-badge.svg
```

### 3️⃣ **Supported Formats**

✅ **Allowed:** JPG, JPEG, PNG, SVG, WebP  
⚠️ **Max Size:** 5MB per file  
📐 **Recommended:**
- Logos: 512x512px (square)
- Thumbnails: 1200x630px (landscape)

---

## 🔧 Technical Implementation

### API Endpoint: `/api/upload`

**Request:**
```typescript
POST /api/upload
Content-Type: multipart/form-data

FormData {
  file: File
}
```

**Response:**
```json
{
  "success": true,
  "filename": "1699876543_google-logo.png",
  "path": "/assests/images/1699876543_google-logo.png"
}
```

**Error Response:**
```json
{
  "error": "File too large. Maximum size is 5MB."
}
```

### ImageUpload Component

Located at: `components/admin/ImageUpload.tsx`

**Props:**
```typescript
interface ImageUploadProps {
  label: string              // Display label
  value: string              // Current filename
  onChange: (filename: string) => void  // Callback on change
  placeholder?: string       // Placeholder text
  required?: boolean         // Is field required?
}
```

**Usage:**
```tsx
<ImageUpload
  label="Company Logo"
  value={formData.logo_filename}
  onChange={(filename) => setFormData({ ...formData, logo_filename: filename })}
  placeholder="e.g., google-logo.png"
/>
```

### Frontend Display

Images are displayed using the filename:

```tsx
{exp.logo_filename ? (
  <img
    src={`/assests/images/${exp.logo_filename}`}
    alt={`${exp.company} logo`}
    className="w-16 h-16 rounded-lg object-contain bg-white dark:bg-gray-800 p-2"
  />
) : (
  <div className="fallback-gradient">
    {exp.company.charAt(0)}
  </div>
)}
```

---

## 📋 Migration Instructions

### Step 1: Run Database Migration

Execute the migration SQL in your Supabase SQL editor:

```bash
# Option A: Via Supabase Dashboard
# 1. Go to Supabase Dashboard → SQL Editor
# 2. Copy content from: supabase/migrations/update_to_filename_storage.sql
# 3. Run the SQL

# Option B: Via Supabase CLI
supabase db push
```

### Step 2: Upload Existing Images

If you have existing images referenced by URL:
1. Download those images
2. Upload them via Admin Dashboard
3. The new filename will be saved automatically

### Step 3: Verify

Check that the migration worked:
```sql
-- Check experiences table
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'experiences';
-- Should include: logo_filename
-- Should NOT include: logo_url, logo_path, color

-- Check projects table
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'projects';
-- Should include: thumbnail_filename
-- Should NOT include: thumbnail_url

-- Similar checks for education and certifications
```

---

## 🎨 Admin Dashboard Features

### Upload Interface
- **Drag & Drop:** Future enhancement
- **Preview:** Instant image preview after upload
- **Remove:** Click X button to remove image
- **Manual Entry:** Type filename directly
- **Validation:** Real-time file type and size checks

### Visual Feedback
- ✅ Loading spinner during upload
- ✅ Preview thumbnail with remove button
- ✅ Error messages (red text)
- ✅ Success confirmation
- ✅ Glassmorphism design matching portfolio theme

---

## 🌐 Frontend Display

### Experience Section
- Company logo from `logo_filename`
- Fallback: Gradient circle with company initial
- Size: 64x64px rounded

### Projects Section
- Thumbnail from `thumbnail_filename`
- Displayed as hero image (full width)
- Size: Full width × 192px
- Only shows if thumbnail exists

### Education Section
- Institute logo from `logo_filename`
- Fallback: Gradient emoji 🎓
- Size: 80x80px rounded

### Certifications Section
- Certification logo from `logo_filename`
- Fallback: Gradient emoji 📜
- Size: 48x48px rounded

---

## 🔒 Security Features

1. **File Type Validation:** Only images allowed
2. **Size Limit:** Maximum 5MB per file
3. **Unique Filenames:** Timestamp prefix prevents conflicts
4. **Server-Side Validation:** Double-checked on API
5. **Path Traversal Protection:** Sanitized filenames

---

## 🐛 Troubleshooting

### Issue: "Failed to upload file"
**Solution:** Check file size (<5MB) and type (JPG/PNG/SVG/WebP)

### Issue: Image not displaying on frontend
**Solutions:**
1. Verify filename is correct in database
2. Check image exists in `src/assests/images/`
3. Clear browser cache
4. Check Next.js is serving static files correctly

### Issue: Upload button not working
**Solutions:**
1. Check browser console for errors
2. Verify `/api/upload` endpoint is accessible
3. Check file system permissions for writing

### Issue: Old URLs still in database
**Solution:** Run the migration again or manually update:
```sql
UPDATE experiences SET logo_filename = NULL WHERE logo_filename LIKE 'http%';
```

---

## 📝 File Naming Convention

**Automatic Format:**
```
{timestamp}_{original-filename}
```

**Examples:**
```
1699876543_google-logo.png
1699876544_project-chatbot.jpg
1699876545_mit-university.svg
```

**Benefits:**
- ✅ Prevents filename conflicts
- ✅ Preserves original name for reference
- ✅ Chronological ordering
- ✅ No spaces (replaced with underscores)

---

## 🔄 Workflow Example

### Adding a New Experience with Logo

1. **Admin logs in**
   - Navigate to `/admin/dashboard/experience`

2. **Fill form**
   - Title: "Senior Software Engineer"
   - Company: "Google"
   - Duration: "Jan 2023 - Present"

3. **Upload logo**
   - Click "Upload Image"
   - Select `google-logo.png`
   - See preview appear

4. **Save**
   - Click "Add Experience"
   - Data saved with `logo_filename: "1699876543_google-logo.png"`

5. **View on Frontend**
   - Navigate to homepage
   - See Google logo displayed in Experience section

---

## 🎯 Best Practices

### Image Optimization
- ✅ Compress images before upload
- ✅ Use appropriate formats (PNG for logos, JPG for photos)
- ✅ Optimize for web (use tools like TinyPNG)
- ✅ Consider SVG for simple logos (better scaling)

### File Organization
- ✅ Use descriptive original filenames
- ✅ Delete old/unused images periodically
- ✅ Keep images under 500KB when possible
- ✅ Maintain consistent dimensions for same types

### Backup
- ✅ Include `public/assests/images/` in backups
- ✅ Version control critical logos
- ✅ Document image sources/licenses
- ✅ Keep originals in separate location

---

## 📦 Dependencies

No additional npm packages required! Uses:
- ✅ Next.js built-in API routes
- ✅ Node.js `fs/promises` for file writing
- ✅ React hooks for state management
- ✅ Existing UI components (glassmorphism design)

---

## 🚧 Future Enhancements

Potential improvements:
- [ ] Drag & drop upload
- [ ] Image cropping/editing
- [ ] Bulk upload
- [ ] CDN integration
- [ ] Image optimization pipeline
- [ ] Gallery view of uploaded images
- [ ] Search/filter uploaded images
- [ ] Image metadata (alt text, captions)

---

## ✅ Summary

You can now:
1. ✅ Upload images directly through admin dashboard
2. ✅ Images saved to `public/assests/images/`
3. ✅ Only filename stored in database (e.g., "logo.png")
4. ✅ Automatic preview and validation
5. ✅ Seamless frontend display with fallbacks
6. ✅ No external dependencies or cloud storage needed

**Migration Status:** Ready to run  
**Files Modified:** 15 total (admin forms, frontend components, schema, API)  
**Breaking Changes:** Field names changed from `*_url` to `*_filename`
