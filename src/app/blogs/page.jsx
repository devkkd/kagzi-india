'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiClock, FiUser, FiCalendar, FiArrowRight, FiBookOpen } from 'react-icons/fi';

const BLOG_CATEGORIES = ['All', 'Heritage', 'Artisan', 'Eco-friendly', 'Sustainability', 'Guides'];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch only active blogs for frontend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs?isActive=true');
        const data = await response.json();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error('Failed to load blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search query AND category selection
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || 
      (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase());
      
    return matchesSearch && matchesCategory;
  });

  // Separate the most recent blog of the filtered list to be the "Featured Post"
  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const standardBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  // Helper to format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pb-20">
      
      {/* Redesigned Premium Hero Section */}
      <section className="relative py-8   overflow-hidden">
        {/* Background micro-accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#860000]/2 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#860000]/2 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            
            {/* Signature Line Prefix Accent */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#860000] text-xs sm:text-sm font-bold uppercase tracking-widest font-sans">
                Kagzi India Journals
              </span>
            </div>

            {/* Title with MainFont */}
            <h1 
              style={{ fontFamily: 'MainFont, sans-serif' }}
              className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight tracking-tight mt-2"
            >
              Paper That Tells <span className="text-[#860000]">Stories</span>
            </h1>
            
            {/* <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-sans">
              Delve into the art of handmade papermaking, eco-friendly lifestyle guides, sustainable products, and the rich history of Kagzi craftsmanship.
            </p> */}

            {/* Custom search bar matching Header theme */}
            <div className="mt-8 w-full max-w-md relative shadow-sm rounded-full overflow-hidden border border-[#860000]/70 focus-within:ring-2 focus-within:ring-[#860000]/30 transition-all bg-white flex items-center px-4 py-2">
              <FiSearch className="text-[#860000] shrink-0" size={18} />
              <input
                type="text"
                placeholder="Search handmade paper journals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-3 w-full bg-transparent outline-none text-xs sm:text-sm text-gray-800 placeholder-[#a39a9a]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 mt-4">
        
        {/* Real-time Category Selector Pills matching Products page */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 ">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  backgroundColor: isActive ? '#860000' : '#ffffff',
                  color: isActive ? '#ffffff' : '#1f2937',
                  borderColor: isActive ? '#860000' : '#d1d5db'
                }}
                className="px-5 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all cursor-pointer hover:border-[#860000]/60 active:scale-95 duration-200"
              >
                {cat}
              </button>
            );
          })}
        </div>

        {loading ? (
          /* Loading Spinner */
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-10 h-10 border-4 border-[#860000]/25 border-t-[#860000] rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium text-xs animate-pulse tracking-wider uppercase">Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-2xl border border-[rgba(208,195,195,0.4)] shadow-sm max-w-md mx-auto">
            <FiBookOpen className="mx-auto text-gray-300 mb-4" size={56} />
            <h3 
              style={{ fontFamily: 'MainFont, sans-serif' }}
              className="text-xl text-gray-900 mb-2"
            >
              No articles found
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xs mx-auto mb-6 leading-relaxed">
              We couldn't find any articles in "{selectedCategory}" matching your search keywords. Try adjusting your query!
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="px-6 py-2.5 bg-[#860000] text-white text-xs font-semibold rounded-full hover:bg-[#680000] transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Blogs Display */
          <div className="space-y-16">
            
            {/* Featured Post Card (Premium layout) */}
            {featuredBlog && (
              <div className="bg-white rounded-2xl border border-[rgba(208,195,195,0.4)] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Featured Post Image */}
                  <div className="lg:col-span-7 h-64 sm:h-96 relative overflow-hidden bg-[#FAF6F1] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[rgba(208,195,195,0.4)]">
                    {featuredBlog.image ? (
                      <img
                        src={featuredBlog.image}
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <FiBookOpen size={64} className="text-gray-300" />
                    )}
                    
                    {/* Category Label Overlay */}
                    <span className="absolute top-4 left-4 bg-[#860000] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
                      {featuredBlog.category || 'General'}
                    </span>
                  </div>
                  
                  {/* Featured Post Summary Details */}
                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-[#FAF6F1]/20">
                    <div>
                      <div className="flex items-center gap-1.5 text-[#860000] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                        <span>New Release</span>
                      </div>
                      
                      <h2 
                        style={{ fontFamily: 'MainFont, sans-serif' }}
                        className="text-2xl sm:text-3xl text-gray-900 mb-4 hover:text-[#860000] transition-colors leading-tight"
                      >
                        <Link href={`/blogs/${featuredBlog.slug}`}>
                          {featuredBlog.title}
                        </Link>
                      </h2>
                      
                      {featuredBlog.excerpt && (
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                          {featuredBlog.excerpt}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      {/* Author and Read Time info */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500 pt-6 border-t border-[rgba(208,195,195,0.3)] mb-6 font-sans">
                        <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                          <FiUser size={13} className="text-[#860000]" /> By {featuredBlog.author}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1.5">
                          <FiCalendar size={13} /> {formatDate(featuredBlog.createdAt)}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1.5">
                          <FiClock size={13} /> {featuredBlog.readTime} min
                        </span>
                      </div>
                      
                      <Link 
                        href={`/blogs/${featuredBlog.slug}`}
                        className="inline-flex items-center gap-2 bg-[#860000] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#680000] transition-all transform active:scale-95 shadow-sm hover:shadow"
                      >
                        <span>READ FULL ARTICLE</span>
                        <FiArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Post Cards Grid */}
            {standardBlogs.length > 0 && (
              <div className="space-y-6">
                
                {/* Secondary section title */}
                <div className="flex items-center gap-4 mb-6">
                  <span 
                    style={{ fontFamily: 'MainFont, sans-serif' }}
                    className="text-2xl text-gray-900"
                  >
                    Further Readings
                  </span>
                  <div className="flex-1 h-px bg-[rgba(208,195,195,0.6)]"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {standardBlogs.map((blog) => (
                    <article
                      key={blog.id}
                      className="bg-white rounded-xl border border-[rgba(208,195,195,0.3)] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                    >
                      {/* Card Cover Image */}
                      <div className="h-48 bg-[#FAF6F1] flex items-center justify-center relative overflow-hidden">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        ) : (
                          <FiBookOpen className="text-gray-300" size={40} />
                        )}
                        
                        {/* Tag Category overlay */}
                        <span className="absolute top-3 left-3 bg-[#FAF6F1] text-gray-800 border border-[rgba(208,195,195,0.6)] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm">
                          {blog.category || 'General'}
                        </span>
                      </div>

                      {/* Card Body content */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Metatags */}
                          <div className="flex items-center space-x-3 text-[10px] text-gray-500 mb-2 font-sans">
                            <span className="flex items-center gap-1 font-semibold text-gray-700">
                              <FiUser size={11} className="text-[#860000]" /> {blog.author}
                            </span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1">
                              <FiClock size={11} /> {blog.readTime} min read
                            </span>
                          </div>
                          
                          <h4 
                            style={{ fontFamily: 'MainFont, sans-serif' }}
                            className="text-lg text-gray-900 line-clamp-2 hover:text-[#860000] transition-colors mb-2 leading-tight"
                          >
                            <Link href={`/blogs/${blog.slug}`}>
                              {blog.title}
                            </Link>
                          </h4>
                          
                          {blog.excerpt && (
                            <p className="text-gray-600 text-xs line-clamp-2 mb-4 leading-relaxed font-sans">
                              {blog.excerpt}
                            </p>
                          )}
                        </div>

                        {/* Link to read details */}
                        <Link 
                          href={`/blogs/${blog.slug}`}
                          className="inline-flex items-center gap-1 text-[#860000] text-xs font-bold hover:text-[#680000] mt-4 self-start group/link border-b border-transparent hover:border-[#860000] pb-0.5 transition-all font-sans"
                        >
                          <span>READ ARTICLE</span>
                          <FiArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        )}
      </main>
      
    </div>
  );
}
