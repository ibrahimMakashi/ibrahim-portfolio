import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { portfolioData } from "../portfolioData";
import { ArrowUpRight } from "lucide-react";

// Individual Stacking Card Component
const Card = ({ project, index, range, targetScale, globalProgress }) => {
  const containerRef = useRef(null);

  // Scale down the card as the global scroll progresses past it
  const scale = useTransform(globalProgress, range, [1, targetScale]);

  // Inner image parallax as the card enters the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: "0",
      }}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: "rgba(10, 10, 10, 0.95)", // dark premium glass
          width: "90vw",
          maxWidth: "1400px",
          height: "auto",
          minHeight: "80vh",
          borderRadius: "clamp(20px, 4vw, 40px)",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          position: "relative",
          top: `calc(5vh + ${index * 25}px)`, // stacks them beautifully
          scale,
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
          border: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            flex: "1 1 300px",
            padding: "clamp(2rem, 5vw, 4rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <span
                style={{
                  color: "var(--accent)",
                  fontWeight: 900,
                  fontSize: "1.2rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                0{index + 1}
              </span>
              <div
                style={{
                  height: "2px",
                  width: "40px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
                fontWeight: 900,
                fontFamily: "var(--font-primary)",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                lineHeight: 1.8,
                maxWidth: "450px",
              }}
            >
              {project.description}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            {project.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: "0.6rem 1.5rem",
                  borderRadius: "50px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.8)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side Image */}
        <div
          style={{
            flex: "1 1 300px",
            position: "relative",
            overflow: "hidden",
            minHeight: "350px", // Maintains image height when flex wraps on mobile
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#050505",
              zIndex: 1,
              opacity: isHovered ? 0 : 0.6,
              transition: "opacity 0.6s ease",
              pointerEvents: "none",
            }}
          />
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              scale: imageScale,
              transformOrigin: "center",
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: isHovered
                  ? "grayscale(0%) contrast(110%)"
                  : "grayscale(100%) contrast(130%) brightness(0.8)",
                transition: "filter 0.6s ease, transform 0.6s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          </motion.div>
        </div>

        {/* Hover Floating Button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            top: "5vw",
            right: "5vw",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: isHovered
              ? "var(--accent)"
              : "rgba(255,255,255,0.05)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
            zIndex: 20,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: isHovered ? "0 10px 20px rgba(255, 69, 0, 0.4)" : "none",
          }}
        >
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <ArrowUpRight size={36} strokeWidth={2.5} />
          </motion.div>
        </a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress for a buttery feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const { portfolio } = portfolioData;

  return (
    <section
      id="work"
      ref={containerRef}
      style={{
        position: "relative",
        backgroundColor: "var(--bg-main)",
        paddingBottom: "clamp(5vh, 8vw, 10vh)",
        paddingTop: "clamp(5vh, 10vw, 15vh)",
      }}
    >
      {/* Massive Animated Background Title */}
      <div
        style={{
          position: "sticky",
          top: "30vh",
          width: "100%",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            fontSize: "15vw",
            fontWeight: 900,
            fontFamily: "var(--font-primary)",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.02)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            lineHeight: 1,
            x: useTransform(smoothProgress, [0, 1], ["20%", "-40%"]),
          }}
        >
          PROJECTS PORTFOLIO
        </motion.div>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header / Intro */}
        <div className="container" style={{ marginBottom: "5vh" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
              Work
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(3rem, 6vw, 6.5rem)",
              fontFamily: "var(--font-primary)",
              textTransform: "uppercase",
              marginTop: "1rem",
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: "var(--text-main)", display: "block" }}>
              Selected
            </span>
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "2px var(--accent)",
                display: "block",
                marginTop: "0.2rem",
              }}
            >
              Highlights
            </span>
          </h2>
        </div>

        {/* Stacking Cards Sequence */}
        {portfolio.map((project, i) => {
          // Target scale logic: bottom cards scale down slightly more
          const targetScale = 1 - (portfolio.length - i - 1) * 0.05;
          const range = [i * (1 / portfolio.length), 1];

          return (
            <Card
              key={project.id}
              project={project}
              index={i}
              globalProgress={smoothProgress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
      </div>
      <div style={{ height: "15vh" }} /> {/* Bottom padding buffer */}
    </section>
  );
};

export default Portfolio;
