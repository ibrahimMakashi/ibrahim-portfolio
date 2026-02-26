import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { portfolioData } from "../portfolioData";
import { Github, Linkedin, Instagram } from "lucide-react";

const ScrollTextBlock = ({ textData }) => {
  const isLeft = textData.align === "left";
  const lines = textData.title.split("\n");
  const line1 = lines[0];
  const line2 = lines.slice(1).join("\n");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        padding: "0 8vw",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }} // Triggers when 40% of the block is visible
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: "100%",
          textAlign: isLeft ? "left" : "right",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isLeft ? "flex-start" : "flex-end",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {!isLeft && (
            <span
              style={{
                width: "60px",
                height: "2px",
                backgroundColor: "var(--accent)",
              }}
            ></span>
          )}
          <span
            style={{
              fontSize: "clamp(0.8rem, 2vw, 1.1rem)",
              fontWeight: 800,
              letterSpacing: "4px",
              color: "var(--accent)",
              textTransform: "uppercase",
            }}
          >
            {textData.tag}
          </span>
          {isLeft && (
            <span
              style={{
                width: "60px",
                height: "2px",
                backgroundColor: "var(--accent)",
              }}
            ></span>
          )}
        </div>

        <h2
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6.5rem)", // Match updated global block title clamps
            fontFamily: "var(--font-primary)",
            textTransform: "uppercase",
            lineHeight: 1.05,
            marginBottom: "1.5rem",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          <span style={{ color: "var(--text-main)", display: "block" }}>
            {line1}
          </span>
          {line2 && (
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "2px var(--accent)",
                display: "block",
                marginTop: "0.5rem",
                whiteSpace: "pre-line",
              }}
            >
              {line2}
            </span>
          )}
        </h2>

        <p
          style={{
            fontSize: "clamp(1rem, 3vw, 1.3rem)",
            fontFamily: "var(--font-secondary)",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.6,
            maxWidth: "450px",
            marginLeft: isLeft ? "0" : "auto",
            marginRight: isLeft ? "auto" : "0",
            textShadow: "0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          {textData.description}
        </p>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { framesCount, framePathPrefix, frameExtension, scrollTexts, socials } =
    portfolioData.hero;

  const [currentFrame, setCurrentFrame] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0 to 1) to frame index (1 to framesCount)
    let frame = Math.round(latest * (framesCount - 1)) + 1;
    if (frame < 1) frame = 1;
    if (frame > framesCount) frame = framesCount;
    setCurrentFrame(frame);
  });

  return (
    <section ref={containerRef} style={{ position: "relative", zIndex: 10 }}>
      {/* Sticky Background Sequence */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "var(--bg-color)",
          zIndex: 0,
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: framesCount }).map((_, i) => {
            const index = i + 1;
            const formattedIndex = index.toString().padStart(3, "0");
            const src = `${framePathPrefix}${formattedIndex}${frameExtension}`;
            return (
              <img
                key={index}
                src={src}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: currentFrame === index ? 1 : 0,
                }}
              />
            );
          })}
        </div>

        {/* Darkening Overlay - slightly darker so text stands out more clearly */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0.3) 50%, rgba(5,5,5,1) 100%)",
            zIndex: 1,
          }}
        ></div>

        {/* Social Icons Fixed inside Sticky Viewport */}
        <div
          style={{
            position: "absolute",
            bottom: "4vh",
            left: 0,
            width: "100%",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            pointerEvents: "none", // Prevent capturing clicks globally
          }}
        >
          {socials.map((social, idx) => {
            let Icon = null;
            if (social.icon === "github") Icon = Github;
            if (social.icon === "linkedin") Icon = Linkedin;
            if (social.icon === "instagram") Icon = Instagram;

            return (
              <motion.a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "var(--accent)" }}
                style={{
                  color: "rgba(255,255,255,0.5)",
                  transition: "color 0.3s",
                  pointerEvents: "auto",
                }}
              >
                {Icon && <Icon size={24} />}
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Natively Scrolling Text Overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "-100vh", // Pulls the first text block to overlap the beginning of the sticky section
        }}
      >
        {scrollTexts.map((textData, idx) => (
          <ScrollTextBlock key={idx} textData={textData} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
