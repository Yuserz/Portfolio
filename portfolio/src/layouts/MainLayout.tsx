import * as React from "react";
import Header from "../components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="w-full justify-center items-center sm:px-4 md:px-10 lg:px-20 xl:px-40">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
