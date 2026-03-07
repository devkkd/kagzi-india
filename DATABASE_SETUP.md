# Database Setup Guide - Kagzi India

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB

1. **Install MongoDB**
   - Download from: https://www.mongodb.com/try/download/community
   - Install and start MongoDB service

2. **Update .env file**
   ```env
   DATABASE_URL="mongodb://localhost:27017/kagzi_india"
   ```

3. **Start MongoDB**
   ```bash
   # Windows
   net start MongoDB
   
   # Or use MongoDB Compass GUI
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Setup Database Access**
   - Go to "Database Access"
   - Add new database user
   - Username: `kagzi_admin`
   - Password: Generate secure password
   - User Privileges: Read and write to any database

4. **Setup Network Access**
   - Go to "Network Access"
   - Add IP Address
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your server IP

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

6. **Update .env file**
   ```env
   DATABASE_URL="mongodb+srv://kagzi_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/kagzi_india?retryWrites=true&w=majority"
   ```

## 🚀 Initial Setup

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Create Initial Admin User

**Method 1: Using API (Recommended)**

Use Postman or curl:
```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kagziindia.com",
    "password": "admin123",
    "name": "Admin User",
    "setupKey": "kagzi-setup-2024"
  }'
```

**Method 2: Using Browser Console**

Open browser console on any page and run:
```javascript
fetch('/api/admin/setup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@kagziindia.com',
    password: 'admin123',
    name: 'Admin User',
    setupKey: 'kagzi-setup-2024'
  })
}).then(r => r.json()).then(console.log);
```

### Step 3: Login

Go to: http://localhost:3000/admin

Use credentials:
- Email: `admin@kagziindia.com`
- Password: `admin123`

## 📊 Database Structure

### Collections

#### admins
```javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (hashed with bcrypt),
  name: String,
  role: String (enum: 'admin', 'super_admin'),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Notes

1. **Change Setup Key**: Update `setupKey` in `/api/admin/setup/route.js` for production
2. **Change JWT Secret**: Update `JWT_SECRET` in `.env` file
3. **Disable Setup Route**: Delete or protect `/api/admin/setup` after initial setup
4. **Strong Passwords**: Use strong passwords for admin accounts
5. **IP Whitelist**: In production, whitelist only your server IP in MongoDB Atlas

## 🛠️ Troubleshooting

### Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Make sure MongoDB is running or check your connection string

### Authentication Failed
```
MongoServerError: bad auth
```
**Solution**: Check username/password in connection string

### Network Timeout
```
Error: connection timed out
```
**Solution**: Check Network Access settings in MongoDB Atlas

## 📝 Useful Commands

### Check MongoDB Connection
```javascript
// In any API route
import connectDB from '@/lib/mongodb';
await connectDB();
console.log('Connected!');
```

### View Database in MongoDB Compass
- Connection String: Same as DATABASE_URL
- Download: https://www.mongodb.com/products/compass

## 🎯 Next Steps

1. ✅ Setup MongoDB (Local or Atlas)
2. ✅ Update .env with DATABASE_URL
3. ✅ Run setup API to create admin
4. ✅ Login to admin panel
5. 🔜 Add more features (products, orders, etc.)

---

**Need Help?** Check MongoDB docs: https://docs.mongodb.com/
