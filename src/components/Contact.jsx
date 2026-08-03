import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { portfolioData } from "../portfolioData";
import { Send, CheckCircle, Loader2 } from "lucide-react";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMessage(
        "Email service is not configured. Please add EmailJS keys to your .env file.",
      );
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: contact.email,
        },
        publicKey,
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again or email me directly.");
    }
  };

  const isSubmitting = status === "loading";
  const isSuccess = status === "success";

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "clamp(10vh, 15vh, 20vh) 5vw",
        backgroundColor: "var(--bg-secondary)",
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
            gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
            gap: "clamp(3rem, 8vw, 6rem)",
            alignItems: "center",
          }}
        >
          <motion.div custom={0} variants={fadeUp}>
            <h2
              style={{
                fontSize: "clamp(2rem, 8vw, 6rem)",
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
                fontSize: "clamp(0.95rem, 3vw, 1.2rem)",
                lineHeight: 1.6,
                marginBottom: "3rem",
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
                    fontSize: "clamp(1rem, 4vw, 1.5rem)",
                    fontWeight: 600,
                    color: "var(--text-main)",
                    transition: "color 0.3s",
                    textDecoration: "none",
                    position: "relative",
                    display: "inline-block",
                    wordBreak: "break-all",
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
                    fontSize: "clamp(1rem, 4vw, 1.5rem)",
                    fontWeight: 600,
                    color: "var(--text-main)",
                  }}
                >
                  {contact.phone}
                </span>
              </div>
            </div>
          </motion.div>

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
                      y: focused === "name" || formData.name ? -25 : 15,
                      opacity: focused === "name" || formData.name ? 1 : 0.5,
                      scale: focused === "name" || formData.name ? 0.8 : 1,
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
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle(focused === "name")}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    autoComplete="off"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div style={{ position: "relative", marginTop: "1rem" }}>
                  <motion.label
                    animate={{
                      y: focused === "email" || formData.email ? -25 : 15,
                      opacity: focused === "email" || formData.email ? 1 : 0.5,
                      scale: focused === "email" || formData.email ? 0.8 : 1,
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
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle(focused === "email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    autoComplete="off"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div style={{ position: "relative", marginTop: "1rem" }}>
                  <motion.label
                    animate={{
                      y: focused === "message" || formData.message ? -25 : 15,
                      opacity:
                        focused === "message" || formData.message ? 1 : 0.5,
                      scale:
                        focused === "message" || formData.message ? 0.8 : 1,
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
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      ...inputStyle(focused === "message"),
                      resize: "none",
                      paddingTop: "2rem",
                    }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {status === "error" && (
                  <p
                    style={{
                      color: "#ff6b6b",
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {errorMessage}
                  </p>
                )}

                <motion.button
                  whileHover={
                    isSubmitting || isSuccess
                      ? {}
                      : { scale: 1.02, backgroundColor: "#ff571a" }
                  }
                  whileTap={isSubmitting || isSuccess ? {} : { scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  style={{
                    marginTop: "1.5rem",
                    padding:
                      "clamp(1rem, 3vw, 1.5rem) clamp(1.5rem, 5vw, 2.5rem)",
                    backgroundColor: isSuccess
                      ? "var(--bg-color)"
                      : "var(--accent)",
                    color: "#fff",
                    border: isSuccess
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "none",
                    borderRadius: "50px",
                    fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontFamily: "var(--font-primary)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    cursor: isSubmitting || isSuccess ? "default" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: isSuccess
                      ? "none"
                      : "0 10px 20px rgba(255, 69, 0, 0.4)",
                    opacity: isSubmitting ? 0.85 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      Sending...{" "}
                      <Loader2
                        size={22}
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                    </>
                  ) : isSuccess ? (
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
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
