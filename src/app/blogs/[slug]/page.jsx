import Link from 'next/link';
import { FiArrowLeft, FiClock, FiUser, FiCalendar, FiBookOpen } from 'react-icons/fi';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// Helper to format date nicely
const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Next.js App Router metadata generation for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug, isActive: true }).lean();
    
    if (!blog) {
      return {
        title: 'Journal Entry Not Found | Kagzi India',
        description: 'The requested blog post could not be found.'
      };
    }
    
    return {
      title: `${blog.metaTitle || blog.title} | Kagzi India`,
      description: blog.metaDescription || blog.excerpt || 'Read the latest journal post on Kagzi India.'
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return {
      title: 'Kagzi India Journals',
      description: 'Explore stories of heritage, handcraft, and sustainability.'
    };
  }
}

// Next.js Server Component for Dynamic Blog Post Page
const BlogDetailPage = async ({ params }) => {
  const { slug } = await params;

  try {
    await connectDB();

    const blogDoc = await Blog.findOne({ slug, isActive: true }).lean();

    if (!blogDoc) {
      return (
        <main className="w-full min-h-screen py-16 lg:py-24 bg-[#FAF9F6] flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-6 text-center">
            <FiBookOpen className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-2xl font-bold font-serif text-gray-900 mb-3">Journal Entry Not Found</h2>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              The article you are trying to view might have been moved, deleted, or saved as a draft.
            </p>
            <Link 
              href="/blogs"
              className="inline-flex items-center gap-2 bg-[#860000] text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#680000] transition-colors"
            >
              <FiArrowLeft />
              <span>RETURN TO JOURNALS</span>
            </Link>
          </div>
        </main>
      );
    }

    // Serialize MongoDB document to plain JS object
    const blog = {
      id: blogDoc._id.toString(),
      title: blogDoc.title,
      slug: blogDoc.slug,
      content: blogDoc.content,
      excerpt: blogDoc.excerpt || '',
      image: blogDoc.image || null,
      author: blogDoc.author || 'Admin',
      readTime: blogDoc.readTime || 5,
      category: blogDoc.category || 'General',
      schemaScript: blogDoc.schemaScript || null,
      createdAt: blogDoc.createdAt ? blogDoc.createdAt.toISOString() : null,
    };

    // Helper to render schema script (wrapping in script tag if it's raw JSON)
    const renderSchemaScript = (scriptStr) => {
      if (!scriptStr) return null;
      const trimmed = scriptStr.trim();
      if (trimmed.startsWith('<script')) {
        return <div dangerouslySetInnerHTML={{ __html: trimmed }} />;
      }
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: trimmed }}
        />
      );
    };

    return (
      <main className=" min-h-screen pb-20">
        {/* Render Schema Script for SEO */}
        {renderSchemaScript(blog.schemaScript)}
        
        {/* Back Link Header */}
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-[#860000] transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO JOURNALS</span>
          </Link>
        </div>

        {/* Article Container */}
        <article className="max-w-3xl mx-auto px-6">
          
          {/* Header Metadata */}
          <header className="mb-8">
            
            {/* Category Tag & Signature Line Accent */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#860000] text-xs font-bold uppercase tracking-widest bg-[#860000]/10 px-3 py-1 rounded-full">
                {blog.category}
              </span>
              <div className="h-px bg-[rgba(208,195,195,0.6)] flex-1"></div>
            </div>

            <h1 
              style={{ fontFamily: 'MainFont, Georgia, serif' }}
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mt-4 mb-6 leading-tight tracking-tight"
            >
              {blog.title}
            </h1>
            
            {/* Meta tags (author, date, read time) */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500 pb-6 border-b border-[rgba(208,195,195,0.4)]">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <FiUser size={13} className="text-[#860000]" /> By {blog.author}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <FiCalendar size={13} /> {formatDate(blog.createdAt)}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <FiClock size={13} /> {blog.readTime} min read
              </span>
            </div>
          </header>

          {/* Featured/Cover Image */}
          {blog.image && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-md border border-[rgba(208,195,195,0.3)] bg-white">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}

          {/* HTML Article Content */}
          <div 
            className="blog-post-content font-sans text-gray-800 leading-relaxed text-sm sm:text-base space-y-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Article Footer Divider */}
          <footer className="mt-16 pt-8 border-t border-[rgba(208,195,195,0.4)] text-center">
            <p className="text-xs text-gray-500 font-serif italic mb-6">
              Thank you for reading the Kagzi India Journal. We believe in preserving stories, heritage, and mother nature through handcrafted creations.
            </p>
            <Link 
              href="/blogs"
              className="inline-flex items-center gap-2 bg-[#860000] text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#680000] transition-colors shadow-sm"
            >
              <FiArrowLeft />
              <span>ALL JOURNAL ENTRIES</span>
            </Link>
          </footer>
        </article>

        {/* Global styling injected for HTML elements inside the blog post content */}
        <style dangerouslySetInnerHTML={{ __html: `
          .blog-post-content p {
            margin-bottom: 1.5rem;
            line-height: 1.8;
          }
          .blog-post-content h2 {
            font-family: MainFont, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
            font-size: 1.625rem;
            font-weight: 700;
            color: #860000;
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 1.35;
          }
          .blog-post-content h3 {
            font-family: MainFont, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
            font-size: 1.35rem;
            font-weight: 700;
            color: #111827;
            margin-top: 1.75rem;
            margin-bottom: 0.75rem;
            line-height: 1.35;
          }
          .blog-post-content ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
            color: #374151;
          }
          .blog-post-content ol {
            list-style-type: decimal;
            padding-left: 1.5rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
            color: #374151;
          }
          .blog-post-content li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
          .blog-post-content a {
            color: #860000;
            text-decoration: underline;
            font-weight: 500;
            transition: color 0.2s;
          }
          .blog-post-content a:hover {
            color: #680000;
          }
          .blog-post-content blockquote {
            border-left: 4px solid #860000;
            background-color: #FAF6F1;
            padding: 1.25rem 1.5rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #4b5563;
            border-radius: 0 8px 8px 0;
            font-family: ui-serif, Georgia, Cambria, serif;
          }
          .blog-post-content figure {
            margin: 2rem 0;
            text-align: center;
          }
          .blog-post-content figure img {
            max-width: 100%;
            height: auto;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: 1px solid rgba(208,195,195,0.3);
          }
          .blog-post-content figure figcaption {
            font-size: 0.75rem;
            color: #6b7280;
            margin-top: 0.5rem;
            font-style: italic;
          }
          .blog-post-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.875rem;
            text-align: left;
            border: 1px solid rgba(208,195,195,0.6);
            border-radius: 8px;
            overflow: hidden;
          }
          .blog-post-content table th {
            background-color: #FAF6F1;
            padding: 0.75rem;
            font-weight: 600;
            color: #860000;
            border-bottom: 1px solid rgba(208,195,195,0.6);
          }
          .blog-post-content table td {
            padding: 0.75rem;
            border-bottom: 1px solid rgba(208,195,195,0.3);
            color: #4b5563;
          }
          .blog-post-content table tr:last-child td {
            border-bottom: 0;
          }
          .blog-post-content strong {
            font-weight: 700;
            color: #111827;
          }
          .blog-post-content em {
            font-style: italic;
          }
          .blog-post-content u {
            text-decoration: underline;
          }
        ` }} />
      </main>
    );

  } catch (error) {
    console.error('Failed to load blog details:', error);
    return (
      <main className="w-full min-h-screen py-16 lg:py-24 bg-[#FAF9F6] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 text-center">
          <FiBookOpen className="mx-auto text-red-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold font-serif text-gray-900 mb-3">Error Loading Post</h2>
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            There was an error querying the database for this journal entry. Please try again later.
          </p>
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 bg-[#860000] text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#680000] transition-colors font-sans"
          >
            <FiArrowLeft />
            <span>RETURN TO JOURNALS</span>
          </Link>
        </div>
      </main>
    );
  }
};

export default BlogDetailPage;
