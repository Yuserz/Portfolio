import * as React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuroraBackground from "../components/ui/AuroraBackground";
import CursorGlow from "../components/ui/CursorGlow";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <AuroraBackground />
      <CursorGlow />
      <Header />
      <div className="section-container relative z-10">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
