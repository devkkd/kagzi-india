import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import LayoutClient from "./LayoutClient";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona",
  weight: ["200","300","400","500","600","700","800","900"]
});

export const metadata = {
  title: "Kagzi India - Handmade Paper",
  description: "Premium handmade paper products from India",
  icons: {
    icon: "/images/logo/KagziIcon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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