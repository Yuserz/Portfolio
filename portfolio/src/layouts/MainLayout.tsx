import * as React from "react";
import Header from "../components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
