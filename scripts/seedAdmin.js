// Seed Script: Create Initial Admin User
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

// Admin Schema (inline to avoid import issues)
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'super_admin'],
    default: 'admin'
  },
  lastLogin: Date
}, {
  timestamps: true
});

// Import bcrypt for password hashing
import bcrypt from 'bcryptjs';

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

// Seed data
const adminUsers = [
  {
    email: 'admin@kagziindia.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  }
];

async function seedAdmins() {
  try {
    console.log('🌱 Starting admin seed...');
    
    // Connect to MongoDB
    const MONGODB_URI = process.env.DATABASE_URL;
    
    if (!MONGODB_URI) {
      throw new Error('DATABASE_URL not found in .env file');
    }

    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing admins (optional - comment out if you want to keep existing)
    console.log('🗑️  Clearing existing admins...');
    await Admin.deleteMany({});
    console.log('✅ Cleared existing admins');

    // Create new admins
    console.log('👤 Creating admin users...');
    
    for (const adminData of adminUsers) {
      const existingAdmin = await Admin.findOne({ email: adminData.email });
      
      if (existingAdmin) {
        console.log(`⚠️  Admin already exists: ${adminData.email}`);
        continue;
      }

      // Hash password manually
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminData.password, salt);

      const admin = new Admin({
        ...adminData,
        password: hashedPassword
      });
      
      await admin.save();
      console.log(`✅ Created admin: ${adminData.email} (${adminData.role})`);
    }

    console.log('\n🎉 Seed completed successfully!\n');
    console.log('📝 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    adminUsers.forEach(admin => {
      console.log(`\n👤 ${admin.role.toUpperCase()}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Password: ${admin.password}`);
    });
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  }
}

// Run seed
seedAdmins();
