import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import LayoutClient from "./LayoutClient";
import Script from "next/script";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona",
  weight: ["200","300","400","500","600","700","800","900"]
});

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
      <body className={`${monaSans.variable} antialiased`}>
        <CartProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </CartProvider>
      </body>
    </html>
  );
}