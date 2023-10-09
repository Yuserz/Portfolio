import * as React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="section-container">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
