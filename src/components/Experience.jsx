import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { portfolioData } from "../portfolioData";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const containerRef = useRef(null);

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth progress for background text
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const bgTextX = useTransform(smoothProgress, [0, 1], ["-10%", "-50%"]);
  const lineScaleY = useTransform(smoothProgress, [0.2, 0.8], [0, 1]);

  const { experience } = portfolioData;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      style={{
        position: "relative",
        backgroundColor: "var(--bg-main)",
        padding: "15vh 0",
        overflow: "hidden",
      }}
    >
      {/* Massive Animated Background Title */}
      <div
        style={{
          position: "absolute",
          top: "20vh",
          width: "100%",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            fontSize: "clamp(3rem, 12vw, 12rem)", // Scale text infinitely with screen boundaries, starting at minimum 3rem on tiny phones, peaking at 12rem tops
            fontWeight: 900,
            fontFamily: "var(--font-primary)",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.02)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            lineHeight: 1,
            x: bgTextX,
          }}
        >
          EXPERIENCE ARRAY
        </motion.div>
      </div>

      <div
        className="container"
        style={{ position: "relative", zIndex: 1, maxWidth: "1200px" }}
      >
        {/* Header / Intro */}
        <div style={{ marginBottom: "10vh", paddingLeft: "5vw" }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <div
              style={{
                width: "60px",
                height: "2px",
                backgroundColor: "var(--accent)",
              }}
            />
            <span
              style={{
                fontSize: "clamp(0.8rem, 2vw, 1.1rem)",
                fontWeight: 800,
                letterSpacing: "4px",
                color: "var(--accent)",
                textTransform: "uppercase",
              }}
            >
              Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6.5rem)", // Match Hero and Portfolio title clamps exactly
              fontFamily: "var(--font-primary)",
              textTransform: "uppercase",
              marginTop: "1rem",
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: "var(--text-main)", display: "block" }}>
              Professional
            </span>
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "2px var(--accent)",
                display: "block",
                marginTop: "0.2rem",
              }}
            >
              History
            </span>
          </motion.h2>
        </div>

        {/* Central Timeline Layout */}
        <div style={{ position: "relative", padding: "0 5vw" }}>
          {/* Animated Central Line Tracker - Hidden on mobile for totally different look */}
          {!isMobile && (
            <>
              <motion.div
                style={{
                  position: "absolute",
                  left: "5vw",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  background: "rgba(255,255,255,0.05)",
                  transformOrigin: "top",
                }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  left: "5vw",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  background: "var(--accent)",
                  transformOrigin: "top",
                  scaleY: lineScaleY,
                }}
              />
            </>
          )}

          {experience.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Extracted Sub-component for individual timeline cards
const TimelineItem = ({ exp, index, isMobile }) => {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  const dotBoxShadow = useTransform(
    scrollYProgress,
    [0.5, 1],
    ["0 0 0px transparent", "0 0 20px rgba(255,69,0,0.6)"],
  );

  const dotScale = useTransform(scrollYProgress, [0.5, 1], [0.5, 1.2]);

  return (
    <div
      ref={itemRef}
      style={{
        position: "relative",
        paddingLeft: isMobile ? "0" : "clamp(2.5rem, 8vw, 5rem)",
        marginBottom: isMobile ? "4vh" : "8vh",
      }}
    >
      {/* Glowing Pulsing Dot matching the scroll progress line - hidden on mobile */}
      {!isMobile && (
        <motion.div
          style={{
            position: "absolute",
            left: "clamp(-10px, -1.5vw, -13px)", // Correctly anchors dot to line regardless of screen size
            top: "40px",
            width: "clamp(20px, 3vw, 28px)",
            height: "clamp(20px, 3vw, 28px)",
            borderRadius: "50%",
            backgroundColor: "var(--bg-main)",
            border: "clamp(2px, 0.5vw, 4px) solid var(--accent)",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: dotBoxShadow,
            scale: dotScale,
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--text-main)",
            }}
          />
        </motion.div>
      )}

      {/* Floating Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.1,
        }}
        whileHover={{
          x: -10,
          backgroundColor: "rgba(15, 15, 15, 0.95)",
          borderColor: "rgba(255,255,255,0.15)",
        }}
        style={{
          backgroundColor: isMobile
            ? "rgba(10, 10, 10, 0.85)"
            : "rgba(10, 10, 10, 0.7)", // darker on mobile
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: isMobile ? "2rem 1.5rem" : "clamp(2rem, 5vw, 3.5rem)", // Tighter padding
          borderRadius: "24px",
          border: isMobile
            ? "1px solid rgba(255,69,0,0.15)"
            : "1px solid rgba(255,255,255,0.05)", // give it an accent border on mobile
          boxShadow: isMobile
            ? "0 10px 20px rgba(0,0,0,0.8)"
            : "0 20px 40px rgba(0,0,0,0.5)",
          cursor: "default",
          transition: "all 0.4s ease",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", // Flattens nicely on mobile
            gap: "clamp(1rem, 3vw, 1.5rem)",
            alignItems: "flex-start",
          }}
        >
          {/* Text Content Column */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: isMobile ? "flex-start" : "space-between",
                alignItems: isMobile ? "stretch" : "flex-start",
                flexDirection: isMobile ? "column" : "row", // Stack title and date on mobile
                flexWrap: "wrap",
                gap: isMobile ? "0.5rem" : "1.5rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                {/* Timeline Icon moved directly next to the Title */}
                <div
                  style={{
                    width: "clamp(30px, 5vw, 45px)",
                    height: "clamp(30px, 5vw, 45px)",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,69,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                  }}
                >
                  <Briefcase size={20} strokeWidth={2.5} />
                </div>

                <h3
                  style={{
                    fontSize: isMobile
                      ? "1.2rem"
                      : "clamp(1.4rem, 4vw, 2.2rem)", // Heavily reduce font size on small screens
                    color: "var(--text-main)",
                    fontWeight: 800,
                    fontFamily: "var(--font-primary)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    lineHeight: 1.2,
                  }}
                >
                  {exp.role}
                </h3>
              </div>

              {/* Premium Pill for Date range */}
              <div
                style={{
                  fontFamily: "var(--font-secondary)",
                  color: "var(--accent)",
                  fontSize: isMobile
                    ? "0.75rem"
                    : "clamp(0.75rem, 2vw, 0.95rem)",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  backgroundColor: "rgba(255, 69, 0, 0.1)",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "50px",
                  border: "1px solid rgba(255,69,0,0.2)",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  marginTop: isMobile ? "0" : "0.5rem",
                  alignSelf: isMobile ? "flex-start" : "auto",
                }}
              >
                {exp.period}
              </div>
            </div>

            <h4
              style={{
                fontSize: isMobile ? "0.9rem" : "clamp(0.95rem, 3vw, 1.2rem)",
                color: "var(--text-muted)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                paddingLeft: isMobile ? "0" : "clamp(40px, 6vw, 60px)", // Flush on mobile
              }}
            >
              <span style={{ opacity: 0.5 }}>AT</span>{" "}
              <span style={{ color: "#fff" }}>{exp.company}</span>
            </h4>

            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: isMobile ? "0.9rem" : "clamp(0.95rem, 3vw, 1.15rem)",
                lineHeight: 1.6,
                maxWidth: "700px",
                marginTop: "0.5rem",
                paddingLeft: isMobile ? "0" : "clamp(0px, 6vw, 60px)", // Flush on mobile
              }}
            >
              {exp.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;
