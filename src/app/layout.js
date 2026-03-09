'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { usePathname } from 'next/navigation';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CertificationsNewsletter from "../components/CertificationsNewsletter";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {!isAdminRoute && <Header />}
          {children}
          {!isAdminRoute && (
            <>
              <CertificationsNewsletter />
              <Footer />
            </>
          )}
        </CartProvider>
      </body>
    </html>
  );
}
