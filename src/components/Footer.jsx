import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "../portfolioData";
import { Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const { footer, hero } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax scroll effect for the glowing text
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0.8, 1], ["50px", "0px"]);
  const opacityParallax = useTransform(scrollYProgress, [0.8, 1], [0.3, 1]);

  return (
    <footer
      style={{
        backgroundColor: "var(--bg-main)",
        paddingTop: "6rem",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // Prevents any horizontal scrollbars
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 5vw",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "4rem",
            marginBottom: "6rem",
          }}
        >
          {/* Brand/Logo Column */}
          <div style={{ flex: "1 1 auto" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-1px",
                fontWeight: 900,
                color: "var(--text-main)",
                textTransform: "uppercase",
                fontFamily: "var(--font-primary)",
                marginBottom: "1.5rem",
              }}
            >
              {footer.name}
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                maxWidth: "350px",
              }}
            >
              Building seamless digital experiences through premium, scalable,
              and beautifully designed architectures.
            </p>
          </div>

          {/* Sitemaps */}
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                minWidth: "120px",
              }}
            >
              <h4
                style={{
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                  fontWeight: 700,
                }}
              >
                Sitemap
              </h4>
              {footer.navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={`#${link.toLowerCase()}`}
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    transition: "color 0.3s ease, transform 0.3s ease",
                    display: "inline-block",
                    width: "fit-content",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "var(--text-main)";
                    e.target.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgba(255,255,255,0.7)";
                    e.target.style.transform = "translateX(0)";
                  }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h4
                style={{
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                  fontWeight: 700,
                }}
              >
                Socials
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                {hero.socials.map((social, idx) => {
                  let Icon = null;
                  if (social.icon === "github") Icon = Github;
                  if (social.icon === "linkedin") Icon = Linkedin;
                  if (social.icon === "instagram") Icon = Instagram;

                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.8rem",
                        textDecoration: "none",
                        fontSize: "1.05rem",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                        e.currentTarget.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {Icon && <Icon size={20} />}
                      {social.name}{" "}
                      <ArrowUpRight size={16} style={{ opacity: 0.5 }} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar (Copyright + Scroll Top) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2rem 0",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.95rem",
              letterSpacing: "1px",
            }}
          >
            {footer.copyright}
          </p>

          <button
            onClick={scrollToTop}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              color: "var(--text-main)",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "0.8rem 1.5rem",
              borderRadius: "50px",
              fontSize: "0.9rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.boxShadow =
                "0 10px 20px rgba(255,69,0,0.3)";
              const icon = e.currentTarget.querySelector(".arrow");
              if (icon) icon.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.boxShadow = "none";
              const icon = e.currentTarget.querySelector(".arrow");
              if (icon) icon.style.transform = "translateY(0)";
            }}
          >
            Back to Top{" "}
            <ArrowUpRight
              className="arrow"
              size={18}
              style={{ transition: "transform 0.3s ease" }}
            />
          </button>
        </div>
      </div>

      {/* 
        EYE-CATCHING RESPONSIVE SKELETON TEXT 
        Using an SVG ensures it mathematically scales to exactly 100% 
        of the container width, completely flawlessly, with no scrollbars.
      */}
      <motion.div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end", // Push it downwards
          pointerEvents: "none",
          marginTop: "auto", // Push to bottom of flex container
          y: yParallax,
          opacity: opacityParallax,
          position: "relative",
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 1000 220"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "auto",
            marginBottom: isDesktop ? "0" : "clamp(2rem, 6vw, 4.5rem)",
          }} // Leaves scaling breathing room at bottom ONLY on mobile
        >
          <motion.text
            initial={{ strokeDasharray: "0 1000", fill: "rgba(255,255,255,0)" }}
            whileInView={{
              strokeDasharray: "1000 0",
              fill: "rgba(255,255,255,0.02)",
            }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            x="50%"
            y="70%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="rgba(255,255,255,0.02)" // Faint fill
            stroke="var(--accent)"
            strokeWidth="3"
            fontSize="220"
            fontFamily="var(--font-primary)"
            fontWeight="900"
            style={{ letterSpacing: "8px" }}
          >
            IBRAHIM
          </motion.text>
        </svg>
      </motion.div>

      {/* Floating Gradient Overlay to blend the text nicely into the deep background */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30vh",
          background:
            "linear-gradient(to bottom, transparent, rgba(10,10,10,0.5))",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </footer>
  );
};

export default Footer;
