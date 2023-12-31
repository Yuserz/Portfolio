import * as React from "react";
import MainLayout from "../layouts/MainLayout";
import Left from "../components/home/Left";
import Right from "../components/home/Right";
import TechStack from "../components/stacks/TeckStack";

//icon
import Projects from "../components/projects/Projects";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div id="section1" className="home ">
        <div className="left home-sub-containers gap-4 z-10 ">
          <Left />
        </div>
        <div className="right home-sub-containers">
          <Right />
        </div>
      </div>
      <div id="section2" className="project h-fit ">
        <h3 className="section-title">Project</h3>
        <Projects />
      </div>
      <div id="section3" className="stack-container">
        <h3 className="section-title">Teck Stack</h3>
        <TechStack />
      </div>
    </MainLayout>
  );
};

export default Home;
