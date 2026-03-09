# Render Deployment Guide

## Current Issue
Build failing on Render with exit status 1.

## Required Environment Variables on Render

Go to your Render dashboard → Environment → Add the following:

```
DATABASE_URL=mongodb+srv://developmentkontentkraftdigital_db_user:KKD11001@cluster0.zdvpz4t.mongodb.net/?appName=Cluster0

JWT_SECRET=kagzi-india-super-secret-key-change-in-production

NODE_ENV=production

ADMIN_EMAIL=admin@kagziindia.com
ADMIN_PASSWORD=admin123

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dndtyjw3h
CLOUDINARY_API_KEY=592573536248396
CLOUDINARY_API_SECRET=DVjKAX6g7mdgEV8olvvc1EcSDq0
CLOUDINARY_UPLOAD_PRESET=kagzi_india_preset

EMAIL_USER=mehravivek2001@gmail.com
EMAIL_PASSWORD=awpnoqjjcrqlkesa
ADMIN_NOTIFICATION_EMAIL=developmentkontentkraftdigital@gmail.com

NEXT_PUBLIC_APP_URL=https://your-app-name.onrender.com
```

## Build Settings on Render

1. **Build Command:**
   ```
   npm install && npm run build
   ```

2. **Start Command:**
   ```
   npm start
   ```

3. **Node Version:**
   - Set to `18.x` or `20.x` (recommended)
   - Add in Environment: `NODE_VERSION=20`

## Common Issues & Solutions

### Issue 1: Build Timeout
**Solution:** Increase build timeout in Render settings or optimize build

### Issue 2: Memory Issues
**Solution:** 
- Upgrade to a paid plan with more memory
- Or add to package.json scripts:
  ```json
  "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  ```

### Issue 3: Missing Dependencies
**Solution:** Make sure all dependencies are in `dependencies` not `devDependencies`

### Issue 4: Environment Variables Not Loading
**Solution:** 
- Double-check all env vars are set in Render dashboard
- Restart the service after adding env vars

## Debugging Steps

1. **Check Render Logs:**
   - Go to Render Dashboard → Your Service → Logs
   - Look for specific error messages

2. **Test Build Locally:**
   ```bash
   npm run build
   ```
   Should complete without errors

3. **Check Node Version:**
   ```bash
   node --version
   ```
   Should be 18.x or higher

## Post-Deployment Checklist

- [ ] All environment variables set
- [ ] Build completes successfully
- [ ] Database connection works
- [ ] Images load from Cloudinary
- [ ] Email notifications work
- [ ] Admin panel accessible
- [ ] Products display correctly

## Troubleshooting Commands

If build fails, try these locally:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test build
npm run build

# Test production server
npm start
```

## Support

If still facing issues:
1. Copy the exact error from Render logs
2. Check if it's a specific file causing the issue
3. Verify all imports are correct
4. Make sure no files are missing from git
