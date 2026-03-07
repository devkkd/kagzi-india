// Seed Script: Create Sample Categories
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

// Category Schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, unique: true, lowercase: true, trim: true },
  description: { type: String, trim: true },
  image: { type: String, default: null },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Auto-generate slug
CategorySchema.pre('save', async function() {
  if (this.isModified('name') || !this.slug) {
    let slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const existingCategory = await mongoose.models.Category.findOne({ 
      slug, 
      _id: { $ne: this._id } 
    });

    if (existingCategory) {
      slug = `${slug}-${Date.now()}`;
    }

    this.slug = slug;
  }
});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

// Seed data
const categories = [
  {
    name: 'Handmade Paper',
    description: 'Traditional handmade paper crafted with care'
  },
  {
    name: 'Greeting Cards',
    description: 'Beautiful handcrafted greeting cards for all occasions'
  },
  {
    name: 'Notebooks & Journals',
    description: 'Eco-friendly notebooks and journals'
  },
  {
    name: 'Gift Items',
    description: 'Unique handmade gift items'
  },
  {
    name: 'Wedding Collection',
    description: 'Elegant handmade paper products for weddings'
  },
  {
    name: 'Corporate Gifts',
    description: 'Professional handmade corporate gift solutions'
  }
];

async function seedCategories() {
  try {
    console.log('🌱 Starting category seed...');
    
    const MONGODB_URI = process.env.DATABASE_URL;
    
    if (!MONGODB_URI) {
      throw new Error('DATABASE_URL not found in .env file');
    }

    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Clearing existing categories...');
    await Category.deleteMany({});
    console.log('✅ Cleared existing categories');

    console.log('📦 Creating categories...');
    
    for (const categoryData of categories) {
      const category = new Category(categoryData);
      await category.save();
      console.log(`✅ Created: ${category.name} (slug: ${category.slug})`);
    }

    console.log('\n🎉 Seed completed successfully!\n');
    console.log('📝 Created Categories:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const allCategories = await Category.find().sort({ name: 1 });
    allCategories.forEach(cat => {
      console.log(`  • ${cat.name} (${cat.slug})`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

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
seedCategories();
