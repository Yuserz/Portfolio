'use client';

import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Left from '@/src/components/home/Left';
import Right from '@/src/components/home/Right';
import TechStack from '@/src/components/stacks/TeckStack';
import Projects from '@/src/components/projects/Projects';

export default function Home() {
  return (
    <div className="layout">
      <Header />
      <div className="section-container">
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
      </div>
      <Footer />
    </div>
  );
}
