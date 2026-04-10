import Link from 'next/link';

const DocumentarySection = ({ videoUrl = "https://www.youtube.com/watch?v=U0gYeVSQlGA" }) => {
  return (
    <section className="w-full py-16 sm:py-20 bg-[#FAF6F1]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#860000]"></div>
              <span className="text-[#860000] text-xs font-semibold tracking-widest uppercase">
                Our Story
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl text-gray-900 leading-tight mb-4"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Kagzi Industries <span className="text-[#860000]">Documentary</span>
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              For over 80 years, Kagzi Industries has kept alive the ancient art of handmade paper from Jaipur's historic paper quarter. Watch how our artisans transform raw cotton rags into 100% sustainable, handcrafted paper — the same way it has been done since 1940.
            </p>

            <Link
              href="https://www.youtube.com/watch?v=U0gYeVSQlGA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#860000] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors w-fit"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Documentary
            </Link>
          </div>
      </div>
    </section>
  );
};

export default DocumentarySection;
