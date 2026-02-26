import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../portfolioData";
import { Send, CheckCircle } from "lucide-react";

// Animation utility
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

const Contact = () => {
  const { contact } = portfolioData;
  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputStyle = (isFocused) => ({
    width: "100%",
    padding: "1.5rem 0",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: `1px solid ${isFocused ? "var(--accent)" : "rgba(255,255,255,0.2)"}`,
    color: "var(--text-main)",
    fontSize: "1.2rem",
    fontFamily: "var(--font-secondary)",
    outline: "none",
    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
    marginBottom: "2rem",
    borderRadius: 0,
    WebkitAppearance: "none",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "clamp(10vh, 15vh, 20vh) 5vw",
        backgroundColor: "var(--bg-secondary)", // Subtle background shift to differentiate section
        overflow: "hidden",
      }}
    >
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Section Intro Tag */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "3rem",
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
              color: "var(--accent)",
              fontFamily: "var(--font-secondary)",
              fontWeight: 800,
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontSize: "0.9rem",
            }}
          >
            Connect
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "8vw",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column: Contact Typography */}
          <motion.div custom={0} variants={fadeUp}>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                lineHeight: 1.05,
                fontWeight: 900,
                fontFamily: "var(--font-primary)",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              <span style={{ display: "block", color: "var(--text-main)" }}>
                Let's Create
              </span>
              <span
                style={{
                  display: "block",
                  color: "transparent",
                  WebkitTextStroke: "2px var(--accent)",
                }}
              >
                Together
              </span>
            </h2>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1.2rem",
                lineHeight: 1.8,
                marginBottom: "4rem",
                maxWidth: "450px",
              }}
            >
              Looking for a development partner to bring your ideas to life?
              Drop a message below and I will get back to you within 24 hours.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "0.5rem",
                  }}
                >
                  Direct Mail
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--text-main)",
                    transition: "color 0.3s",
                    textDecoration: "none",
                    position: "relative",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-main)";
                  }}
                >
                  {contact.email}
                </a>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "0.5rem",
                  }}
                >
                  Direct Phone
                </span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--text-main)",
                  }}
                >
                  {contact.phone}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Form */}
          <motion.div custom={1} variants={fadeUp}>
            <div
              style={{
                backgroundColor: "rgba(10,10,10,0.8)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                padding: "clamp(2rem, 5vw, 4rem)",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ position: "relative" }}>
                  <motion.label
                    animate={{
                      y:
                        focused === "name" ||
                        document.getElementById("name")?.value
                          ? -25
                          : 15,
                      opacity:
                        focused === "name" ||
                        document.getElementById("name")?.value
                          ? 1
                          : 0.5,
                      scale:
                        focused === "name" ||
                        document.getElementById("name")?.value
                          ? 0.8
                          : 1,
                    }}
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--text-muted)",
                      pointerEvents: "none",
                      transformOrigin: "left top",
                      fontSize: "1.2rem",
                      fontFamily: "var(--font-secondary)",
                    }}
                  >
                    01. What's your name?
                  </motion.label>
                  <input
                    id="name"
                    type="text"
                    style={inputStyle(focused === "name")}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    autoComplete="off"
                    required
                  />
                </div>

                <div style={{ position: "relative", marginTop: "1rem" }}>
                  <motion.label
                    animate={{
                      y:
                        focused === "email" ||
                        document.getElementById("email")?.value
                          ? -25
                          : 15,
                      opacity:
                        focused === "email" ||
                        document.getElementById("email")?.value
                          ? 1
                          : 0.5,
                      scale:
                        focused === "email" ||
                        document.getElementById("email")?.value
                          ? 0.8
                          : 1,
                    }}
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--text-muted)",
                      pointerEvents: "none",
                      transformOrigin: "left top",
                      fontSize: "1.2rem",
                      fontFamily: "var(--font-secondary)",
                    }}
                  >
                    02. What's your email?
                  </motion.label>
                  <input
                    id="email"
                    type="email"
                    style={inputStyle(focused === "email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    autoComplete="off"
                    required
                  />
                </div>

                <div style={{ position: "relative", marginTop: "1rem" }}>
                  <motion.label
                    animate={{
                      y:
                        focused === "message" ||
                        document.getElementById("message")?.value
                          ? -25
                          : 15,
                      opacity:
                        focused === "message" ||
                        document.getElementById("message")?.value
                          ? 1
                          : 0.5,
                      scale:
                        focused === "message" ||
                        document.getElementById("message")?.value
                          ? 0.8
                          : 1,
                    }}
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--text-muted)",
                      pointerEvents: "none",
                      transformOrigin: "left top",
                      fontSize: "1.2rem",
                      fontFamily: "var(--font-secondary)",
                    }}
                  >
                    03. Tell me about your project...
                  </motion.label>
                  <textarea
                    id="message"
                    rows="3"
                    style={{
                      ...inputStyle(focused === "message"),
                      resize: "none",
                      paddingTop: "2rem",
                    }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#ff571a" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitted}
                  style={{
                    marginTop: "2rem",
                    padding: "1.5rem",
                    backgroundColor: submitted
                      ? "var(--bg-color)"
                      : "var(--accent)",
                    color: "#fff",
                    border: submitted
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "none",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontFamily: "var(--font-primary)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    cursor: submitted ? "default" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: submitted
                      ? "none"
                      : "0 10px 20px rgba(255, 69, 0, 0.4)",
                  }}
                >
                  {submitted ? (
                    <>
                      Sent Successfully{" "}
                      <CheckCircle size={22} color="var(--accent)" />
                    </>
                  ) : (
                    <>
                      Send Request <Send size={22} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
