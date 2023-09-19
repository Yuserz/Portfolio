import * as React from "react";
import Header from "../components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="section-container">{children}</div>
    </div>
  );
};

export default MainLayout;
