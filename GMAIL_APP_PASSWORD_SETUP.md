# Gmail App Password Setup - Step by Step Guide

## ⚠️ Current Error
```
Error: Invalid login: Application-specific password required
```

Ye error isliye aa raha hai kyunki tumne Gmail App Password setup nahi kiya hai.

## 🔧 Solution: Gmail App Password Generate Karo

### Step 1: Google Account Settings Mein Jao

1. Browser mein jao: https://myaccount.google.com/
2. Apne Gmail account se login karo (jo email bhejne ke liye use karoge)

### Step 2: 2-Step Verification Enable Karo

1. Left sidebar mein **"Security"** par click karo
2. **"2-Step Verification"** dhundo
3. Agar OFF hai to **"Get Started"** par click karo
4. Instructions follow karo aur 2-Step Verification enable karo
   - Phone number verify karna padega
   - SMS ya call se code milega

### Step 3: App Password Generate Karo

1. 2-Step Verification enable hone ke baad, wapas **"Security"** section mein jao
2. **"App passwords"** search karo ya directly yahan jao:
   👉 https://myaccount.google.com/apppasswords

3. Agar "App passwords" option nahi dikh raha:
   - Make sure 2-Step Verification properly enabled hai
   - Page refresh karo
   - Logout/Login karo

4. **"Select app"** dropdown mein:
   - **"Mail"** select karo

5. **"Select device"** dropdown mein:
   - **"Other (Custom name)"** select karo
   - Type karo: **"Kagzi India Website"**

6. **"Generate"** button par click karo

7. Ek 16-digit password dikhega (spaces ke saath):
   ```
   xxxx xxxx xxxx xxxx
   ```
   
8. **Is password ko copy karo** (spaces ke saath ya bina, dono chalega)

### Step 4: .env File Update Karo

Apni `.env` file mein ye values update karo:

```env
# Email Configuration (Gmail)
EMAIL_USER="your-actual-email@gmail.com"           # ← Apna real Gmail address
EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"               # ← 16-digit app password (jo abhi generate kiya)
ADMIN_NOTIFICATION_EMAIL="admin@kagziindia.com"    # ← Admin ka email (jahan notification chahiye)
NEXT_PUBLIC_APP_URL="http://localhost:3000"        # ← Development mein ye hi rahega
```

### Example:
```env
EMAIL_USER="kagziindia@gmail.com"
EMAIL_PASSWORD="abcd efgh ijkl mnop"
ADMIN_NOTIFICATION_EMAIL="admin@kagziindia.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 5: Development Server Restart Karo

```bash
# Terminal mein Ctrl+C press karo (server stop karne ke liye)
# Phir wapas start karo:
npm run dev
```

### Step 6: Test Karo

1. Website par jao
2. Contact form ya product inquiry submit karo
3. Check karo:
   - Terminal mein "Email sent successfully" message aana chahiye
   - Admin email mein notification aana chahiye
   - Customer email mein confirmation aana chahiye

## ✅ Success Indicators

Terminal mein ye messages dikhne chahiye:
```
Email sent successfully: <message-id>
Product inquiry email sent successfully: <message-id>
Customer confirmation email sent: <message-id>
```

## 🚨 Troubleshooting

### Problem 1: "App passwords" option nahi dikh raha
**Solution:**
- 2-Step Verification properly enable karo
- Kuch minutes wait karo
- Page refresh karo
- Different browser try karo

### Problem 2: Still "Invalid login" error
**Solution:**
- App password sahi se copy kiya hai? (spaces matter nahi karte)
- .env file save kiya hai?
- Server restart kiya hai?
- Correct email address use kar rahe ho?

### Problem 3: Email spam mein ja raha hai
**Solution:**
- Pehli baar emails spam mein ja sakte hain
- Spam folder check karo
- Email ko "Not Spam" mark karo

### Problem 4: Email nahi aa raha
**Solution:**
- Console logs check karo
- Internet connection check karo
- Gmail account active hai?
- Daily sending limit cross to nahi ho gayi? (Gmail: 500 emails/day)

## 📧 Email Sending Limits

**Gmail Free Account:**
- 500 emails per day
- 100 recipients per email
- Tumhare use case ke liye ye kaafi hai

## 🔒 Security Tips

1. ✅ App password ko kabhi share mat karo
2. ✅ .env file ko .gitignore mein rakho (already hai)
3. ✅ Production mein environment variables use karo (Vercel/Netlify)
4. ✅ Regular password nahi, sirf app password use karo

## 🎯 Next Steps

1. ✅ Gmail App Password generate karo
2. ✅ .env file update karo
3. ✅ Server restart karo
4. ✅ Test karo
5. ✅ Production deployment ke liye environment variables set karo

## 📞 Still Having Issues?

Agar phir bhi problem aa rahi hai to:
1. Terminal ka complete error message copy karo
2. .env file check karo (password sahi hai?)
3. 2-Step Verification enabled hai confirm karo
4. Different Gmail account try karo

---

**Important:** Regular Gmail password use mat karo! Sirf App Password use karo.
