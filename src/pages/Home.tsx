import * as React from "react";
import MainLayout from "../layouts/MainLayout";
import Left from "../components/home/Left";
import Right from "../components/home/Right";
import TechStack from "../components/stacks/TeckStack";
import StatsSummary from "../components/stacks/StatsSummary";
import ContactSection from "../components/contact/ContactSection";
import AboutHistory from "../components/about/AboutHistory";
import Projects from "../components/projects/Projects";
import AgenticStack from "../components/tools/AgenticStack";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <section
        id="intro"
        className="flex flex-col md:flex-row items-center gap-gutter min-h-[60vh] mt-stack-md scroll-mt-[90px]"
      >
        <Left />
        <Right />
      </section>

      {/* Divider */}
      <hr className="border-t border-inverse-surface w-full" />

      <AboutHistory />

      <Projects />

      <AgenticStack />

      <TechStack />

      <StatsSummary />

      <ContactSection />
    </MainLayout>
  );
};

export default Home;
