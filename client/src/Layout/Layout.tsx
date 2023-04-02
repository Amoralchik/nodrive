import { BreadcrumbLayout } from "@components/Layout/Breadcrumb";
import { Footer } from "@components/Layout/Footer";
import { Header } from "@components/Layout/Header";
import { Helmet } from "react-helmet";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full font-mono">
      <Helmet>
        <title>NoDrive</title>
      </Helmet>
      <div className="container mx-auto">
        <Header />
        <div className="container p-4">
          <BreadcrumbLayout />
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
