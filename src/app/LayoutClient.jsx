'use client';
import { usePathname } from 'next/navigation';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CertificationsNewsletter from "../components/CertificationsNewsletter";

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
        </>
      )}
    </>
  );
}
