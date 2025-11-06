# Portfolio Images Directory

This directory contains all uploaded images for the portfolio (company logos, project thumbnails, education institute logos, and certification logos).

## 📁 Location
`public/assests/images/`

## 🌐 Access
Images are publicly accessible at: `/assests/images/{filename}`

Example:
- Local: `http://localhost:3000/assests/images/google.png`
- Production: `https://yourdomain.com/assests/images/google.png`

## 📝 Existing Images

You can use any of these existing images in your admin dashboard by entering just the filename:

### Company Logos
- `google.png`, `google_logo.png`
- `github.png`
- `gdg.png`
- `postman.png`, `postman.jpg`
- `flutter.png`
- `mongo.png`

### Project Thumbnails
- `facehawk.png`
- `googleAssistant.jpg`
- `valora.jpg`
- `wrighter.jpg`
- `buld.jpg`

### Education/Certifications
- `iit.png`
- `gtu.png`
- `kaist.png`
- `uci.png`
- `uett.png`
- `pgc.png`
- `misis.png`
- `university_of_michigan.png`
- `university_of_minnesota.png`
- `university_of_virginia.png`
- `mlh.png`, `mlh-logo.png`, `mlh-logo.svg`
- `deeplearning.png`
- `digital.png`
- `cwoc.png`
- `dtcpak.png`
- `efi.png`
- `skillenza.png`

### Misc
- `monis.png`, `monis.jpg`, `monis-removebg-preview.png`
- `localguide.png`, `localguide.gif`
- `b.png`
- `ino.png`

## 📤 Upload New Images

### Via Admin Dashboard
1. Go to Admin Dashboard → Experience/Projects/Education/Certifications
2. Click "Upload Image" button
3. Select your image file
4. Image is automatically saved here with timestamp prefix

### Manual Upload
Simply copy your image files to this directory:
```bash
# Windows
copy your-image.png D:\Projects\Personal\personal_portfolio\public\assests\images\

# Linux/Mac
cp your-image.png /path/to/portfolio/public/assests/images/
```

## ✅ File Requirements
- **Formats:** JPG, PNG, SVG, WebP
- **Max Size:** 5MB per file
- **Recommended Dimensions:**
  - Logos: 512x512px (square)
  - Thumbnails: 1200x630px (landscape)

## 🔄 Migration from src/assests/images
All images have been copied from `src/assests/images/` to this directory.
The upload system now saves directly to `public/assests/images/`.

## 📋 Note
- Images here are version controlled (tracked by Git)
- Filename is stored in database (not full path)
- Frontend displays images using: `/assests/images/{filename}`
