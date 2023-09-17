import * as React from "react";
import MainLayout from "../layouts/MainLayout";

import Left from "../components/home/Left";
import Right from "../components/home/Right";

interface HomeProps {
  // children: React.ReactNode;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <MainLayout>
      <div className="home">
        <div className="left home-sub-containers gap-4 z-10">
          <Left />
        </div>
        <div className="right home-sub-containers">
          <Right />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
