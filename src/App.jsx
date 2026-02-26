import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import Header from "./components/Header";
import { motion, useScroll, useSpring } from "framer-motion";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (loading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <div className="app-container">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: "var(--accent)",
          transformOrigin: "0%",
          scaleX,
          zIndex: 10000,
        }}
      />

      {loading && <Loader setLoading={setLoading} />}
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 1s ease" }}>
        <Header />
        <Hero />
        <About />
        <Portfolio />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
