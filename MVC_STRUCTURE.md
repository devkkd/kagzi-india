# MVC Architecture - Kagzi India Admin Panel

## 📁 Project Structure

```
kagzi_india/
├── src/
│   ├── app/
│   │   ├── admin/                    # Admin pages (Views)
│   │   │   ├── page.jsx             # Login page
│   │   │   └── dashboard/
│   │   │       └── page.jsx         # Dashboard page
│   │   └── api/                      # API Routes (Routes layer)
│   │       └── admin/
│   │           ├── login/
│   │           │   └── route.js     # POST /api/admin/login
│   │           ├── verify/
│   │           │   └── route.js     # GET /api/admin/verify
│   │           └── logout/
│   │               └── route.js     # POST /api/admin/logout
│   ├── controllers/                  # Controllers (Business Logic)
│   │   └── adminController.js       # Admin authentication logic
│   ├── models/                       # Models (Data Structure)
│   │   └── Admin.js                 # Admin user model
│   └── utils/                        # Utilities
│       └── auth.js                  # Authentication helpers
```

## 🏗️ MVC Pattern Explained

### Model (M) - Data Layer
**Location:** `src/models/`

Models define data structure and validation rules.

```javascript
// src/models/Admin.js
class Admin {
  constructor(data) { ... }
  static validate(data) { ... }
  toSafeObject() { ... }
}
```

### View (V) - Presentation Layer
**Location:** `src/app/admin/`

React components that render the UI.

```javascript
// src/app/admin/page.jsx - Login Form
// src/app/admin/dashboard/page.jsx - Dashboard
```

### Controller (C) - Business Logic Layer
**Location:** `src/controllers/`

Controllers handle business logic and coordinate between models and views.

```javascript
// src/controllers/adminController.js
class AdminController {
  static async login(email, password) { ... }
  static async verifyToken(token) { ... }
}
```

### Routes - API Endpoints
**Location:** `src/app/api/`

Next.js API routes that connect frontend to controllers.

```javascript
// src/app/api/admin/login/route.js
export async function POST(request) {
  const result = await AdminController.login(email, password);
  return NextResponse.json(result);
}
```

## 🔐 Authentication Flow

1. **User submits login form** → `/admin` (View)
2. **Form sends POST request** → `/api/admin/login` (Route)
3. **Route calls controller** → `AdminController.login()` (Controller)
4. **Controller validates data** → `Admin.validate()` (Model)
5. **Controller checks credentials** → Database query (future)
6. **Controller generates token** → `generateToken()` (Utility)
7. **Route sets HTTP-only cookie** → Secure token storage
8. **User redirected to dashboard** → `/admin/dashboard` (View)

## 🎨 Design System

### Colors
- Primary: `#860000` (Maroon)
- Background: `#FAF6F1` (Cream)
- Border: `rgba(208,195,195,1)` (Light Brown)
- Text: Gray scale

### Components
- Rounded corners: `rounded-lg`, `rounded-xl`
- Shadows: `shadow-md`, `shadow-lg`
- Transitions: `transition-colors duration-300`

## 🚀 Usage

### Login Credentials (Development)
```
Email: admin@kagziindia.com
Password: admin123
```

### Access Points
- Login: `http://localhost:3000/admin`
- Dashboard: `http://localhost:3000/admin/dashboard`

## 📝 Next Steps (Production Ready)

1. **Database Integration**
   - Replace dummy data with MongoDB/PostgreSQL
   - Add proper user management

2. **Security Enhancements**
   - Use `bcrypt` for password hashing
   - Use `jsonwebtoken` for JWT tokens
   - Add rate limiting
   - Implement CSRF protection

3. **Environment Variables**
   ```env
   JWT_SECRET=your-secret-key
   DATABASE_URL=your-database-url
   ```

4. **Additional Features**
   - Password reset functionality
   - Two-factor authentication
   - Role-based access control
   - Audit logging

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Dependencies Used

- Next.js 16.1.6 (App Router)
- React 19.2.3
- React Icons (FiMail, FiLock, etc.)
- Tailwind CSS 4

---

**Created for Kagzi India** 🇮🇳
Handmade Paper Excellence Since Generations
