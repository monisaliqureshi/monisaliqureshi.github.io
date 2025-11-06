# News Feature Documentation

## Overview
The News feature allows you to publish news articles, announcements, and blog posts on your portfolio with rich content including multiple images and HTML/Markdown formatting.

## Database Schema

### Table: `news`
```sql
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  date_from TEXT NOT NULL,
  date_to TEXT,
  location TEXT,
  thumbnail_filename TEXT,
  photos JSONB DEFAULT '[]',
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Fields Description
- **id**: Unique identifier (auto-generated)
- **title**: Main headline of the news (required)
- **subtitle**: Secondary headline
- **date_from**: Start date/period (required, e.g., "Jan 2024")
- **date_to**: End date/period (optional, e.g., "Mar 2024" or "Present")
- **location**: Geographic location (optional, e.g., "San Francisco, CA")
- **thumbnail_filename**: Main image filename for preview
- **photos**: Array of image filenames for gallery (JSONB)
- **description**: Full content in HTML or Markdown (required)
- **order_index**: Display order (lower numbers appear first)

## File Structure

```
app/
├── api/
│   └── news/
│       └── route.ts                 # API endpoints (GET, POST, PUT, DELETE)
├── admin/
│   └── news/
│       └── page.tsx                 # Admin management page
└── news/
    └── page.tsx                     # Public news listing page

components/
└── admin/
    ├── MultipleImageUpload.tsx     # Multiple image upload component
    └── RichTextEditor.tsx           # HTML/Markdown editor component

supabase/
├── schema.sql                       # Main database schema
└── migrations/
    └── add_news_table.sql          # News table migration
```

## API Endpoints

### GET /api/news
Fetch all news items ordered by `order_index`.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "News Title",
    "subtitle": "Subtitle",
    "date_from": "Jan 2024",
    "date_to": "Mar 2024",
    "location": "San Francisco, CA",
    "thumbnail_filename": "news-thumb.png",
    "photos": ["photo1.png", "photo2.png"],
    "description": "<p>HTML content...</p>",
    "order_index": 0
  }
]
```

### POST /api/news
Create a new news item.

**Request Body:**
```json
{
  "title": "New News",
  "subtitle": "Subtitle",
  "date_from": "Nov 2025",
  "date_to": "",
  "location": "Online",
  "thumbnail_filename": "thumb.png",
  "photos": ["img1.png", "img2.png"],
  "description": "<p>Content...</p>",
  "order_index": 0
}
```

### PUT /api/news
Update an existing news item.

**Request Body:**
```json
{
  "id": "uuid",
  "title": "Updated Title",
  ...
}
```

### DELETE /api/news?id={uuid}
Delete a news item by ID.

## Admin Dashboard Usage

### Access
Navigate to: `/admin/news` (requires authentication)

### Creating News

1. **Fill Basic Information**
   - Title (required)
   - Subtitle (optional)
   - Date From (required) - e.g., "Jan 2024"
   - Date To (optional) - e.g., "Present", "Mar 2024"
   - Location (optional) - e.g., "San Francisco, CA"
   - Order Index - Lower numbers appear first

2. **Upload Thumbnail**
   - Click "Upload Image" or "Add Manually"
   - Supported formats: JPG, PNG, SVG, WebP
   - Max size: 5MB
   - This image appears in the news list view

3. **Add Gallery Photos**
   - Upload multiple images (up to 20)
   - These appear in the full news detail view
   - Can upload or add manually by filename

4. **Write Description**
   - Use HTML or Markdown formatting
   - Click "Preview" to see rendered output
   - Supports headings, paragraphs, lists, links, images, etc.

5. **Save**
   - Click "Add News" to create
   - Or "Update News" when editing

### HTML Formatting Examples

```html
<!-- Headings -->
<h2>Section Title</h2>
<h3>Subsection</h3>

<!-- Paragraphs -->
<p>Your content here...</p>

<!-- Bold and Italic -->
<strong>Bold text</strong>
<em>Italic text</em>

<!-- Lists -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>First</li>
  <li>Second</li>
</ol>

<!-- Links -->
<a href="https://example.com">Link text</a>

<!-- Images -->
<img src="/assests/images/image.png" alt="Description" />

<!-- Code -->
<code>inline code</code>
```

