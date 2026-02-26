import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../portfolioData";

const Loader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const { framesCount, framePathPrefix, frameExtension } = portfolioData.hero;
    let loaded = 0;

    const handleLoad = () => {
      loaded++;
      setProgress(Math.round((loaded / framesCount) * 100));
      if (loaded === framesCount) {
        setTimeout(() => setLoading(false), 800);
      }
    };

    if (framesCount > 0) {
      for (let i = 1; i <= framesCount; i++) {
        const img = new Image();
        img.onload = handleLoad;
        img.onerror = handleLoad; // Ensure it proceeds even if images are missing locally
        const formattedIndex = i.toString().padStart(3, "0");
        img.src = `${framePathPrefix}${formattedIndex}${frameExtension}`;
      }
    } else {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [setLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--bg-color)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-main)",
      }}
    >
      <div
        style={{
          marginBottom: "2rem",
          fontSize: "2rem",
          fontWeight: 800,
          letterSpacing: "4px",
          color: "var(--accent)",
          textAlign: "center",
          // textTransform: "uppercase",
        }}
      >
        IBRAHIM's World <br />
        <span
          style={{
            fontSize: "1rem",
            color: "var(--text-muted)",
            fontWeight: 400,
            letterSpacing: "2px",
          }}
        >
          Loading...
        </span>
      </div>
      <div
        style={{
          width: "200px",
          height: "2px",
          backgroundColor: "var(--bg-secondary)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
          style={{ height: "100%", backgroundColor: "var(--accent)" }}
        />
      </div>
      <div
        style={{
          marginTop: "1rem",
          fontFamily: "var(--font-primary)",
          fontSize: "0.9rem",
          color: "var(--text-muted)",
        }}
      >
        {progress}%
      </div>
    </motion.div>
  );
};

export default Loader;
