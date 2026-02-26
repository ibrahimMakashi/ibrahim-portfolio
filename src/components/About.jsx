import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { portfolioData } from "../portfolioData";

// Modern Stagger Variations
const textReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const About = () => {
  const { title, description, coreSkills, video } = portfolioData.about;
  const lines = title.split("\n");
  const line1 = lines[0];
  const line2 = lines.slice(1).join("\n");

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Soft Parallax on Title Block
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const textY = useTransform(smoothProgress, [0.1, 0.4], ["15%", "0%"]);

  return (
    <section
      id="about"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start", // Change from center to flex-start
        padding: "clamp(10vh, 20vh, 25vh) 8vw clamp(5vh, 10vh, 15vh)", // Compress padding vertically on small screens
        marginTop: "clamp(-15vh, -10vh, -5vh)", // Compress overlap on small screens
        zIndex: 5, // Lower than Hero to stay underneath
        overflow: "hidden",
        backgroundColor: "var(--bg-main)",
      }}
    >
      {/* Background Video Component */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.8,
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
        {/* Layered Gradient/Dark Overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(5, 5, 5, 0.75)",
            zIndex: 1,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            // Match the harsh Hero gradient logic for seamless flowing
            background:
              "linear-gradient(to bottom, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 30%, rgba(5,5,5,0.5) 80%, rgba(5,5,5,1) 100%)",
            zIndex: 2,
          }}
        ></div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1600px",
        }}
      >
        {/* Section Tag (Mirrors Hero.jsx's Accent Line Tag styling) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
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
            Discovery
          </span>
        </motion.div>

        {/* Content Centered Stack aligned similarly to Hero Left Block */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          style={{ y: textY }}
        >
          {/* Hero-Style Typography Match: Solid White + Accent Stroke */}
          <motion.h2
            style={{
              fontSize: "clamp(2rem, 6vw, 6.5rem)",
              fontFamily: "var(--font-primary)",
              textTransform: "uppercase",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              textAlign: "left",
            }}
          >
            <motion.span
              variants={textReveal}
              style={{ color: "var(--text-main)", display: "block" }}
            >
              {line1}
            </motion.span>
            {line2 && (
              <motion.span
                variants={textReveal}
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px var(--accent)",
                  display: "block",
                  marginTop: "0.5rem",
                  whiteSpace: "pre-line",
                }}
              >
                {line2}
              </motion.span>
            )}
          </motion.h2>

          <motion.div
            variants={textReveal}
            style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}
          >
            <p
              style={{
                fontSize: "clamp(1rem, 3vw, 1.3rem)",
                fontFamily: "var(--font-secondary)",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                maxWidth: "800px",
                marginLeft: "0",
                textShadow: "0 4px 10px rgba(0,0,0,0.5)",
                display: "inline", // Allows the 'read more' button to sit text-inline visually
              }}
            >
              {isMobile && !isExpanded
                ? `${description.substring(0, 150)}...`
                : description}
            </p>
            {isMobile && (
              <button
                onClick={toggleReadMore}
                style={{
                  color: "var(--accent)",
                  background: "none",
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  textDecoration: "underline",
                }}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </motion.div>

          {/* Dynamic Stats Row with modern Glassmorphic style */}
          <motion.div
            variants={textReveal}
            style={{
              display: "flex",
              gap: "clamp(2rem, 5vw, 4rem)",
              marginBottom: "4rem",
              flexWrap: "wrap",
              borderLeft: "2px solid rgba(255,255,255,0.1)",
              paddingLeft: "clamp(1rem, 3vw, 2rem)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 900,
                  color: "var(--text-main)",
                  lineHeight: 1,
                }}
              >
                01
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  marginTop: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Year Exp at Matrix Infotech Solution
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 900,
                  color: "var(--accent)",
                  lineHeight: 1,
                }}
              >
                10+
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  marginTop: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Projects Shipped
              </div>
            </div>
          </motion.div>

          {/* Premium Skills Carousel/Tags */}
          <motion.div variants={textReveal}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                maxWidth: "1000px",
              }}
            >
              {coreSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -5,
                    backgroundColor: "var(--accent)",
                    color: "#fff",
                    borderColor: "var(--accent)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: "0.8rem 1.8rem",
                    borderRadius: "50px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    color: "rgba(255,255,255,0.9)",
                    cursor: "default",
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(10, 10, 10, 0.4)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
