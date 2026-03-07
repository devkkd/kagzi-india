import Header from "../components/Header";
import Footer from "../components/Footer";
import CertificationsNewsletter from "../components/CertificationsNewsletter";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <CertificationsNewsletter />
      <Footer />
    </>
  );
}
