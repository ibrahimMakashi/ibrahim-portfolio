import React, { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { portfolioData } from "../portfolioData";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { scrollY } = useScroll();
  const [scrollDir, setScrollDir] = useState("up");
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > scrollYPosition && latest > 100) {
      setScrollDir("down");
      if (menuOpen) setMenuOpen(false); // Close menu on scroll down
    } else if (latest < scrollYPosition) {
      setScrollDir("up");
    }
    setScrollYPosition(latest);
  });

  const isScrolled = scrollYPosition > 50;
  const isContracted =
    scrollDir === "down" && scrollYPosition > 100 && !menuOpen;

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    setMenuOpen(false); // Close menu immediately
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0, // Reset to allow standard viewport flex centering
        width: "100vw",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end", // Align everything to the right side of the screen
        paddingTop: isScrolled ? "1rem" : "1.5rem",
        paddingRight: "5vw", // Keep it cleanly offset from the right edge
        transition: "padding 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        pointerEvents: "none",
      }}
    >
      {/* Primary Pill */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: isContracted ? "min(200px, 70vw)" : "min(320px, 85vw)", // Responsive pill width constraint
          padding: isContracted ? "0.6rem 2rem" : "1rem 2rem",
          borderRadius: menuOpen ? "30px 30px 0 30px" : "50px", // Flattens bottom right to connect dropdown seamlessly
          background:
            isScrolled || menuOpen
              ? "rgba(15, 15, 15, 0.7)"
              : "rgba(5, 5, 5, 0.2)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderBottom: menuOpen
            ? "1px solid transparent"
            : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: isScrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
          transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          pointerEvents: "auto", // Re-enable pointer events for the pill
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: isContracted ? "1.2rem" : "1.5rem",
            fontWeight: 900,
            color: "var(--text-main)",
            letterSpacing: "-0.5px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMenuOpen(false);
            history.replaceState(null, null, " ");
          }}
        >
          Ibrahim<span style={{ color: "var(--accent)" }}>.</span>
        </div>

        {/* Menu Toggle Button inside Pill */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: menuOpen ? "var(--text-main)" : "var(--accent)",
            color: menuOpen ? "#000" : "#fff",
            border: "none",
            borderRadius: "50%",
            width: isContracted ? "35px" : "40px",
            height: isContracted ? "35px" : "40px",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
            boxShadow: menuOpen ? "none" : "0 4px 15px rgba(255, 69, 0, 0.3)",
            marginLeft: "0",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.backgroundColor = menuOpen
              ? "#ccc"
              : "#ff571a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = menuOpen
              ? "var(--text-main)"
              : "var(--accent)";
          }}
        >
          {menuOpen ? (
            <X size={isContracted ? 18 : 20} />
          ) : (
            <Menu size={isContracted ? 18 : 20} />
          )}
        </button>
      </motion.header>

      {/* Floating Dropdown Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scaleY: 0 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            style={{
              width: "min(320px, 85vw)", // Matches compressed pill cleanly and handles mobile screen width
              background: "rgba(15, 15, 15, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderTop: "none",
              borderRight: "none",
              borderRadius: "0 0 30px 30px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end", // Align dropdown content explicitly right
              gap: "1.5rem",
              pointerEvents: "auto",
              transformOrigin: "top right", // Transform pivots cleanly from top rightcorner
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              zIndex: 9,
            }}
          >
            {portfolioData.footer.navLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleSmoothScroll(e, `#${link.toLowerCase()}`)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                style={{
                  color: "var(--text-main)",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  transition: "color 0.3s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--text-main)")
                }
              >
                {link}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(255,255,255,0.1)",
                margin: "0.5rem 0",
              }}
            />

            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                marginTop: "0.5rem",
                padding: "0.8rem 2.5rem",
                backgroundColor: "var(--accent)",
                color: "#fff",
                borderRadius: "50px",
                fontSize: "0.9rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "var(--font-primary)",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ff571a";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(255, 69, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Let's Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