### Managing News

- **Edit**: Click the edit icon on any news item
- **Delete**: Click the trash icon (requires confirmation)
- **Reorder**: Change the `order_index` value

## Frontend Display

### News List Page
Navigate to: `/news`

**Features:**
- Grid layout of news cards
- Each card shows:
  - Thumbnail image
  - Title and subtitle
  - Date range and location
  - Short description preview
  - "Read More" link
- Click any card to view full details

### News Detail View
- Opens as a modal overlay
- Shows full content with:
  - Header image
  - Complete description
  - Photo gallery (if available)
- Close button to return to list
- Prevents background scrolling

## Menu Integration

The News link is added to the main navigation menu:
- Desktop: Header menu bar
- Mobile: Hamburger menu
- Icon: 📰

## Image Management

### Upload Process
1. Images uploaded via admin dashboard
2. Saved to `public/assests/images/`
3. Filename stored in database
4. Accessible at `/assests/images/{filename}`

### Multiple Images
- Thumbnail: Single image for preview
- Photos: Array of images for gallery
- All managed through ImageUpload components

## Styling

### Design System
- **Colors**: Cyan (#00f5ff), Magenta (#ff00ff), Purple (#7c3aed)
- **Effects**: Glassmorphism, gradients, animations
- **Typography**: Gradient text for headings
- **Cards**: Hover effects with scale and glow

### Responsive
- Mobile-first design
- Grid adapts: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Modal scrollable on all devices

## Database Migration

### Running the Migration

1. **Via Supabase Dashboard:**
   ```
   1. Open Supabase Dashboard
   2. Go to SQL Editor
   3. Open: supabase/migrations/add_news_table.sql
   4. Click "Run"
   ```

2. **Via Supabase CLI:**
   ```bash
   supabase db push
   ```

### What It Does
- Creates `news` table
- Adds indexes for performance
- Sets up Row Level Security
- Creates triggers for auto-update timestamps
- Inserts sample news item

## Security

### Row Level Security (RLS)
- **Public Read**: Anyone can view news items
- **Admin Write**: Only authenticated users can create/edit/delete

### Policies
```sql
-- Public can read
CREATE POLICY "Public read access" ON news FOR SELECT USING (true);

-- Only authenticated users can write
CREATE POLICY "Admin write access" ON news FOR ALL USING (auth.role() = 'authenticated');
```

## Best Practices

### Content
- **Titles**: Keep concise and descriptive (50-70 characters)
- **Descriptions**: Use proper HTML structure with headings and paragraphs
- **Images**: Optimize before uploading (compress, resize)
- **Dates**: Use consistent format (e.g., "Jan 2024" or "January 2024")

### SEO
- Use semantic HTML tags (h2, h3, p, strong, em)
- Add alt text to images
- Keep URLs clean
- Use descriptive titles

### Performance
- Limit gallery photos to 10-15 per article
- Compress images before upload
- Use WebP format when possible
- Keep descriptions under 10,000 words

## Troubleshooting

### Images Not Displaying
1. Check filename is correct in database
2. Verify image exists in `public/assests/images/`
3. Check browser console for 404 errors
4. Ensure filename includes extension (.png, .jpg, etc.)

### Editor Preview Not Working
1. Check HTML syntax is valid
2. Close all tags properly
3. Don't use inline scripts (security)

### News Not Appearing
1. Verify data exists in database
2. Check API endpoint returns data
3. Look for console errors
4. Ensure `order_index` is set

## Future Enhancements

Potential features to add:
- Tags/categories for filtering
- Search functionality
- Pagination for large lists
- Social sharing buttons
- Comments system
- Draft/published status
- Scheduled publishing
- Analytics tracking

## Support

For issues or questions:
1. Check browser console for errors
2. Verify database connection
3. Check Supabase logs
4. Review API responses in Network tab
