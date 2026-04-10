'use client';
import { usePathname } from 'next/navigation';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CertificationsNewsletter from "../components/CertificationsNewsletter";

const WHATSAPP_NUMBER = "+919928424518"; // format: country code + number, no +
const WHATSAPP_MESSAGE = "Hello! I'm interested in your handmade paper products.";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && (
        <>
          <CertificationsNewsletter />
          <Footer />

          {/* WhatsApp Floating Button */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-200"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
              <path d="M12.031 21.036c-1.536 0-3.046-.413-4.368-1.192l-4.851 1.272 1.294-4.73A8.932 8.932 0 013.1 12.031c0-4.945 4.025-8.97 8.971-8.97 4.946 0 8.972 4.025 8.972 8.97 0 4.946-4.026 8.971-8.972 8.971zM12.031 4.542A7.488 7.488 0 004.542 12.03c0 1.488.384 2.94 1.118 4.228l-.759 2.774 2.839-.745a7.488 7.488 0 004.29 1.332c4.12 0 7.47-3.35 7.47-7.47 0-4.12-3.35-7.47-7.47-7.47zm3.99 10.33c-.218-.11-1.295-.64-1.496-.713-.201-.073-.347-.11-.493.11-.146.218-.566.712-.693.858-.128.146-.255.165-.473.055-.219-.11-.925-.342-1.76-1.085-.65-.578-1.09-1.292-1.218-1.511-.128-.219-.013-.338.096-.447.1-.1.219-.256.328-.383.11-.128.146-.219.219-.365.073-.146.036-.274-.018-.383-.055-.11-.493-1.188-.675-1.625-.178-.426-.358-.368-.493-.375-.128-.007-.274-.007-.42-.007-.146 0-.383.055-.584.274-.201.219-.766.748-.766 1.825 0 1.076.785 2.116.894 2.262.11.146 1.542 2.353 3.736 3.303.522.226.929.362 1.246.463.524.167 1.002.143 1.378.087.425-.064 1.295-.53 1.478-1.042.182-.511.182-.949.128-1.042-.055-.092-.201-.147-.42-.256z" />
            </svg>
          </a>
        </>
      )}
    </>
  );
}
