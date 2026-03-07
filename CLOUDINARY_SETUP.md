# Cloudinary Setup Guide - Kagzi India

## 📸 What is Cloudinary?

Cloudinary is a cloud-based image and video management service that provides:
- Image upload and storage
- Automatic optimization (WebP, compression)
- Image transformations (resize, crop, etc.)
- CDN delivery for fast loading
- Free tier: 25GB storage, 25GB bandwidth/month

## 🚀 Setup Steps

### Step 1: Create Cloudinary Account

1. Go to: https://cloudinary.com/users/register/free
2. Sign up for a free account
3. Verify your email

### Step 2: Get Your Credentials

1. After login, go to Dashboard
2. You'll see your credentials:
   - **Cloud Name**: e.g., `dxyz123abc`
   - **API Key**: e.g., `123456789012345`
   - **API Secret**: e.g., `abcdefghijklmnopqrstuvwxyz123`

### Step 3: Create Upload Preset

1. Go to **Settings** → **Upload**
2. Scroll to **Upload presets**
3. Click **Add upload preset**
4. Configure:
   - **Preset name**: `kagzi_india_preset`
   - **Signing Mode**: `Unsigned` (for client-side uploads)
   - **Folder**: `kagzi_india`
   - **Allowed formats**: `jpg, png, webp, gif`
   - **Max file size**: `5 MB`
5. Click **Save**

### Step 4: Update Environment Variables

Open `.env` file and update:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name_here"
CLOUDINARY_API_KEY="your_api_key_here"
CLOUDINARY_API_SECRET="your_api_secret_here"
CLOUDINARY_UPLOAD_PRESET="kagzi_india_preset"
```

**Example:**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dxyz123abc"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abcdefghijklmnopqrstuvwxyz123"
CLOUDINARY_UPLOAD_PRESET="kagzi_india_preset"
```

### Step 5: Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

## 🎯 How It Works

### Upload Flow

1. **User selects image** → File input in admin panel
2. **Preview shown** → Immediate local preview
3. **Upload to Cloudinary** → Via `/api/upload` endpoint
4. **Optimization** → Auto WebP conversion, compression
5. **URL returned** → Stored in database
6. **Display** → Fast CDN delivery

### Image Transformations

Images are automatically optimized:
- Max dimensions: 1200x1200px
- Quality: Auto (smart compression)
- Format: Auto (WebP when supported)
- CDN delivery for fast loading

### Folder Structure

```
cloudinary/
└── kagzi_india/
    ├── categories/
    │   ├── image1.jpg
    │   └── image2.png
    ├── products/
    └── gallery/
```

## 📝 Usage in Code

### In Admin Panel

```jsx
import ImageUpload from '../components/ImageUpload';

<ImageUpload
  value={formData.image}
  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
  folder="categories"
/>
```

### API Upload

```javascript
const formData = new FormData();
formData.append('file', file);
formData.append('folder', 'kagzi_india/categories');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});
```

### Get Optimized URL

```javascript
import { getOptimizedImageUrl } from '@/lib/cloudinary';

const optimizedUrl = getOptimizedImageUrl(publicId, {
  width: 400,
  height: 400,
  crop: 'fill',
  quality: 'auto:good'
});
```

## 🔒 Security Best Practices

### Production Setup

1. **Enable Signed Uploads**
   - Go to Settings → Upload
   - Change preset to "Signed"
   - Prevents unauthorized uploads

2. **Restrict Upload Sources**
   - Settings → Security
   - Add allowed domains
   - Example: `kagziindia.com`

3. **Set Upload Limits**
   - Max file size: 5MB
   - Allowed formats: jpg, png, webp
   - Max dimensions: 1200x1200

4. **Environment Variables**
   - Never commit `.env` to git
   - Use different credentials for dev/prod
   - Rotate API secrets regularly

## 📊 Monitoring

### Check Usage

1. Go to Dashboard
2. View:
   - Storage used
   - Bandwidth used
   - Transformations
   - API calls

### Free Tier Limits

- Storage: 25 GB
- Bandwidth: 25 GB/month
- Transformations: 25,000/month
- API calls: Unlimited

## 🛠️ Troubleshooting

### Upload Failed

**Error: "No file provided"**
- Check file input is working
- Verify file is selected

**Error: "Upload failed"**
- Check Cloudinary credentials in `.env`
- Verify upload preset exists
- Check file size (max 5MB)

**Error: "Invalid signature"**
- API Secret might be wrong
- Regenerate credentials

### Images Not Loading

**Check:**
1. URL is correct in database
2. Cloudinary account is active
3. Image wasn't deleted from Cloudinary
4. Network/CDN issues

### Slow Uploads

**Solutions:**
1. Reduce image size before upload
2. Use image compression
3. Check internet connection
4. Consider batch uploads

## 🎨 Advanced Features

### Custom Transformations

```javascript
// Circular crop
const circularUrl = cloudinary.url(publicId, {
  transformation: [
    { width: 200, height: 200, crop: 'fill', gravity: 'face' },
    { radius: 'max' }
  ]
});

// Add watermark
const watermarkedUrl = cloudinary.url(publicId, {
  transformation: [
    { overlay: 'logo', width: 100, opacity: 50, gravity: 'south_east' }
  ]
});
```

### Responsive Images

```jsx
<img
  src={cloudinary.url(publicId, { width: 400 })}
  srcSet={`
    ${cloudinary.url(publicId, { width: 400 })} 400w,
    ${cloudinary.url(publicId, { width: 800 })} 800w,
    ${cloudinary.url(publicId, { width: 1200 })} 1200w
  `}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Product"
/>
```

## 📚 Resources

- Cloudinary Docs: https://cloudinary.com/documentation
- Next.js Integration: https://next.cloudinary.dev/
- Image Transformations: https://cloudinary.com/documentation/image_transformations
- Upload API: https://cloudinary.com/documentation/upload_images

---

**Ready to Upload!** 🚀

Once configured, you can upload images directly from the admin panel.
