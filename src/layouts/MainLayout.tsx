import * as React from "react";
import { AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommandPalette from "../components/ui/CommandPalette";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="layout">
      <Header />
      <main className="section-container relative z-10 flex flex-col gap-stack-lg">
        {children}
      </main>
      <Footer />

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;
