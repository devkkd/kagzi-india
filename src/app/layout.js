import "./globals.css";
import { CartProvider } from "../context/CartContext";
import LayoutClient from "./LayoutClient";
import Script from "next/script";

export const metadata = {
  title: "Kagzi India - Handmade Paper",
  description: "Premium handmade paper products from India",
  verification: {
    google: "VyfUjocNIKptZl2JzJw9d6CT39Q32LBL2FPPWEeg4ro",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo/KagziIcon.png", type: "image/png" },
    ],
    apple: "/images/logo/KagziIcon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Cloudinary for faster image loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* Preload the LCP image (first banner) */}
        <link
          rel="preload"
          as="image"
          href="/images/banner/banner1.png"
          fetchPriority="high"
        />

        {/* Google Analytics — deferred, non-render-blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9FBC24526C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9FBC24526C');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <CartProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </CartProvider>
      </body>
    </html>
  );
}
