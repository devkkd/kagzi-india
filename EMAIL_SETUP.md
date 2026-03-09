# Email Notification Setup Guide

## Overview
Jab bhi koi customer inquiry submit karta hai, automatically 2 emails bheje jaate hain:
1. **Admin ko notification** - Naye inquiry ki details ke saath
2. **Customer ko confirmation** - Thank you message ke saath

## Gmail Setup (Recommended)

### Step 1: Gmail App Password Generate Karo

1. Apne Gmail account mein login karo
2. Google Account Settings mein jao: https://myaccount.google.com/
3. **Security** section mein jao
4. **2-Step Verification** enable karo (agar already nahi hai)
5. **App passwords** search karo ya yahan jao: https://myaccount.google.com/apppasswords
6. **Select app** → "Mail" choose karo
7. **Select device** → "Other" choose karo aur "Kagzi India" type karo
8. **Generate** button click karo
9. 16-digit password copy karo (spaces ke saath)

### Step 2: .env File Update Karo

```env
# Email Configuration
EMAIL_USER="your-email@gmail.com"           # Apna Gmail address
EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"        # 16-digit app password
ADMIN_NOTIFICATION_EMAIL="admin@kagziindia.com"  # Admin ka email
NEXT_PUBLIC_APP_URL="http://localhost:3000"      # Production mein actual URL
```

### Step 3: Test Karo

1. Development server start karo:
   ```bash
   npm run dev
   ```

2. Contact form fill karo aur submit karo
3. Check karo:
   - Admin email mein notification aaya?
   - Customer email mein confirmation aaya?

## Email Templates

### Admin Notification Email
- Subject: "🔔 New Customer Inquiry - Kagzi India"
- Contains: Customer details, message, timestamp
- Button: "View in Admin Panel" (admin panel link)

### Customer Confirmation Email
- Subject: "Thank You for Contacting Kagzi India"
- Contains: Thank you message, inquiry details
- Professional branded template

## Troubleshooting

### Email nahi aa raha?

1. **Check Console Logs**
   ```bash
   # Terminal mein dekho koi error to nahi
   ```

2. **Gmail Settings Verify Karo**
   - 2-Step Verification enabled hai?
   - App password sahi hai?
   - Less secure app access OFF hai? (App password use karne par ye OFF hona chahiye)

3. **Spam Folder Check Karo**
   - Pehli baar emails spam mein ja sakte hain

4. **Environment Variables Check Karo**
   ```bash
   # .env file properly load ho rahi hai?
   ```

### Common Errors

**Error: "Invalid login"**
- Solution: App password sahi se copy karo (spaces ke saath)

**Error: "Connection timeout"**
- Solution: Internet connection check karo

**Error: "Authentication failed"**
- Solution: 2-Step Verification enable karo aur naya app password generate karo

## Production Deployment

Production mein deploy karte waqt:

1. `.env` file ko `.env.production` mein copy karo
2. Real email addresses update karo
3. `NEXT_PUBLIC_APP_URL` ko actual domain se replace karo
4. Vercel/Netlify environment variables mein add karo

## Alternative Email Services

### Using SendGrid (Optional)
```bash
npm install @sendgrid/mail
```

### Using AWS SES (Optional)
```bash
npm install @aws-sdk/client-ses
```

## Features

✅ Admin ko instant notification
✅ Customer ko automatic confirmation
✅ Professional HTML email templates
✅ Mobile-responsive emails
✅ Error handling (email fail hone par bhi inquiry save hoti hai)
✅ Indian timezone support

## Support

Koi problem ho to check karo:
1. Console logs
2. Email credentials
3. Internet connection
4. Gmail security settings
