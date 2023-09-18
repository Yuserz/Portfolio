import * as React from "react";
import MainLayout from "../layouts/MainLayout";

import Left from "../components/home/Left";
import Right from "../components/home/Right";
import TeckStack from "../components/stacks/TeckStack";

//icon
import html from "../assets/icons/html.svg";
import css from "../assets/icons/css.svg";
import js from "../assets/icons/js.svg";

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
      <div className="stack-container">
        <h3 className="section-title ">Teck Stack</h3>
        <div className="tect-stack-container">
          <TeckStack
            image={html}
            title="HTML5"
            caption="A javascript library"
          />
          <TeckStack image={css} title="HTML5" caption="A javascript library" />
          <TeckStack image={js} title="HTML5" caption="A javascript library" />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
